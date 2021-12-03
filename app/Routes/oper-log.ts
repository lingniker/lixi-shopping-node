import Route from '@ioc:Adonis/Core/Route'

Route.get('/oper-log', "OperLogsController.getList")
Route.post('/oper-log', "OperLogsController.getList");
