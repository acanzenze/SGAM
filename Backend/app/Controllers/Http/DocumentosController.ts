import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Documento from 'App/Models/Documento'

export default class DocumentosController {
    public async create({request,response,auth}:HttpContextContract){
        const documento = request.body()
        const dados=Documento.create({
            codigo:documento.codigo,
            data_validade:documento.data_validade,
            assinatura:documento.assinatura,
            solicitacao_id:documento.solicitacao_id,
            user_id:auth.user?.id
        })
        
        response.status(201)
        return{
            dados:dados
        }
    }

    public async update({params,request,response}:HttpContextContract){
        const data = request.only([
            'assinatura',
          ])
          console.log("Save",data)
          
          const documento = await Documento.find(params.id)
          if (!documento) throw new Error('erro ao cadastrar')
      
          documento.merge(data)
      
          const result = await documento.save()
      
          return response.json({
            msg: 'dados actualizados com sucesso',
            dados: result,
          })
    }

    public async index({params}:HttpContextContract){
        const dados = await Database.from('documentos')
        .select('*',
        'documentos.id as documento_id',
        'documentos.data_validade as validade_documento',
        'tipo_solicitacaos.descricao as tipo_documento',
        'users.nome as operador',
        'documentos.created_at as data_criacao',
        'instituicaos.nome as instituicao',
        'clientes.nome as cliente',
        'clientes.telefone as cliente_telefone',
        'bairros.nome as bairro',
        'distritos.nome as distrito',
        'municipios.nome as municipio',
        'provincias.nome as provincia',
        'solicitacaos.descricao as motivo'
        )
        .leftJoin('solicitacaos','solicitacaos.id','documentos.solicitacao_id')
        .leftJoin('tipo_solicitacaos','tipo_solicitacaos.id','solicitacaos.tipo_solicitacao_id')
        .leftJoin('users','users.id','documentos.user_id')
        .leftJoin('instituicaos','instituicaos.id','users.instituicao_id')
        .leftJoin('clientes','clientes.id','solicitacaos.municipe_id')
        .leftJoin('bairros','bairros.id','clientes.bairro_id')
        .leftJoin('distritos','distritos.id','bairros.distrito_id')
        .leftJoin('municipios','municipios.id','distritos.municipio_id')
        .leftJoin('provincias','provincias.id','municipios.provincia_id')
        .where('solicitacaos.id',params.id)

        return{
            dados:dados
        }

    }
}
