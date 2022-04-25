import Role from '../../models/Role.js'
import UserRole from '../../models/UserRole.js'

const schemaName = Role
const schemaNameString = 'Role'

export const getRoles = async (req, res) => {
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

    query = query
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()
      .populate('permission')
      .populate('clientPermission')

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

export const postRole = async (req, res) => {
  try {
    const { name, description } = req.body
    let type
    let permission = []
    let clientPermission = []
    if (name) type = name.toUpperCase().trim().replace(/\s+/g, '_')

    if (req.body.permission) {
      if (Array.isArray(req.body.permission)) {
        permission = req.body.permission
      } else {
        permission = [req.body.permission]
      }
    }

    if (req.body.clientPermission) {
      if (Array.isArray(req.body.clientPermission)) {
        clientPermission = req.body.clientPermission
      } else {
        clientPermission = [req.body.clientPermission]
      }
    }

    const object = await schemaName.create({
      name,
      description,
      type,
      permission,
      clientPermission,
    })

    res.status(200).send(object)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const putRole = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    let type
    let permission = []
    let clientPermission = []
    if (name) type = name.toUpperCase().trim().replace(/\s+/g, '_')

    if (req.body.permission) {
      if (Array.isArray(req.body.permission)) {
        permission = req.body.permission
      } else {
        permission = [req.body.permission]
      }
    }

    if (req.body.clientPermission) {
      if (Array.isArray(req.body.clientPermission)) {
        clientPermission = req.body.clientPermission
      } else {
        clientPermission = [req.body.clientPermission]
      }
    }

    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    object.name = name
    object.type = type
    object.description = description
    object.permission = permission
    object.clientPermission = clientPermission
    await object.save()

    res.status(200).json({ message: `${schemaNameString} updated` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params
    const object = await schemaName.findById(id)
    if (!object)
      return res.status(400).json({ error: `${schemaNameString} not found` })

    if (object.type === 'SUPER_ADMIN')
      return res
        .status(400)
        .json({ error: `${schemaNameString} is super admin` })

    const userRolesObject = await UserRole.find({
      role: object._id,
    })

    if (userRolesObject.length > 0) {
      userRolesObject.forEach(async (userRole) => {
        await userRole.remove()
      })
    }

    await object.remove()
    res.status(200).json({ message: `${schemaNameString} removed` })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
