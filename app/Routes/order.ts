import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/order', "OrdersController.getList")
Route.post('/api/order', "OrdersController.getList");

Route.post('/api/order/create', "OrdersController.create").middleware("OperLog");

Route.post('/api/order/pay', "OrdersController.pay").middleware("OperLog");

Route.post('/api/order/update', "OrdersController.update").middleware("OperLog");
