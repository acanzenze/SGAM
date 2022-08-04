import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Produto from 'App/Models/Produto'

export default class ProdutosController {
    async index({  }: HttpContextContract) {
       return Produto.all()
    }
    async store({ request, response }: HttpContextContract) {
      const data = request.only([
        'nome',
        'preco',
        'quantidade',
        'categoria',
        'serie_id',
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




