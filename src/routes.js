import {  Router  } from 'express'
import UserController from './app/Controllers/UserController'
import SessionController from './app/Controllers/SessionController'
import authMiddleware from './app/Middelwares/auth'
const routes = new Router()

routes.post('/users',  UserController.store);

routes.post('/sessions', SessionController.store);

 routes.use(authMiddleware);

routes.put('/users', UserController.update);


export default routes;