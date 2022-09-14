// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import SolicitacaoEstado from "App/Models/SolicitacaoEstado";

export default class SolicitacaoEstadosController {
    public async index(){
        const dados=await SolicitacaoEstado.all()

        return{
            dados:dados
        }
    }
}
