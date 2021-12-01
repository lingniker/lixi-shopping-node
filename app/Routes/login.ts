import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', "loginController.user");
Route.post('/login', "loginController.user");
