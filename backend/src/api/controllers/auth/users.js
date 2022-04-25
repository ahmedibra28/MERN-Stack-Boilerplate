import User from '../../models/User.js'
import Profile from '../../models/Profile.js'
import UserRole from '../../models/UserRole.js'

const schemaName = User
const schemaNameString = 'User'

export const getUsers = async (req, res) => {
  try {
    const q = req.query && req.query.q

    let query = schemaName.find(
      q ? { email: { $regex: q, $options: 'i' } } : {}
    )

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 25
    const skip = (page - 1) * pageSize
    const total = await schemaName.countDocuments(
      q ? { email: { $regex: q, $options: 'i' } } : {}
    )

    const pages = Math.ceil(total / pageSize)

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .select('-password')
      .lean()

    const result = await query

    res.status(200).json({
      startIndex: skip + 1,
      endIndex: skip + result.length,
      count: result.length,
      page,
      pages,
      total,
      data: result,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const postUser = async (req, res) => {
  try {
    const object = await schemaName.create(req.body)

    await Profile.create({
      user: object._id,
      name: object.name,
      image: `https://ui-avatars.com/api/?uppercase=true&name=${object.name}&background=random&color=random&size=128`,
    })

    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const objects = await schemaName
      .findById(id)
      .lean()
      .sort({ createdAt: -1 })
      .select('-password')

    if (!objects)
      return res.status(404).json({ error: `${schemaNameString} not found` })
    res.status(200).send(objects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const putUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, confirmed, blocked, password, email } = req.body

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.name = name
    object.email = email
    object.confirmed = confirmed
    object.blocked = blocked

    password && (object.password = await object.encryptPassword(password))

    if (name) {
      await Profile.findOneAndUpdate({ user: id }, { name })
    }

    await object.save()

    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const object = await schemaName.findById(id)

    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    await Profile.findOneAndDelete({
      user: object._id,
    })

    const userRole = await UserRole.findOne({ user: object._id })
    userRole && (await userRole.remove())

    await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
