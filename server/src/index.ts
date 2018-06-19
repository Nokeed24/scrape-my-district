import 'reflect-metadata'
import { Action, BadRequestError, useKoaServer } from 'routing-controllers'
import setupDb from './db'
import UserController from './users/controller'
import { verify } from './jwt'
import User from './users/entity'
import * as Koa from 'koa'


const app = new Koa()


useKoaServer(app, {
  cors: true,
  controllers: [
    UserController
	],
	
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return User.findOne(id)
      }
    }
    return undefined
  }
})

	setupDb()
	  .then(_ =>
	    app.listen(4000, () => console.log('Listening on port 4000'))
	  )
	  .catch(err => console.error(err))