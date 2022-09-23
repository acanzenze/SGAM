import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Documento from 'App/Models/Documento'

export default class DocumentosController {
    public async create({request,response,auth}:HttpContextContract){
        const documento = request.body()
        const dados=Documento.create({
            codigo:documento.codigo,
            data_validade:documento.data_validade,
            assinatura:documento.assinatura,
            solicitacao_id:documento.solicitacao_id,
            user_id:auth.user?.id
        })
        
        response.status(201)
        return{
            dados:dados
        }
    }

    public update(){

    }

    public index(){

    }
}
