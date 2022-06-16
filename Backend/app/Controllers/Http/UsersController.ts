import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {

    public async store({request,response}:HttpContextContract){
        const parametros=request.only(['nome','email','username','password','perfil_id','instituicao_id','user_id'])
        const user=await User.create(parametros)

        response.status(201)
        return{
            msg:"Registado com sucesso",
            dados:user
           
        }

    }

    public async index(){
        const user=await Database.from('users')
        .leftJoin('perfils','perfils.id','users.perfil_id')
        .leftJoin('instituicaos','instituicaos.id','users.instituicao_id')
        .select('users.id','users.nome','users.perfil_id','users.email','users.username','users.password','users.estado','users.instituicao_id','users.created_at','perfils.nome as perfil','instituicaos.nome as instituicao')

        return{
            dados:user,
        }
        
    }

    public async show({params}:HttpContextContract){
        const user=await User.findOrFail(params)

        return{
            dados:user,
        }
        
    }

    public async update({params,request}:HttpContextContract){
        const user=await User.findOrFail(params.id)

        if(user){
            const paramentros=request.body()
            user.nome=paramentros.nome
            user.password=paramentros.password
            user.perfil_id=paramentros.perfil_id
            user.instituicao_id=paramentros.instituicao_id
            user.email=paramentros.email
            user.estado=paramentros.estado
            
        }
        await user.save()
        return{
            msg:"dados actualizados com sucesso",
            dados:user
        }
    }

}
