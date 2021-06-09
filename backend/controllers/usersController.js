import crypto from 'crypto'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import LogonSession from '../models/userLogonSessionModel.js'
import { generateToken } from '../utils/generateToken.js'
import { sendEmail } from '../utils/sendEmail.js'
import { forgotMessage } from '../utils/forgotEmailTemplate.js'

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
  let query = LogonSession.find()

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.limit) || 50
  const skip = (page - 1) * pageSize
  const total = await LogonSession.countDocuments()

  const pages = Math.ceil(total / pageSize)

  query = query
    .skip(skip)
    .limit(pageSize)
    .sort({ logDate: -1 })
    .populate('user', ['name', 'email'])

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
      roles: user.roles,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, admin, user } = req.body
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error('User already exist')
  }

  const userRoles = []
  admin && userRoles.push('Admin')
  user && userRoles.push('User')
  !admin && !user && userRoles.push('Admin')

  const userCreate = await User.create({
    name,
    email,
    password,
    roles: userRoles,
  })

  if (userCreate) {
    res.status(201).json({
      _id: userCreate._id,
      name: userCreate.name,
      email: userCreate.email,
      roles: userCreate.roles,
      token: generateToken(userCreate._id),
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
      roles: user.roles,
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
      roles: updatedUser.roles,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('Invalid email or password')
  }
})

export const getUsers = asyncHandler(async (req, res) => {
  let query = User.find()

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.limit) || 50
  const skip = (page - 1) * pageSize
  const total = await User.countDocuments()

  const pages = Math.ceil(total / pageSize)

  query = query
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .populate('user', ['name', 'email'])

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
  const userExist = await User.findById(req.params.id)
  const admin = req.body.admin
  const user = req.body.user

  if (req.params.id == req.user._id) {
    res.status(400)
    throw new Error("You can't edit your own user in the admin area.")
  }

  const userRoles = []
  admin && userRoles.push('Admin')
  user && userRoles.push('User')

  if (userExist) {
    userExist.name = req.body.name || userExist.name
    userExist.email = req.body.email.toLowerCase() || userExist.email
    userExist.roles = userRoles || userExist.roles
    if (req.body.password) {
      userExist.password = req.body.password
    }

    const updatedUser = await userExist.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      roles: updatedUser.roles,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email.toLowerCase()

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('No email could not be sent')
  }

  const resetToken = user.getResetPasswordToken()

  await user.save()

  const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`

  const message = forgotMessage(resetUrl, user)

  try {
    sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    })

    res
      .status(200)
      .json(
        `An email has been sent to ${user.email} with further instructions.`
      )
  } catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    res.status(404)
    throw new Error('Email could not be sent')
  }
})

export const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user) {
    res.status(400)
    throw new Error('Invalid Token')
  } else {
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(201).json('Password Updated Successfully')
  }
})
