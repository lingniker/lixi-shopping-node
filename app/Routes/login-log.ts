import Route from '@ioc:Adonis/Core/Route'

Route.get('/login-log', "LoginLogsController.getList");
Route.post('/login-log', "LoginLogsController.getList");