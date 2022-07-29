import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Provincia from 'App/Models/Provincia'

export default class ProvinciasController {
  public async store({ request, response }: HttpContextContract) {
    const { nome, estado } = request.body()
    const provincia = await Provincia.create({
      nome,
      estado,
    })

    if (!provincia) throw Error('Erro ao cadastar dados.')

    return response.status(201).json({
      msg: 'Provincia registada com sucesso',
      dados: provincia,
    })
  }

  public async index({ request, response }: HttpContextContract) {
    const provincia = await Provincia.all()

    return response.status(201).json({
      data: provincia,
    })
  }

  public async update({ params, request, response }) {
    const { id } = params
    const { nome, estado } = request.body()

    const provincia = await Provincia.find(id)

    if (!provincia) throw Error('Impossivel atualizar')

    provincia.nome = nome
    provincia.estado = estado

    const data = await provincia.save()

    return response.status(201).json({ msg: 'Dados actualizados com sucesso', data: data })
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const province = await Provincia.find(id)

    if (!province) throw Error('Erro, nenho dado encontrado!')

    const data = await Provincia.all()

    return response.status(201).json({
      data: data,
    })
  }

  public async delete({ params, response }: HttpContextContract) {
    const { id } = params

    const province = await Provincia.find(id)

    if (!province) throw Error('Erro ao deletar!')

    await province.delete()

    return response.status(200).json({ message: 'Provincia deletada com sucesso!' })
  }
}
