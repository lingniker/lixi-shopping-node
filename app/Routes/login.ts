import Route from '@ioc:Adonis/Core/Route'

Route.get('/login', "LoginController.user").middleware("LoginLog");
Route.post('/login', "LoginController.user").middleware("LoginLog");
