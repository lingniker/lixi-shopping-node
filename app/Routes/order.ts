import Route from '@ioc:Adonis/Core/Route'

Route.get('/order', "OrdersController.getList")
Route.post('/order', "OrdersController.getList");

Route.post('/order/create', "OrdersController.create").middleware("OperLog");

Route.post('/order/pay', "OrdersController.pay").middleware("OperLog");

Route.post('/order/update', "OrdersController.update").middleware("OperLog");
