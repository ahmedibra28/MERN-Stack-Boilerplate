import UserRole from '../../models/UserRole.js'
import User from '../../models/User.js'
import Role from '../../models/Role.js'

const schemaName = UserRole
const schemaNameString = 'UserRole'

export const getUserRoles = async (req, res) => {
  try {
    const q = req.query && req.query.q

    const role = q ? await Role.findOne({ name: q }) : null

    let query = schemaName.find(role ? { role: role._id } : {})

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 25
    const skip = (page - 1) * pageSize
    const total = await schemaName.countDocuments(
      role ? { role: role._id } : {}
    )

    const pages = Math.ceil(total / pageSize)

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()
      .populate('user')
      .populate('role')

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

export const postUserRole = async (req, res) => {
  const { user, role } = req.body
  if (!user || !role) return res.status(400).json({ error: 'Bad request' })
  try {
    const userExist = await User.findById(user)
    if (!userExist)
      return res.status(400).json({ error: 'User does not exist' })

    const roleExist = await Role.findById(role)
    if (!roleExist)
      return res.status(400).json({ error: 'Role does not exist' })

    const userRoleExist = await UserRole.findOne({ user })
    if (userRoleExist)
      return res.status(400).json({ error: 'User Role already exist' })

    const object = await schemaName.create(req.body)
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const postUserRoleById = async (req, res) => {
  try {
    const { id } = req.params

    const objects = await schemaName
      .findOne({ user: id })
      .lean()
      .sort({ createdAt: -1 })
      .populate({
        path: 'role',
        populate: {
          path: 'clientPermission',
          model: 'ClientPermission',
        },
      })

    if (!objects)
      return res
        .status(404)
        .json({ error: 'No ' + schemaNameString + ' found' })

    const role = objects.role.type
    const clientPermission = objects.role.clientPermission

    res.status(200).send({ role, clientPermission })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const putUserRole = async (req, res) => {
  try {
    const { id } = req.params
    const { user, role } = req.body

    if (!user || !role) return res.status(400).json({ error: 'Bad request' })

    const userExist = await User.findById(user)
    if (!userExist)
      return res.status(400).json({ error: 'User does not exist' })

    const roleExist = await Role.findById(role)
    if (!roleExist)
      return res.status(400).json({ error: 'Role does not exist' })

    const userRoleExist = await schemaName.findOne({ user })
    if (userRoleExist && userRoleExist.id !== id)
      return res.status(400).json({ error: 'User Role already exist' })

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.user = user
    object.role = role
    await object.save()

    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params
    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
