import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Municipio from 'App/Models/Municipio'

export default class MunicipiosController {
  public async store({ request, response }: HttpContextContract) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { nome, estado, provincia_id } = request.body()
    console.log(request.body())
    const municipio = await Municipio.create({ nome, estado, provincia_id: provincia_id })
    response.status(201)
    return {
      msg: 'municipios Criado com sucesso',
      dados: municipio,
    }
  }

  public async index() {
    const municipio = await Database.from('municipios')
      .select('municipios.*', 'municipios.id', 'municipios.nome', 'provincias.nome as provincia')
      .leftJoin('provincias', 'provincias.id', 'municipios.provincia_id')

    return {
      dados: municipio,
    }
  }

  public async show({ request, response, params }) {
    return await Database.from('municipios').select('*').where('provincia_id', params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const municipio = await Municipio.findOrFail(params.id)

    if (municipio) {
      const paramentros = request.body()
      municipio.nome = paramentros.nome
      municipio.estado = paramentros.estado
      municipio.provincia_id = paramentros.provincia_id
    }

    await municipio.save()
    return {
      msg: 'Actualizado com sucesso',
      dados: municipio,
    }
  }
}
