import crypto from 'crypto'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import LogonSession from '../models/userLogonSessionModel.js'
import { generateToken } from '../utils/generateToken.js'
import { sendEmail } from '../utils/sendEmail.js'

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

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    res.status(404)
    throw new Error('No email could not be sent')
  }

  const resetToken = user.getResetPasswordToken()

  await user.save()

  const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`

  const message = `
            <div style="text-align: center">
              <h1>Reset Your Password</h1>
              <p style="margin-bottom: 20px">
                Tap the button below to reset your customer account password. If you didn't
                request a new password, you can safely delete this email.
              </p>
              <a
                target="blank"
                href=${resetUrl}
                style="
                  background-color: rgb(109, 65, 230);
                  padding: 15px;
                  border-radius: 20px;
                  text-decoration: none;
                  color: white;
                "
                >Reset Password</a
              >
              <p style="margin-top: 20px">
                If that doesn't work, copy and paste the following link in your browser:
              </p>

              <a target="blank" href=${resetUrl} style="margin-bottom: 50px" 
                >${resetUrl}</a
              >
              <hr />
              <p>Geel Tech Team</p>
            </div>

  `

  try {
    sendEmail({
      to: user.email,
      subject: 'GeelTech.com - password reset request',
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

    res.status(201).json({
      message: 'Password Updated Success',
    })
  }
})
