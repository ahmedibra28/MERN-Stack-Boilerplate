import Permission from '../../models/Permission.js'
import Role from '../../models/Role.js'

const schemaName = Permission
const schemaNameString = 'Permission'

export const getPermissions = async (req, res) => {
  try {
    const q = req.query && req.query.q

    let query = schemaName.find(q ? { name: { $regex: q, $options: 'i' } } : {})

    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.limit) || 25
    const skip = (page - 1) * pageSize
    const total = await schemaName.countDocuments(
      q ? { name: { $regex: q, $options: 'i' } } : {}
    )

    const pages = Math.ceil(total / pageSize)

    query = query.skip(skip).limit(pageSize).sort({ createdAt: -1 }).lean()

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

export const postPermission = async (req, res) => {
  try {
    const object = await schemaName.create(req.body)
    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const putPermission = async (req, res) => {
  try {
    const { id } = req.params

    const { name, description, method, route, auth } = req.body

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.name = name
    object.description = description
    object.method = method
    object.route = route
    object.auth = auth
    await object.save()
    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params
    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    const rolesObject = await Role.find({
      permission: object._id,
    })

    if (rolesObject.length > 0) {
      rolesObject.forEach(async (role) => {
        role.permission.filter((item) => item.toString() !== id).length
        await role.save()
      })
    }

    await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
