import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Factura from 'App/Models/Factura'
import Serie from 'App/Models/Serie'
import SeriesController from 'App/Controllers/Http/SeriesController'

export default class FacturasController {
  async index({ request, response }: HttpContextContract) {

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
