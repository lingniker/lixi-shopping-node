import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/login-log', "LoginLogsController.getList");
Route.post('/api/login-log', "LoginLogsController.getList");