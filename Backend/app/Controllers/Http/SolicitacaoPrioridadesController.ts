// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import SolicitacaoPrioridade from "App/Models/SolicitacaoPrioridade";

export default class SolicitacaoPrioridadesController {

    public async index(){
        const dados=await SolicitacaoPrioridade.all()

        return{
            dados:dados
        }
    }
}
