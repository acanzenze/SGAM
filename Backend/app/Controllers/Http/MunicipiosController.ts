import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Municipio from 'App/Models/Municipio'


export default class MunicipiosController {
    public async store({request,response}:HttpContextContract){
        const paramentros=request.body()
        const municipio=await Municipio.create(paramentros);
        response.status(201)
        return{
            msg:"Criado com sucesso",
            dados:municipio
        }
    }

    public async index(){
        const municipio= await Database.from('municipios')
        .leftJoin('provincias','provincias.id','municipios.provincia_id')
        .select('municipios.id','municipios.provincia_id','municipios.nome','municipios.estado','municipios.created_at','provincias.nome as provincia')
        return{
            dados:municipio
        }
    }

    public async update({params,request}:HttpContextContract){
        const municipio= await Municipio.findOrFail(params.id)
        
        if(municipio){
            const paramentros=request.body()
            municipio.nome=paramentros.nome
            municipio.estado=paramentros.estado
            municipio.provincia_id=paramentros.provincia_id
        }

        await municipio.save()
        return{
            msg:"Actualizado com sucesso",
            dados:municipio
        }
    }
}
