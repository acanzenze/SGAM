import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Municipe from 'App/Models/Municipe'

export default class MunicipesController {
  public async store({ request, response }: HttpContextContract) {
    const data = request.body()

    const res = await Municipe.create(data)

    return response.status(200).json({ data: res })
  }
  public async index({ request, response }: HttpContextContract) {
    const data = await Municipe.all()

    return response.status(200).json({ data: data })
  }
}
