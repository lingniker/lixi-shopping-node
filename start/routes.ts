/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

// import LoginController from 'LoginController.user'

import Database from '@ioc:Adonis/Lucid/Database'
import Route from '@ioc:Adonis/Core/Route'

import 'App/Routes/login'
import 'App/Routes/login-log'
import 'App/Routes/user'
import 'App/Routes/administrator'
import 'App/Routes/img-uplosd'
import 'App/Routes/shop'
import 'App/Routes/address'
import 'App/Routes/order'
import 'App/Routes/oper-log'


// const { connection } = Database.manager.get('mysql')

Route.get('/', async () => {
  return await Database.from('users').select('*')
})

Route.get('/api', "loginController.user")
