import jwt from 'jsonwebtoken'
import User from '../api/models/User.js'
import UserRole from '../api/models/UserRole.js'

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  })
}

export const isAuth = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      const userRole = await UserRole.findOne(
        { user: req.user._id },
        { role: 1 }
      ).populate({
        path: 'role',
        populate: {
          path: 'permission',
        },
      })

      let { url, method } = req

      const urlArray = url.split('/')
      const lastIndex = urlArray.pop()

      if (lastIndex.length > 18 && !lastIndex.includes('q')) {
        const paramsKey = Object.keys(req.params)
        url = urlArray.join('/') + '/' + `:${paramsKey[0]}`
      }

      if (url.includes('page')) {
        url = url.split('page')[0]

        if (url.includes('?')) {
          url = url.split('?')[0]
        }
      }
      if (
        userRole.role.permission.find(
          (permission) =>
            permission.route === url &&
            permission.method === method &&
            permission.auth === false
        )
      ) {
        return next()
      }
      if (
        !userRole.role.permission.find(
          (permission) =>
            permission.route === url &&
            permission.method === method &&
            permission.auth === true
        )
      ) {
        return res
          .status(403)
          .send({ error: 'You do not have permission to access this route' })
      }

      next()
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' })
    }
  }
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token provided' })
  }
}
