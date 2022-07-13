import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/user', "UsersController.getList")
Route.post('/api/user', "UsersController.getList");
