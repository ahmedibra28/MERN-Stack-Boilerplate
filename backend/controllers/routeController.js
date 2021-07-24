import asyncHandler from 'express-async-handler'
import RouteModel from '../models/routeModel.js'

export const addRoute = asyncHandler(async (req, res) => {
  const { isActive, component, path, name } = req.body
  const createdBy = req.user.id

  const exist = await RouteModel.findOne({ path })
  if (exist) {
    res.status(400)
    throw new Error('Route already exist')
  }
  const createObj = await RouteModel.create({
    component,
    path,
    isActive,
    createdBy,
    name,
  })
  if (createObj) {
    res.status(201).json({ status: 'success' })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

export const updateRoute = asyncHandler(async (req, res) => {
  const { isActive, component, path, name } = req.body
  const updatedBy = req.user.id

  const _id = req.params.id

  const obj = await RouteModel.findById(_id)

  if (obj) {
    const exist = await RouteModel.find({
      _id: { $ne: _id },
      path,
    })
    if (exist.length === 0) {
      obj.path = path
      obj.name = name
      obj.component = component
      obj.isActive = isActive
      obj.updatedBy = updatedBy
      await obj.save()
      res.status(201).json({ status: 'success' })
    } else {
      res.status(400)
      throw new Error(`This ${route} already exist`)
    }
  } else {
    res.status(400)
    throw new Error('Route not found')
  }
})

export const getRoute = asyncHandler(async (req, res) => {
  const obj = await RouteModel.find({}).sort({ createdAt: -1 })
  res.status(201).json(obj)
})

export const deleteRoute = asyncHandler(async (req, res) => {
  const _id = req.params.id
  const obj = await RouteModel.findById(_id)
  if (!obj) {
    res.status(400)
    throw new Error('Route not found')
  } else {
    await obj.remove()
    res.status(201).json({ status: 'success' })
  }
})
