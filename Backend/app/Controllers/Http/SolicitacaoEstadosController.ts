// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import SolicitacaoEstado from "App/Models/SolicitacaoEstado";

export default class SolicitacaoEstadosController {
    public async estadoAberto(){
        const dados=await Database.from('solicitacao_estados').where('slug','ABERTO')

        return{
            dados:dados
        }
    }

    public async estadoCancelado(){
        const dados=await Database.from('solicitacao_estados').where('slug','CANCELADO').first()

        return{
            dados:dados
        }
    }
}
