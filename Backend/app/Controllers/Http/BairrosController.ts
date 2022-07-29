import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Bairro from 'App/Models/Bairro'

export default class BairrosController {
  public async store({ request, response }: HttpContextContract) {
    const paramentros = request.body()
    const bairro = await Bairro.create(paramentros)

    response.status(201)
    return {
      msg: 'Registado com sucesso',
      dados: bairro,
    }
  }

  public async index({ response }: HttpContextContract) {
    const bairro = await Database.from('bairros')
      .select('bairros.id', 'bairros.nome', 'distritos.nome as distrito', 'bairros.created_at')
      .leftJoin('distritos', 'distritos.id', 'bairros.distrito_id')

    return response.status(200).json({
      dados: bairro,
    })
  }

  public async show({ params }: HttpContextContract) {
    return await Database.from('bairros').select('*').where('distrito_id', params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const bairro = await Bairro.findOrFail(params.id)

    if (bairro) {
      const paramentros = request.body()
      bairro.nome = paramentros.nome
      bairro.estado = paramentros.estado
      bairro.distrito_id = paramentros.distrito_id
    }

    await bairro.save()

    return {
      dados: bairro,
    }
  }
}
