import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permissao from 'App/Models/Permissao'

export default class PermissaosController {

    public async store({request,response}:HttpContextContract){
        const parametros=request.body()
        const permissao=await Permissao.create(parametros)

        response.status(201)
        return{
            msg:"Registado com sucesso",
            dados:permissao,
        }
    }

    public async index(){
        const permissao=await Permissao.all()

        return{
            dados:permissao
        }
    }

    public async show({params}:HttpContextContract){
        const permissao=await Permissao.findOrFail(params.id)

        return{dados:permissao,}
    }

    public async update({params,request}:HttpContextContract){
        const parametros=request.body()
        const permissao=await Permissao.findOrFail(params.id)

        if(permissao){
            permissao.nome=parametros.nome,
            permissao.descrcao=parametros.descrcao
            permissao.estado=parametros.estado
        }
        permissao.save()
        return{
            msg:"Actualizado com sucesso",
            dados:permissao
        }

    }
}
