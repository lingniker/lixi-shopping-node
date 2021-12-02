import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', "loginController.user").middleware("LoginLog");
Route.post('/login', "loginController.user");
