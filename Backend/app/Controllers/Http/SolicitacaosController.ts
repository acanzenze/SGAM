import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Solicitacao from 'App/Models/Solicitacao'

export default class SolicitacaosController {

  public async store({ request, response,auth }: HttpContextContract) {
    const data = request.only([
      'descricao',
      'tipo_solicitacao_id',
      'prioridade_id',
      'municipe_id',
      'documento',
      'is_publicado',
      'is_notificado',
      'is_facturado',
      'estado_id',
      'user_id',
    ])
    console.log(auth.user?.id)
    
    
    const client = await Solicitacao.create({
      descricao: data.descricao,
      tipo_solicitacao_id: data.tipo_solicitacao_id,
      prioridade_id: data.prioridade_id,
      municipe_id: data.municipe_id,
      documento: data.documento,
      is_publicado: false,
      is_notificado: false,
      is_facturado:false,
      estado: data.estado_id,
      user_id: auth.user?.id,
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
    if (!search && !perPage) perPage=5

    let setPage = perPage === 'T' ? 1 : page
    let setPerPage = perPage === 'T' ? total : perPage
    const client = await Database.from('solicitacaos')
      .select(
        '*',
        'clientes.nome as cliente',
        'solicitacaos.id as solicitacao_id',
        'solicitacaos.created_at as solicitacao_created_at',
        'clientes.id as cliente_id',
        'clientes.email as cliente_email',
        'bairros.nome as bairro',
        'distritos.nome as distrito',
        'municipios.nome as municipio',
        'tipo_solicitacaos.descricao as tipo_solicitacao',
        'solicitacaos.is_facturado',
        'solicitacaos.is_publicado',
        'solicitacao_prioridades.descricao as prioridade',
        'solicitacao_estados.id as estado_id',
        'solicitacao_estados.descricao as estado_descricao',
        'solicitacao_estados.slug as estado_slug',
        'instituicaos.nome as instituicao',
        'instituicaos.nif as instituicao_nif',
        'instituicaos.endereco as instituicao_endereco',
        'instituicaos.email as instituicao_email',
        'users.nome as user'
      )
      .where(function(query) {
        if (search && search !== 'null') {
          query.where('clientes.nome', 'like', '%' + search + '%')
          query.orWhere('clientes.numero_documento', 'like', '%' + search + '%')
          query.orWhere('tipo_solicitacaos.descricao', 'like', '%' + search + '%')
        }
      })
      .innerJoin("clientes", "clientes.id", "solicitacaos.municipe_id")
      .innerJoin("tipo_solicitacaos", "tipo_solicitacaos.id", "solicitacaos.tipo_solicitacao_id")
      .leftJoin("bairros", "bairros.id", "clientes.bairro_id")
      .leftJoin("distritos", "distritos.id", "bairros.distrito_id")
      .leftJoin("municipios", "municipios.id", "distritos.municipio_id")
      .leftJoin("solicitacao_prioridades", "solicitacao_prioridades.id", "solicitacaos.prioridade_id")
      .leftJoin("solicitacao_estados", "solicitacao_estados.id", "solicitacaos.estado")
      .leftJoin("users", "users.id", "solicitacaos.user_id")
      .leftJoin("instituicaos","instituicaos.id","users.instituicao_id")

      .orderBy('solicitacaos.created_at', 'desc')
      .paginate(setPage, setPerPage)
    
      response.status(200)
      return client
  }

  public async getSolicitacao({ request, response }: HttpContextContract) {
    const { search } = request.all()

    if (!search || search == 'null') return
    const client = await Database.from('solicitacaos')
      .select(
        '*',
        'clientes.nome as cliente',
        'solicitacaos.id as solicitacao_id',
        'solicitacaos.created_at as solicitacao_created_at',
        'clientes.id as cliente_id',
        'clientes.email as cliente_email',
        'bairros.nome as bairro',
        'distritos.nome as distrito',
        'municipios.nome as municipio',
        'tipo_solicitacaos.descricao as tipo_solicitacao',
        'solicitacaos.is_facturado',
        'solicitacaos.is_publicado',
        'solicitacao_prioridades.descricao as prioridade',
        'solicitacao_estados.id as estado_id',
        'solicitacao_estados.descricao as estado_descricao',
        'solicitacao_estados.slug as estado_slug',
        'instituicaos.nome as instituicao',
        'instituicaos.nif as instituicao_nif',
        'instituicaos.endereco as instituicao_endereco',
        'instituicaos.email as instituicao_email',
        'users.nome as user'
      )
      .where((query) => {
        if (search && search !== 'null') {
          //console.log('debug code', search)
          query.where('clientes.numero_documento', 'like', '%' + search + '%')
        }
      })
      .innerJoin("clientes", "clientes.id", "solicitacaos.municipe_id")
      .innerJoin("tipo_solicitacaos", "tipo_solicitacaos.id", "solicitacaos.tipo_solicitacao_id")
      .leftJoin("bairros", "bairros.id", "clientes.bairro_id")
      .leftJoin("distritos", "distritos.id", "bairros.distrito_id")
      .leftJoin("municipios", "municipios.id", "distritos.municipio_id")
      .leftJoin("solicitacao_prioridades", "solicitacao_prioridades.id", "solicitacaos.prioridade_id")
      .leftJoin("solicitacao_estados", "solicitacao_estados.id", "solicitacaos.estado")
      .leftJoin("users", "users.id", "solicitacaos.user_id")
      .leftJoin("instituicaos","instituicaos.id","users.instituicao_id")
      .where("solicitacaos.is_publicado",true)
      .orderBy('solicitacaos.created_at', 'desc')
      //.first()

    //return response.json(client)
    return{
      dados:client
    }
  }


  public async selectBoxProdutos({ params, response }: HttpContextContract) {


    const client = await Database.from('solicitacaos')
      .select(
        //'*',
        'solicitacaos.id as solicitacao_id',
        'tipo_solicitacaos.id as tipo_solicitacao_id',
        'tipo_solicitacaos.descricao as tipo_solicitacao',
        'tipo_solicitacaos.abreviatura',
        'tipo_solicitacaos.validade',
        'tipo_solicitacaos.contador',
        'produtos.id as produto_id',
        'produtos.nome as produto',
        'produtos.preco',
        'produtos.imposto',
        'clientes.id as cliente_id',
        'clientes.nome as cliente_nome'

      )
      .innerJoin("produtos", "produtos.tipo_solicitacao_id", "solicitacaos.tipo_solicitacao_id")
      .innerJoin("tipo_solicitacaos", "tipo_solicitacaos.id", "produtos.tipo_solicitacao_id")
      .innerJoin("clientes", "clientes.id", "solicitacaos.municipe_id")
      .where('solicitacaos.id', params.id)
      .first()

      response.status(200)

    return client
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
      'is_facturado',
    ])
    console.log("Save",data)
    const solicitacao = await Solicitacao.find(params.id)
    if (!solicitacao) throw new Error('erro ao cadastrar')

    solicitacao.merge(data)

    const result = await solicitacao.save()
    response.status(201)
    return response.json({
      msg: 'dados actualizados com sucesso',
      dados: result,
    })
  }

  public async totalAbertas(){
    const total=await Database.from("solicitacaos").count("* as total")
    .innerJoin("solicitacao_estados","solicitacao_estados.id","solicitacaos.estado")
    .where("solicitacao_estados.slug",'ABERTO')

    return{
      dados:total[0].total
    }
  }
  public async totalFinalizadas(){
    const total=await Database.from("solicitacaos").count("* as total")
    .innerJoin("solicitacao_estados","solicitacao_estados.id","solicitacaos.estado")
    .where("solicitacao_estados.slug",'FINALIZADO')

    return{
      dados:total[0].total
    }
  }
  public async totalCanceladas(){
    const total=await Database.from("solicitacaos").count("* as total")
    .innerJoin("solicitacao_estados","solicitacao_estados.id","solicitacaos.estado")
    .where("solicitacao_estados.slug",'CANCELADO')

    return{
      dados:total[0].total
    }
  }
  public async total(){
    const total=await Database.from("solicitacaos").count("* as total")

    return{
      dados:total[0].total
    }
  }
}
