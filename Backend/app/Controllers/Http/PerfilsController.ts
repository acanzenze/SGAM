import { Request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'
export default class PerfilsController {

    public async store({ request, response }: HttpContextContract) {
        const paramentros = request.body()

        const perfil = await Perfil.create(paramentros)

        response.status(201)
        return {
            msg: "Registado com sucesso",
            dados: perfil,
        }
    }

    public async index() {

        const perfil = await Perfil.all()

        return {
            dados: perfil,
        }
    }

    public async show({ params }: HttpContextContract) {
        const perfil = await Perfil.findOrFail(params.id)
        if (perfil) {
            return {
                dados:perfil,
            }
        }
        else{
            return{
                msg:"nenhum resultado encontrado"
            }
        }
    }

    public async update({params,request}:HttpContextContract){
        const perfil=await Perfil.findOrFail(params.id)

        if(perfil){
            const paramentros=request.body()
            perfil.nome=paramentros.nome
            perfil.slug=paramentros.slug
            perfil.estado=paramentros.estado

            await perfil.save()

            return{
                msg:"Dados actualizados com sucesso",
                dados:perfil,
            }
        }
    }
}
