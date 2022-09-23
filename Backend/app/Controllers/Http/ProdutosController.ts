import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Produto from 'App/Models/Produto'

export default class ProdutosController {
    public async index({  }: HttpContextContract) {
      const dados = await Database.from("produtos")
      .select(
        "produtos.*",
        "tipo_solicitacaos.descricao as tipo_solicitacao"
      )
      .innerJoin("tipo_solicitacaos","tipo_solicitacaos.id","produtos.tipo_solicitacao_id")
       return{
        dados:dados
       }
    }
    async store({ request, response }: HttpContextContract) {
      const data = request.only([
        'nome',
        'preco',
        'imposto',
        'categoria',
        'tipo_solicitacao_id',
        /*'codigo' */
      ])
      
      const res = await Produto.create(data)
      return response.status(201).json({
         msg: 'Registado com sucesso',
         res
      })
  
    }
}




