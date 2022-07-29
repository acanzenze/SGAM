import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { hello: 'world' }
  })

  Route.resource('/provincias/', 'ProvinciasController').apiOnly()
  Route.resource('/perfils/', 'PerfilsController').apiOnly()
  Route.resource('/users/', 'UsersController').apiOnly()
  Route.resource('/instituicaos/', 'InstituicaosController').apiOnly()
  Route.resource('/permissaos/', 'PermissaosController').apiOnly()
  Route.resource('/perfilpermissaos/', 'PerfilPermissaosController').apiOnly()
  Route.resource('/municipios/', 'MunicipiosController').apiOnly()
  Route.resource('/distritos/', 'DistritosController').apiOnly()
  Route.resource('/bairros/', 'BairrosController').apiOnly()
  Route.get('/list/', 'BairrosController.index')
}).prefix('/api')

Route.post('/login', 'UsersController.login')

Route.post('users/create', 'UsersController.store')
Route.get('users/list', 'UsersController.index')

//Route.get('/provincias/list', 'ProvinciasController.index')

Route.post('/municipios/create', 'MunicipiosController.store')
Route.get('/municipios/list', 'MunicipiosController.index')

/* Route.post('/distritos', 'DistritosController.store')
Route.get('/distritos/list', 'DistritosController.index')
Route.get('/distritos/show/:id', 'DistritosController.show') */

Route.post('clientes/create', 'ClientesController.store')
Route.post('clientes/list', 'ClientesController.index')
Route.post('clientes/select', 'ClientesController.searchMunicipe')


Route.post('solicitacao/create', 'SolicitacaosController.store')
Route.post('solicitacao/update/:id', 'SolicitacaosController.update')
Route.post('solicitacao/list', 'SolicitacaosController.index')
Route.post('solicitacao/select', 'SolicitacaosController.show')



Route.post('serie/create', 'SeriesController.store')
Route.post('serie/update/:id', 'SeriesController.update')
Route.post('serie/incrementar/:id', 'SeriesController.actualizarNumero')
Route.post('serie/list', 'SeriesController.index')
Route.post('serie/select', 'SeriesController.show')


Route.post('factura/create', 'FacturasController.store')
Route.post('factura/update/:id', 'FacturasController.update')
Route.post('factura/list', 'FacturasController.index')
Route.post('factura/select', 'FacturasController.show')


Route.post('linha_factura/create', 'LinhaFacturasController.store')
Route.post('linha_factura/update/:id', 'LinhaFacturasController.update')
Route.post('linha_factura/list', 'LinhaFacturasController.index')
Route.post('linha_factura/select', 'LinhaFacturasController.show')