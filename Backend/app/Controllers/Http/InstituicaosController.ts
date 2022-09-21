import { v4 as uuidv4 } from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Instituicao from 'App/Models/Instituicao'

export default class InstituicaosController {
  private validarLogotipo = {
    type: 'image',
    size: '2mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const parametros = request.body()
    const logotipo = request.file('logotipo', this.validarLogotipo)

    if (logotipo) {
      const nomeLogotipo = `${uuidv4()}.${logotipo?.extname}`
      await logotipo.move('/tmp/uploads'),
        {
          name: nomeLogotipo,
        }
      parametros.logotipo = nomeLogotipo
    }

    const instituicao = await Instituicao.create(parametros)

    response.status(201)

    return {
      msg: 'Registado com sucesso',
      dados: instituicao,
    }
  }

  public async show({ params }: HttpContextContract) {
    const instituicao = await Instituicao.findOrFail(params.id)

    return {
      dados: instituicao,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const instituicao = await Instituicao.findOrFail(params.id)

    if (instituicao) {
      const parametros = request.body()

      instituicao.nome = parametros.nome
      instituicao.nif = parametros.nif
      instituicao.endereco = parametros.endereco
      instituicao.endereco = parametros.endereco
      instituicao.email = parametros.email

      if (parametros.logotipo != instituicao.logotipo || instituicao.logotipo == null) {
        const logotipo = request.file('logotipo', this.validarLogotipo)
        if (logotipo) {
          const nomeLogotipo = `${uuidv4()}.${logotipo?.extname}`
          await logotipo.move('/tmp/uploads'),
            {
              name: nomeLogotipo,
            }

          instituicao.logotipo = nomeLogotipo
        }
      }
      await instituicao.save()
      return {
        msg: 'dads actualizados com sucesso',
        dados: instituicao,
      }
    }
  }

  public async index() {
    const instituicao = await Instituicao.all()

    return {
      dados: instituicao[0],
    }
  }
}
