import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['nome', 'email', 'username', 'password'])
    const user = await User.create(data)

    response.status(201)
    return {
      msg: 'Registado com sucesso',
      dados: user,
    }
  }

  public async index({ requets, response }) {
    const user = await Database.from('users').select('*')

    return response.json({ data: user })
  }

  public async login({ request, response, auth }) {
    const { email, password } = request.all()

    // Lookup user manually
    const user = await User.query().where('email', email).firstOrFail()

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }

    // Generate token
    const token = await auth.use('api').generate(user)

    return token
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return {
      dados: user,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    if (user) {
      const paramentros = request.body()
      user.nome = paramentros.nome
      user.password = paramentros.password
      user.perfil_id = paramentros.perfil_id
      user.instituicao_id = paramentros.instituicao_id
      user.email = paramentros.email
      user.estado = paramentros.estado
    }
    await user.save()
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
