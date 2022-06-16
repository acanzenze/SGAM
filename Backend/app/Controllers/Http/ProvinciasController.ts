import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Request } from '@adonisjs/core/build/standalone'
import Provincia from 'App/Models/Provincia'
export default class ProvinciasController {

    public async store({ request, response }: HttpContextContract) {

        const paramentros = request.body();
        const provincia = await Provincia.create({
            nome: paramentros.nome,
            estado: paramentros.estado
        })

        response.status(201)
        return {
            msg: "Provincia registada com sucesso",
            dados: provincia,
        }
    }
    public async index() {
        const provincia = await Provincia.all()

        return {
            dados: provincia,
        }

    }

    public async update({ params, request }) {
        try {
            console.log(params)
            const provincia = await Provincia.findOrFail(params.id)

            if (provincia) {

                let paramentros = request.body()
                provincia.nome = paramentros.nome
                provincia.estado = paramentros.estado

                await provincia.save()

                return {
                    msg: "Dados actualizados com sucesso",
                    dados: provincia,
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    public async show({params}:HttpContextContract){
        const provincia=await Provincia.findOrFail(params.id)

        if(provincia){
            return{
                dados:provincia
            }
        }
    }

}
