import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/shop', "ShopsController.getList").middleware("OperLog");
Route.post('/api/shop', "ShopsController.getList").middleware("OperLog");

Route.post('/api/shop/create', "ShopsController.create").middleware("OperLog");
Route.post('/api/shop/update', "ShopsController.update").middleware("OperLog");
