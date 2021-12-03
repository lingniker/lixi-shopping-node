import Route from '@ioc:Adonis/Core/Route'

Route.get('/order', "OrdersController.getList")
Route.post('/order', "OrdersController.getList");
