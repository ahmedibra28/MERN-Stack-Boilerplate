import asyncHandler from 'express-async-handler'
import GroupModel from '../models/groupModel.js'
import User from '../models/userModel.js'
import RouteModel from '../models/routeModel.js'

const routes = () => {
  return [
    {
      isActive: true,
      component: 'UserLogHistoryScreen',
      path: '/admin/users/logs',
      name: 'User Logs',
    },
    {
      isActive: true,
      component: 'UserListScreen',
      path: '/admin/users',
      name: 'Users',
    },
    {
      isActive: true,
      component: 'GroupScreen',
      path: '/admin/groups',
      name: 'Groups',
    },
    {
      isActive: true,
      component: 'RouteScreen',
      path: '/admin/routes',
      name: 'Routes',
    },
    {
      isActive: true,
      component: 'ProfileScreen',
      path: '/profile',
      name: 'Profile',
    },
  ]
}

const groups = (ids) => {
  return [
    {
      name: 'admin',
      isActive: true,
      route: ids,
    },
  ]
}

const users = () => {
  return [
    {
      password: '123456',
      name: 'Ahmed',
      email: 'ahmaat19@gmail.com',
      group: 'admin',
    },
  ]
}

export const seeds = asyncHandler(async (req, res) => {
  await RouteModel.deleteMany()
  const routeInsertion = await RouteModel.insertMany(routes())

  if (routeInsertion) {
    const routesId = await RouteModel.find({})

    await GroupModel.deleteMany()
    const groupInsertion = await GroupModel.insertMany(
      groups(routesId.map((r) => r._id))
    )

    if (groupInsertion) {
      await User.deleteMany()
      const userInsertion = await User.create(users())

      if (userInsertion) {
        res.status(201).json({ status: 'success data insertion' })
      } else {
        res.status(400)
        throw new Error('Invalid users data')
      }
    } else {
      res.status(400)
      throw new Error('Invalid groups data')
    }
  } else {
    res.status(400)
    throw new Error('Invalid routes data')
  }
})
