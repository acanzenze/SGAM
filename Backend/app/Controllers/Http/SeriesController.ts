import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Serie from 'App/Models/Serie'

export default class SeriesController {
  async index({  }: HttpContextContract) {
      return Serie.all()
  }
  async store({ request, response }: HttpContextContract) {

    const data = request.only([
      'nome',
      'numero',
      'tipo_documento',
    ])

    const res = await Serie.create(data)

    return response.status(201).json({
       msg: 'Registado com sucesso',
       res,
    })

  }

  async update({ request, response,params }: HttpContextContract) {
    const data = request.only([
      'nome',
      'numero',
      'tipo_documento',
    ])
    const serie = await Serie.find(params.id)
    if(!serie) throw new Error('erro ao editar')

    const res = serie.merge(data)

    await serie.save()

    return response.status(201).json({
       msg: 'actualizado com sucesso',
       res,
    })

  }

  async actualizarNumero(id: number) {
    const serie = await Serie.find(id)

    if(!serie) throw new Error('erro ao editar')
    serie.numero++
    const res = serie.merge(serie)

    await serie.save()

    return res

  }

  async show({}: HttpContextContract) {

  }
}
