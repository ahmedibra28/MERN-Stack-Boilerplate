import asyncHandler from 'express-async-handler'
import GroupModel from '../models/groupModel.js'

export const addGroup = asyncHandler(async (req, res) => {
  const { isActive, route } = req.body
  const createdBy = req.user.id
  const name = req.body.name.toLowerCase()

  const exist = await GroupModel.findOne({ name })
  if (exist) {
    res.status(400)
    throw new Error('Group already exist')
  }
  const createObj = await GroupModel.create({
    name,
    isActive,
    createdBy,
    route,
  })
  if (createObj) {
    res.status(201).json({ status: 'success' })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

export const updateGroup = asyncHandler(async (req, res) => {
  const isActive = req.body.isActive
  const route = req.body.route
  const updatedBy = req.user.id
  const name = req.body.name.toLowerCase()
  const _id = req.params.id

  const obj = await GroupModel.findById(_id)

  if (obj) {
    const exist = await GroupModel.find({ _id: { $ne: _id }, name })
    if (exist.length === 0) {
      obj.name = name
      obj.route = route
      obj.isActive = isActive
      obj.updatedBy = updatedBy
      await obj.save()
      res.status(201).json({ status: 'success' })
    } else {
      res.status(400)
      throw new Error(`This ${name} Group already exist`)
    }
  } else {
    res.status(400)
    throw new Error('Group not found')
  }
})

export const getGroup = asyncHandler(async (req, res) => {
  const obj = await GroupModel.find({})
    .sort({ createdAt: -1 })
    .populate('route')
  res.status(201).json(obj)
})

export const deleteGroup = asyncHandler(async (req, res) => {
  const _id = req.params.id
  const obj = await GroupModel.findById(_id)
  if (!obj) {
    res.status(400)
    throw new Error('Group not found')
  } else {
    await obj.remove()
    res.status(201).json({ status: 'success' })
  }
})
