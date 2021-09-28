import express from 'express'
import { json } from 'body-parser'

import 'express-async-errors'

import { CurrentUserRoute } from './routes/current-user'
import { SigninUserRoute } from './routes/signin'
import { SignoutUserRoute } from './routes/signout'
import { SignupUserRoute } from './routes/signup'
import { errorHandler } from './middleware/error-handler'
import { NotFoundError } from './errors/not-found-error'
import mongoose from 'mongoose'

const app = express()
app.use(json())

app.use(SignupUserRoute)
app.use(SigninUserRoute)
app.use(SignoutUserRoute)
app.use(CurrentUserRoute)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('Connected to database...')
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Listning at port 3000')
  })
}

start()
