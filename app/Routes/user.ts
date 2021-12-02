import Route from '@ioc:Adonis/Core/Route'

Route.get('/user', "UsersController.getList")
Route.post('/user', "UsersController.getList");
