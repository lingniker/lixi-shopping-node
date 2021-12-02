import Route from '@ioc:Adonis/Core/Route'

Route.get('/address', "AddressesController.getList")
Route.post('/address', "AddressesController.getList");
