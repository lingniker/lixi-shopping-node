import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/login', "LoginController.user").middleware("LoginLog");
Route.post('/api/login', "LoginController.user").middleware("LoginLog");
