import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import LinhaFactura from 'App/Models/LinhaFactura'

export default class LinhaFacturasController {
  async index({ request, response }: HttpContextContract) {

  }
  async store({ request, response }: HttpContextContract) {

    const data = request.only([
      'artigo',
      'total',
      'valor_unitario',
      'quantidade',
      'factura_id'
    ])

    const res = await LinhaFactura.create(data)

    return response.status(201).json({
       msg: 'Registado com sucesso',
       res,
    })

  }
}
