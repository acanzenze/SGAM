import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Bairro from 'App/Models/Bairro'

export default class BairrosController {

    public async store({request,response}:HttpContextContract){
        const paramentros=request.body()
        const bairro=await Bairro.create(paramentros)

        response.status(201)
        return{
            msg:"Registado com sucesso",
            dados:bairro
        }
    }

    public async index() {
        const bairro=await Bairro.all()
        return{
            dados:bairro
        }
    }

    public async update({params,request}:HttpContextContract){
        const bairro=await Bairro.findOrFail(params.id)

        if(bairro){
            const paramentros=request.body()
            bairro.nome=paramentros.nome
            bairro.estado=paramentros.estado
            bairro.distrito_id=paramentros.distrito_id

        }

        await bairro.save()

        return{
            dados:bairro
        }
    }
}
