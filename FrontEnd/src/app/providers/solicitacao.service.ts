import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { imgData } from '../utils/blobSolicitacao'
import { Container } from './styled-pdf/index'

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  //container: any = new Container()
  constructor() { }

  printSolicitacao(item:any) {

    console.log("imprimir",item)
    var created_at = new Date(item.solicitacao_created_at)
    var created_at_f = formatDate(new Date(item.solicitacao_created_at),'dd-MM-yyyy', 'en-US')

    created_at.setDate(created_at.getDate()+item.sla)
    var data_prevista=formatDate(created_at,'dd-MM-yyyy','en-US')
    console.log("prevista",created_at)

   
    //var data_levantamento = new Date(created_at.getDate()+1)
    //var data_levantamento_f=formatDate(new Date(data_levantamento),'dd-MM-yyyy', 'en-US')



    // You'll need to make your image into a Data URL
    // Use http://dataurl.net/#dataurlmaker
    const container = new Container()

    function img(imgData: any, container: any) {
      let style = {
        marginTop: "2%",
        width: "25%",
        height: "15%",
        marginLeft: "1%",
      };

      container.Image(imgData, style);
    }
    img(imgData, container);

    function facturaTitle(container: any, text: any) {
      let style = {
        fontWeigth: 'bold',
        fontSize: 8,
        marginTop: '4%',
        marginLeft: '70%',
        subTitle: {
          fontWeigth: 'bold',
          fontSize: 7,
          marginTop: '8%',
          marginLeft: '70%',
        },
      }
      container.p(text, style)
      style.subTitle.fontWeigth = 'normal'
      container.p('ORIGINAL', style.subTitle)
    }
    facturaTitle(container, 'SOLICITAÇÃO DE MUNÍCIPE')

    function header(data: any, container: any) {
      let style = {
        companyTitle: {
          marginTop: '16%',
          marginLeft: '3%',
          fontWeigth: 'bold',
          fontSize: 8,
        },
        streat: {
          marginTop: '18%',
          marginLeft: '3%',
          fontWeigth: 'bold',
          fontSize: 8,
        },
        nif: {
          marginTop: '20%',
          marginLeft: '3%',
          fontWeigth: 'bold',
          fontSize: 8,
          value: {
            marginTop: '20%',
            marginLeft: '7%',
            fontWeigth: 'bold',
            fontSize: 8
          }
        },
        phone: {
          marginTop: '22%',
          marginLeft: '3%',
          fontWeigth: 'bold',
          fontSize: 8,
          value: {
            marginTop: '22%',
            marginLeft: '7.5%',
            fontWeigth: 'bold',
            fontSize: 8
          }
        },
      }
      container.p(item.instituicao,style.companyTitle)
      container.p(item.instituicao_endereco, style.streat)
      container.p('NIF:', style.nif)
      container.p(item.instituicao_nif, style.nif.value)
      container.p('email:', style.phone)
      container.p(item.instituicao_email, style.phone.value)
    }
    header('', container)

    function municipeInfo() {
      let style = {
        cliente: {
          marginLeft: '2%',
          width: '97%',
          heigth: '28%',
          padding: '4%',
          border: [0, 0, 0],
          // bgColor: [201, 201, 201],
          text: {
            marginTop: '29.5%',
            marginLeft: '5%',
            fontSize: 8,
            fontWeigth: 'bold'
          }
        }
      }
      container.p('Dados do Municipe', style.cliente.text)
      container.div(style.cliente)
      style.cliente.heigth = '40%'
      style.cliente.text.marginTop = '32.5%'
      container.p('Nome', style.cliente.text)
      container.p(item.cliente, { ...style.cliente.text, marginTop: '34%' })
      style.cliente.text.marginTop = '32.5%'
      style.cliente.text.marginLeft = '30.5%'
      container.p('Email', style.cliente.text)
      container.p(item.cliente_email, { ...style.cliente.text, marginTop: '34%' })
      style.cliente.text.marginTop = '32.5%'
      style.cliente.text.marginLeft = '50.5%'
      container.p('Bilhete de Identidade', style.cliente.text)
      container.p(item.numero_documento, { ...style.cliente.text, marginTop: '34%' })
      style.cliente.text.marginTop = '32.5%'
      style.cliente.text.marginLeft = '80.5%'
      container.p('Telefone', style.cliente.text)
      container.p(item.telefone.toString(), { ...style.cliente.text, marginTop: '34%' })

      container.p('Município', { ...style.cliente.text, marginTop: '36%', marginLeft: '5%' })
      container.p(item.municipio, { ...style.cliente.text, marginTop: '37.5%', marginLeft: '5%' })

      container.p('Distrito', { ...style.cliente.text, marginTop: '36%', marginLeft: '30.5%' })
      container.p(item.distrito, { ...style.cliente.text, marginTop: '37.5%', marginLeft: '30.5%' })

      container.p('Bairro', { ...style.cliente.text, marginTop: '36%', marginLeft: '50.5%' })
      container.p(item.bairro, { ...style.cliente.text, marginTop: '37.5%', marginLeft: '50.5%' })

    }
    municipeInfo()

    function tipoSolicitacaoInfo() {
      let style = {
        cliente: {
          marginLeft: '2%',
          width: '97%',
          heigth: '40%',
          padding: '4%',
          border: [0, 0, 0],
          // bgColor: [201, 201, 201],
          text: {
            marginTop: '41.5%',
            marginLeft: '5%',
            fontSize: 8,
            fontWeigth: 'bold'
          }
        }
      }
      container.p('Tipo de solicitação - '+item.estado_descricao, style.cliente.text)
      container.div(style.cliente)

      container.p('Tipo', { ...style.cliente.text, marginTop: '44.5%' })
      container.p(item.tipo_solicitacao, { ...style.cliente.text, marginTop: '46%' })

      container.p('Prioridade', { ...style.cliente.text, marginTop: '44.5%', marginLeft: '30.5%' })
      container.p(item.prioridade, { ...style.cliente.text, marginTop: '46%', marginLeft: '30.5%' })
      container.p('Motivo', { ...style.cliente.text, marginTop: '44.5%', marginLeft: '42.5%' })
      container.p(item.motivo, { ...style.cliente.text, marginTop: '46%', marginLeft: '42.5%' })

      container.p('Data Prevista de Levantamento', { ...style.cliente.text, marginTop: '44.5%', marginLeft: '60.5%' })
      container.p(data_prevista, { ...style.cliente.text, marginTop: '46%', marginLeft: '60.5%' })

    }
    tipoSolicitacaoInfo()

    function bordInfo(data: any) {
      let style = {
        div: {
          marginLeft: '45.5%',
          width: '35%',
          heigth: '13%',
          padding: '15%',
          border: [0, 0, 0],
          text: {
            marginTop: '15%',
            marginLeft: '67%',
            fontSize: 8,
            fontWeigth: 'bold'
          },
        },
      }

      container.div(style.div)
      container.p('INFORMAÇÃO DO OPERADOR', style.div.text)
      style.div.text.marginTop = '17%'
      style.div.text.fontWeigth = 'normal'
      container.p('OPERADOR: '+item.user, style.div.text)
      style.div.text.marginTop = '18.5%'
      container.p('DATA: '+created_at_f, style.div.text)
    }
    bordInfo('')
    //line(35, 35)
    function footer() {
      let style = {
        th: {
          marginLeft: '2%',
          width: '97%',
          heigth: '100%',
          padding: '4%',
          border: [201, 201, 201],
          bgColor: [201, 201, 201],
          text: {
            marginTop: '88%',
            marginLeft: '5%',
            fontSize: 8,
            fontWeigth: 'bold'
          }
        }
      }

      container.p('Assinatura: ___________________________', style.th.text)
      container.p('Processado por computador', { ...style.th.text, fontWeigth: 'bold', marginTop: '94%', marginLeft: '45%' })
    }
    footer()


    container.save()
  }
}
