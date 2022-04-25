import path from 'path'
import express from 'express'
import 'dotenv/config'
import 'colors'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import morgan from 'morgan'
import { notFound, errorHandler } from './api/middlewares/error.js'
import db from './config/db.js'
import authRoute from '../src/api/routers/auth.js'
import uploadRoute from '../src/api/routers/upload.js'

db()

const app = express()
app.use(cors())
app.use(fileUpload())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/', uploadRoute)
app.use('/', authRoute)

const __dirname = path.resolve()
app.use('./api/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      status: `Server running ${process.env.NODE_ENV} mode on post ${PORT}`,
    })
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running ${process.env.NODE_ENV} mode on post ${PORT}`.yellow.bold
  )
)
