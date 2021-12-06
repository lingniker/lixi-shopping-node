import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/administrator', "AdministratorsController.getList");
Route.post('/api/administrator', "AdministratorsController.getList");
