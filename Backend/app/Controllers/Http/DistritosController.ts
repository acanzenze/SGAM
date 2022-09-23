import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Distrito from 'App/Models/Distrito'

export default class DistritosController {
  public async store({ request, response }: HttpContextContract) {
    const { nome, estado, municipioId } = request.body()
    const distrito = await Distrito.create({ nome, estado, municipio_id: municipioId })

    return response.status(200).json({
      msg: 'registado com sucesso',
      dados: distrito,
    })
  }

  public async index({ request, response }) {
    const distrito = await Database.from('distritos')
      .select('distritos.*', 'municipios.nome as municipio','provincias.nome as provincia',)
      .leftJoin('municipios', 'municipios.id', 'distritos.municipio_id')
      .leftJoin('provincias', 'provincias.id', 'municipios.provincia_id')

    return response.status(200).json({
      dados: distrito,
    })
    //"select * from `distritos` left join `municipios` on `distritos`.`id` = `municipios`.`municipio_id`
  }

  public async show({ request, response, params }) {
    return await Database.from('distritos').select('*').where('municipio_id', params.id)
  }

  public async update({ params, request }) {
    const distrito = await Distrito.findOrFail(params.id)

    if (!distrito) throw new Error('Erro ao editar')

    const data = request.body()
    distrito.nome = data.nome
    distrito.estado = data.estado
    distrito.municipio_id = data.municipio_id

    await distrito.save()

    return {
      msg: 'Dados actualizados com sucesso',
      dados: distrito,
    }
  }
}
