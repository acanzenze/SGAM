import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Distrito from 'App/Models/Distrito'

export default class DistritosController {

    public async store({request,response}:HttpContextContract){
        const paramentros=request.body()
        const distrito=await Distrito.create(paramentros)

        response.status(201)

        return{
            msg:"registado com sucesso",
            dados:distrito
        }

    }

    public async index(){
        const distrito=await Distrito.all()

        return{
            dados:distrito
        }
    }

    public async update({params,request}){
        const distrito= await Distrito.findOrFail(params.id)

        if(distrito){
            const paramentros=request.body()
            distrito.nome=paramentros.nome
            distrito.estado=paramentros.estado
            distrito.municipio_id=paramentros.municipio_id
        }

        await distrito.save()

        return{
            msg:"Dados actualizados com sucesso",
            dados:distrito
        }
    }
}
