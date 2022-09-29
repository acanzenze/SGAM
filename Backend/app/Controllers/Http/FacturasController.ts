import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Factura from 'App/Models/Factura'
import Serie from 'App/Models/Serie'
import SeriesController from 'App/Controllers/Http/SeriesController'

export default class FacturasController {
  async index({ request, response }: HttpContextContract) {
    const { pagination, search } = request.all()
    let { page, total, perPage } = pagination
    if (page === null) page = 1

    const client = await Database.from('facturas')
      .select(
        '*',
        'facturas.numero_documento as numero_factura',
        'facturas.created_at as data_factura',
        'clientes.nome as cliente_nome',
        'clientes.numero_documento as bi',
        'clientes.endereco as cliente_endereco',
        'bairros.nome as bairro',
        'distritos.nome as distrito',
        'municipios.nome as municipio',
        'users.nome as user',
        'instituicaos.nome as instituicao',
        'instituicaos.email as instituicao_email',
        'produtos.nome as produto',
        'produtos.preco as preco_unitario'


      )
      .innerJoin("clientes","clientes.id","facturas.cliente_id")
      .innerJoin("bairros","bairros.id","clientes.bairro_id")
      .innerJoin("distritos","distritos.id","bairros.distrito_id")
      .innerJoin("municipios","municipios.id","distritos.municipio_id")
      .innerJoin("users","users.id","facturas.user_id")
      .innerJoin("instituicaos","instituicaos.id","users.instituicao_id")
      .innerJoin("solicitacaos","solicitacaos.id","facturas.solicitacao_id")
      .innerJoin("tipo_solicitacaos","tipo_solicitacaos.id","solicitacaos.tipo_solicitacao_id")
      .innerJoin("produtos","produtos.tipo_solicitacao_id","tipo_solicitacaos.id")
      .where(function(query) {
        if (search && search !== 'null') {
          query.where('clientes.nome', 'like', '%' + search + '%')
          query.orWhere('clientes.numero_documento', 'like', '%' + search + '%')
          query.orWhere('facturas.sigla', 'like', '%' + search + '%')
        }
      }).orderBy('facturas.created_at', 'desc')
      .paginate(page, perPage === 'T' ? total : perPage)


    return response.json(client)
  }
  async store({ request, response,auth }: HttpContextContract) {
    const seriesController: SeriesController = new SeriesController()
    const data = request.only([
      'numero_documento',
      'total',
      'serie_id',
      'sigla',
      'estado_documento',
      'cliente_id',
      'solicitacao_id',
      'user_id'
    ])

    const serie = await Serie.findBy('id', data.serie_id)
    if (!serie) {
      return response.status(400).json({
        msg: 'Não foi possivel encontrar serie',
      })
    }
    data.sigla = `${serie?.tipo_documento} ${serie?.nome} ${serie?.numero}`
    data.numero_documento = serie?.numero
    const res = await Factura.create({
      numero_documento:data.numero_documento,
      total:data.total,
      serie_id:data.serie_id,
      sigla:data.sigla,
      estado_documento:data.estado_documento,
      cliente_id:data.cliente_id,
      solicitacao_id:data.solicitacao_id,
      user_id:auth.user?.id
    })
    const serieActualizado = await seriesController.actualizarNumero(data.serie_id)
    return response.status(201).json({
      msg: 'Registado com sucesso',
      res,
      serieActualizado
    })

  }

  public async facturacaoHoje(){
    const moment=require("moment")
    const hoje= moment(new Date()).format("YYYY-MM-DD")


    const total = await Database.from("facturas").sum("total as total")
    .where(Database.raw('DATE_FORMAT(facturas.created_at, "%Y-%m-%d")'),"=",hoje)
    .where("estado_documento",1)

    
    return{
      dados:total[0].total
    }
  }

  public async facturacaoOntem(){
    const moment=require("moment")
    var hoje = new Date()
    var dataOntem = new Date(hoje.getTime());
        dataOntem.setDate(hoje.getDate() - 1);
        dataOntem = moment(dataOntem).format("YYYY-MM-DD");
        console.log(dataOntem);

    const total = await Database.from("facturas").sum("total as total")
    .where(Database.raw('DATE_FORMAT(facturas.created_at, "%Y-%m-%d")'),"=",dataOntem)
    .where("estado_documento",1)

    
    return{
      dados:total[0].total
    }
    
  }

  public async facturacaoGeral(){
    const total = await Database.from("facturas").sum("total as total")
    .where("estado_documento",1)
    
    return{
      dados:total[0].total
    }
  }

  public async countDocumento(){
     const total=await Database.from("facturas").count("* as total")
     .where("estado_documento",1)

     return{
      dados:total[0].total
     }
  }
  public async countDocMunicipe(){
    const total=await Database.from("facturas").countDistinct("cliente_id as total")
    .where("estado_documento",1)

    return{
     dados:total[0].total
    }
  }
  public async countDocAnulados(){
    const total=await Database.from("facturas").countDistinct("cliente_id as total")
    .where("estado_documento",0)

    return{
     dados:total[0].total
    }
  }
}
