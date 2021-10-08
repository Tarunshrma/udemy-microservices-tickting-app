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

//This will allow storing jwt token to cookies. This is hard requirement in case of server side rendering of next.js
import cookieSession from 'cookie-session'

const app = express()
//Set the proxy allow as we are reaching via ingress 
app.set('trust proxy', true);

app.use(json())

//set up the cookie session, signed false to avoid encryption; secure = true to allow only https communication
app.use(
  cookieSession(
    {
      signed: false,
      secure: true
    })
);

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

    if(!process.env.JWTKey){
      throw new Error('JWTKey Environment variable not set');
    }

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
