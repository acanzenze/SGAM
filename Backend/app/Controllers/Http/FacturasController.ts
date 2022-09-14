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
        'facturas.*',
        'clientes.nome as cliente_nome',
        'clientes.numero_documento as bi'
      )
      .innerJoin("clientes","clientes.id","facturas.cliente_id")
      .where((query) => {
        if (search && search !== 'null') {
          query.where('clientes.nome', 'like', '%' + search + '%')
        }
      }).orderBy('created_at', 'desc')
      .paginate(page, perPage === 'T' ? total : perPage)


    return response.json(client)
  }
  async store({ request, response }: HttpContextContract) {
    const seriesController: SeriesController = new SeriesController()
    const data = request.only([
      'numero_documento',
      'total',
      'serie_id',
      'sigla',
      'estado_documento',
      'cliente_id',
      'solicitacao_id'
    ])

    const serie = await Serie.findBy('id', data.serie_id)
    if (!serie) {
      return response.status(400).json({
        msg: 'Não foi possivel encontrar serie',
      })
    }
    data.sigla = `${serie?.tipo_documento} ${serie?.nome} ${serie?.numero}`
    data.numero_documento = serie?.numero
    const res = await Factura.create(data)
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
    
  console.log(hoje);

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
}
