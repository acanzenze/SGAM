 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import TipoSolicitacao from 'App/Models/TipoSolicitacao'

export default class TipoSolicitacaosController {

  public async store({ request, response }: HttpContextContract) {
    const { descricao, estado } = request.body()
    const res = await TipoSolicitacao.create({
      descricao,
      estado,
      sla: 1
    })

    if (!res) throw Error('Erro ao cadastar dados.')

    return response.status(201).json({
      msg: 'Tipo de Solicitacao registada com sucesso',
      dados: res,
    })
  }

  public async index({ request, response }: HttpContextContract) {
    const res = await TipoSolicitacao.all()

    return response.status(201).json({
      data: res,
    })
  }

  public async update({ params, request, response }) {
    const { id } = params
    const { descricao, estado } = request.body()

    const tipo = await TipoSolicitacao.find(id)

    if (!tipo) throw Error('Impossivel atualizar')

    tipo.descricao = descricao
    tipo.estado = estado

    const data = await tipo.save()

    return response.status(201).json({ msg: 'Dados actualizados com sucesso', data: data })
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params
    const province = await TipoSolicitacao.find(id)

    if (!province) throw Error('Erro, nenho dado encontrado!')

    const data = await TipoSolicitacao.all()

    return response.status(201).json({
      data: data,
    })
  }
}
