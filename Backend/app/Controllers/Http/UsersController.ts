import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'username', 'password','instituicao_id','perfil_id','estado'])
    
    const user = await User.findBy('username',data.email)
    if(user){
      response.status(501)
      return {
        msg: 'Este user name já existe',
        dados: null,
      }
    }

    if(data){
      const user = await User.create({
        nome: data.nome,
        email:data.email,
        username:data.email,
        password:data.password,
        estado:true,
        perfil_id:data.perfil_id,
        instituicao_id:data.instituicao_id
      })

      response.status(201)
    return {
      msg: 'Registado com sucesso',
      dados: user
    }
    }
  }

  public async index({response,request }) {
    const { pagination, search } = request.all()
    let { page = 1, total, perPage } = pagination
    if (page === null) page = 1
    if (!search && !perPage) perPage=5

    let setPage = perPage === 'T' ? 1 : page
    let setPerPage = perPage === 'T' ? total : perPage
    const user = await Database.from('users')
    .select(
      'users.*',
      'instituicaos.nome as empresa',
      'perfils.nome as perfil'
      ).where(function(query) {
        if (search && search !== 'null') {
          query.where('users.nome', 'like', '%' + search + '%')
          query.orWhere('users.username', 'like', '%' + search + '%')
        }
      })
      .innerJoin('perfils','perfils.id','users.perfil_id')
      .innerJoin('instituicaos','instituicaos.id','users.instituicao_id')
      .orderBy('users.created_at', 'desc')
      .paginate(setPage, setPerPage)

    return user
  }

  public async login({ request, response, auth }) {
    const { email, password } = request.all()

    //const user = await User.query().where('email', email).firstOrFail()
    const user = await Database.from("users")
    .select('users.*', 'perfils.nome as perfil','perfils.slug as perfil_slug')
    .leftJoin('perfils','perfils.id','users.perfil_id')
    .where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    const user_status = await Database.from("users")
    .select('users.*')
    .where('email', email)
    .where('users.estado',false).first()
    console.log(user_status)

    if(user_status){
      return response.status(405).json('bloqueiado')
    }


    const token = await auth.use('api').generate(user)
    return { user, token }
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return {
      dados: user,
    }
  }

  public async update({ params, request,response }: HttpContextContract) {

    const user = await User.findOrFail(params.id)

    if (user) {
      const paramentros = request.body()
      user.nome = paramentros.nome
      user.password = paramentros.password
      user.perfil_id = paramentros.perfil_id
      user.instituicao_id = paramentros.instituicao_id
      user.email = paramentros.email
      user.estado = paramentros.estado
      user.username=paramentros.email
    }
    console.log(user)
    await user.save()
    response.status(201)
    return {
      msg: 'dados actualizados com sucesso',
      dados: user,
    }
  }

  public async delete({ params, request }: HttpContextContract) {
    const user = await User.find(params.id)

    if (!user) throw Error('Erro ao eliminar!')

    await user.delete()

    return {
      msg: 'dados apagado com sucesso',
    }
  }
}
