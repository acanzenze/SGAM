import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Solicitacao from 'App/Models/Solicitacao'

export default class SolicitacaosController {

  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      'descricao',
      'tipo_solicitacao_id',
      'prioridade_id',
      'municipe_id',
      'documento',
      'is_publicado',
      'is_notificado',
      'estado',
      'user_id',
    ])
    console.log(data)

    const client = await Solicitacao.create({
      descricao: data.descricao,
      tipo_solicitacao_id: data.tipo_solicitacao_id,
      prioridade_id: data.prioridade_id,
      municipe_id: data.municipe_id,
      documento: data.documento,
      is_publicado: data.is_publicado,
      is_notificado: data.is_notificado,
      estado: data.estado,
      user_id: data.user_id,
    })

    response.status(201)
    return {
      msg: 'Registado com sucesso',
      dados: client,
    }
  }

  public async index({ request, response }: HttpContextContract) {
    const { pagination, search } = request.all()
    let { page = 1, total, perPage } = pagination
    if (page === null) page = 1
    console.log(request.all())

    let setPage = perPage === 'T' ? 1 : page
    let setPerPage = perPage === 'T' ? total : perPage
    const client = await Database.from('solicitacaos')
      .select(
        '*',
        'clientes.nome as cliente',
        'solicitacaos.id as solicitacao_id',
        'clientes.id as cliente_id',
        'bairros.nome as bairro',
        'distritos.nome as distrito',
        'municipios.nome as municipio',
        'tipo_solicitacaos.descricao as tipo_solicitacao',
      )
      .where((query) => {
        if (search && search !== 'null') {
          console.log('debug code', search)
          query.where('clientes.nome', 'like', '%' + search + '%')
        }
      })
      .innerJoin("clientes", "clientes.id", "solicitacaos.municipe_id")
      .innerJoin("tipo_solicitacaos", "tipo_solicitacaos.id", "solicitacaos.tipo_solicitacao_id")
      .leftJoin("bairros", "bairros.id", "clientes.bairro_id")
      .leftJoin("distritos", "distritos.id", "bairros.distrito_id")
      .leftJoin("municipios", "municipios.id", "distritos.municipio_id")
      .paginate(setPage, setPerPage)

    return response.json(client)
  }


  public async selectBoxProdutos({ params, response }: HttpContextContract) {


    const client = await Database.from('solicitacaos')
      .select(
        //'*',
        'solicitacaos.id as solicitacao_id',
        'solicitacaos.id as tipo_solicitacao_id',
        'tipo_solicitacaos.descricao as tipo_solicitacao',
        'produtos.id as produto_id',
        'produtos.nome as produto',
        'produtos.preco'
      )
      .innerJoin("produtos", "produtos.tipo_solicitacao_id", "solicitacaos.tipo_solicitacao_id")
      .innerJoin("tipo_solicitacaos", "tipo_solicitacaos.id", "produtos.tipo_solicitacao_id")
      .where('produtos.tipo_solicitacao_id', params.id)
      .first()

    return response.json(client)
  }

  public async show({ params }: HttpContextContract) {
    const solicitacao = await Solicitacao.find(params.id)

    return {
      dados: solicitacao,
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = request.only([
      'descricao',
      'tipo_solicitacao_id',
      'prioridade_id',
      'municipe_id',
      'documento',
      'is_publicado',
      'is_notificado',
      'estado',
      'user_id',
      'is_facturado'
    ])
    console.log(data)
    const solicitacao = await Solicitacao.find(params.id)
    if (!solicitacao) throw new Error('erro ao cadastrar')

    solicitacao.merge(data)

    const result = await solicitacao.save()

    return response.json({
      msg: 'dados actualizados com sucesso',
      dados: result,
    })
  }
}
