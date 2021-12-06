import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/address', "AddressesController.getList")
Route.post('/api/address', "AddressesController.getList");
