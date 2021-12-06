import Route from '@ioc:Adonis/Core/Route'

Route.get('/shop', "ShopsController.getList").middleware("OperLog");
Route.post('/shop', "ShopsController.getList").middleware("OperLog");

Route.post('/shop/create', "ShopsController.create").middleware("OperLog");
Route.post('/shop/update', "ShopsController.update").middleware("OperLog");
