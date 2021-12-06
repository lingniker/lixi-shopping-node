import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/oper-log', "OperLogsController.getList")
Route.post('/api/oper-log', "OperLogsController.getList");
