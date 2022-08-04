import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Factura from 'App/Models/Factura'
import Serie from 'App/Models/Serie'
import SeriesController from 'App/Controllers/Http/SeriesController'

export default class FacturasController {
  async index({request,response}: HttpContextContract) {
    const { pagination, search } = request.all()
    let { page, total, perPage } = pagination
    if (page === null) page = 1

    const client = await Database.from('facturas')
      .select(
        'facturas.*',
        )
      .where((query) => {
        if (search && search !== 'null') {
          query.where('clientes.nome', 'like', '%' + search + '%')
        }
      })
     /*  .leftJoin("clientes","clientes.id","facturas.bairro_id")
      .leftJoin("bairros","bairros.id","clientes.bairro_id")
      .leftJoin("distritos","distritos.id","bairros.distrito_id")
      .leftJoin("municipios","municipios.id","distritos.municipio_id") */
      .paginate(page, perPage === 'T' ? total : perPage)

    return response.json(client)
  }
  async store({ request, response }: HttpContextContract) {
    const seriesController: SeriesController = new SeriesController()
    const data = request.only([
      'numero_documento',
      'total',
      'serie_id',
      'sigla',
      'estado_documento',
      'clinte_id'
    ])

    const serie = await Serie.findBy('id', data.serie_id)
    if(!serie) {
       return  response.status(400).json({
        msg: 'Não foi possivel encontrar serie',
     })
    }
    data.sigla = `${serie?.tipo_documento} ${serie?.nome} ${serie?.numero}`
    data.numero_documento = serie?.numero
    const res = await Factura.create(data)
    const serieActualizado = await seriesController.actualizarNumero(data.serie_id)
    return response.status(201).json({
       msg: 'Registado com sucesso',
       res,
       serieActualizado
    })

  }
}
