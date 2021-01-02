import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import LogonSession from '../models/userLogonSessionModel.js'
import { generateToken } from '../utils/generateToken.js'

const logSession = asyncHandler(async (id) => {
  const user = id
  const date = Date.now()
  const logDate = new Date(date)

  return await LogonSession.create({
    user,
    logDate,
  })
})

export const logHistory = asyncHandler(async (req, res) => {
  const log = await LogonSession.find({})
    .sort({ logDate: -1 })
    .populate('user', ['name', 'email'])
  res.json(log)
})

export const authUser = asyncHandler(async (req, res) => {
  const email = req.body.email.toLowerCase()
  const password = req.body.password

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    logSession(user._id)

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email.toLowerCase() || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
})

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 })

  res.json(users)
})

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (req.params.id == req.user._id) {
    res.status(400)
    throw new Error("You can't delete your own user in the admin area.")
  }

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (req.params.id == req.user._id) {
    res.status(400)
    throw new Error("You can't edit your own user in the admin area.")
  }

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email.toLowerCase() || user.email
    user.isAdmin = req.body.isAdmin
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})
