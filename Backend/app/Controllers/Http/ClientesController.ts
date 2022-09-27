import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {
  public async store({ request, response }: HttpContextContract) {
    const data = request.only([
      'nome',
      'telefone',
      'generoId',
      'estado_civil',
      'dataNascimento',
      'nomePai',
      'email',
      'nomeMae',
      'bairroId',
      'numeroDocumento',
      'estado',
      'residencia',
      'enderecoId',
      'dataEmissao',
      'dataValidade'
    ])
    console.log(data)

    const client = await Cliente.create({
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      dataNascimento: data.dataNascimento,
      bairroId: data.bairroId,
      estado: data.estado,
      residencia: data.residencia,
      pai: data.nomePai,
      mae: data.nomeMae,
      endereco: data.enderecoId,
      genero_id: data.generoId,
      estado_civil: data.estado_civil,
      dataEmissao: data.dataEmissao,
      dataValidade: data.dataValidade,
      numeroDocumento: data.numeroDocumento
    })

    response.status(201)
    return {
      msg: 'Registado com sucesso',
      dados: client,
    }
  }

  public async index({ request, response }: HttpContextContract) {
    const { pagination, search } = request.all()
    let { page, total, perPage } = pagination
    if (page === null) page = 1

    const client = await Database.from('clientes')
      .select(
        'clientes.*',
        'clientes.id as cliente_id',
        'clientes.nome',
        'bairros.nome as bairro',
        'distritos.nome as distrito',
        'municipios.nome as municipio'
        )
      .where((query) => {
        if (search && search !== 'null') {
          query.where('clientes.nome', 'like', '%' + search + '%')
        }
      })
      .leftJoin("bairros","bairros.id","clientes.bairro_id")
      .leftJoin("distritos","distritos.id","bairros.distrito_id")
      .leftJoin("municipios","municipios.id","distritos.municipio_id")
      .orderBy('clientes.id','desc')
      .paginate(page, perPage === 'T' ? total : perPage)

    return response.json(client)
  }


  public async searchMunicipe({ request, response }: HttpContextContract) {
    const { search } = request.all()

    const client = await Database.from('clientes')
    .select(
      'clientes.*',
      'clientes.id as cliente_id',
      'clientes.nome as cliente_nome',
      'bairros.nome as bairro',
      'distritos.nome as distrito',
      'municipios.nome as municipio'
      )
      .where((query) => {
        if (search && search !== 'null') {
          query.where('clientes.nome', 'like', '%' + search + '%')
        }
      })
      .innerJoin("bairros","bairros.id","clientes.bairro_id")
      .innerJoin("distritos","distritos.id","bairros.distrito_id")
      .innerJoin("municipios","municipios.id","distritos.municipio_id")

    return response.json(client)
  }

  public async show({ params }: HttpContextContract) {
    const user = await Cliente.find(params.id)

    return {
      dados: user,
    }
  }

  public async countCliente(){
    const data = await Database.from('clientes')  .count("* as total") 

    return{
      dados: data[0].total 
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
   
    const data = request.only([
      'nome',
      'telefone',
      'generoId',
      'estado_civil',
      'dataNascimento',
      'nomePai',
      'email',
      'nomeMae',
      'bairroId',
      'numeroDocumento',
      'estado',
      'residencia',
      'enderecoId',
      'dataEmissao',
      'dataValidade'
    ])
    console.log('edite', data)
    const cliente = await Cliente.find(params.id)
    if (!cliente) throw new Error('erro ao cadastrar')

    cliente.merge({
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      dataNascimento: data.dataNascimento,
      bairroId: data.bairroId,
      estado: data.estado,
      residencia: data.residencia,
      pai: data.nomePai,
      mae: data.nomeMae,
      endereco: data.enderecoId,
      genero_id: data.generoId,
      estado_civil: data.estado_civil,
      dataEmissao: data.dataEmissao,
      dataValidade: data.dataValidade,
      numeroDocumento: data.numeroDocumento
    })

    const result = await cliente.save()

    return response.json({
      msg: 'dados actualizados com sucesso',
      dados: result,
    })
  }
}
