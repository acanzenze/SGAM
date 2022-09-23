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
    facturaTitle(container, 'RECIBO CLIENTE')

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
      container.p('Empresa Pública de Águas, EPAL-EP', style.streat)
      container.p('Rua Frederich Engels, nº 3 Luanda / Angola', style.companyTitle)
      container.p('NIF:', style.nif)
      container.p('5410001109', style.nif.value)
      container.p('email:', style.phone)
      container.p('johndoe@gmail.com', style.phone.value)
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
      container.p('Alexandre Aanzenze', { ...style.cliente.text, marginTop: '34%' })
      style.cliente.text.marginTop = '32.5%'
      style.cliente.text.marginLeft = '30.5%'
      container.p('Email', style.cliente.text)
      container.p('alexandrecanzenze@gmail.com', { ...style.cliente.text, marginTop: '34%' })
      style.cliente.text.marginTop = '32.5%'
      style.cliente.text.marginLeft = '50.5%'
      container.p('Bilhete de Identidade', style.cliente.text)
      container.p('BI-999000-000', { ...style.cliente.text, marginTop: '34%' })
      style.cliente.text.marginTop = '32.5%'
      style.cliente.text.marginLeft = '80.5%'
      container.p('Telefone', style.cliente.text)
      container.p('925 75 80 37', { ...style.cliente.text, marginTop: '34%' })

      container.p('Município', { ...style.cliente.text, marginTop: '36%', marginLeft: '5%' })
      container.p('Talatona', { ...style.cliente.text, marginTop: '37.5%', marginLeft: '5%' })

      container.p('Distrito', { ...style.cliente.text, marginTop: '36%', marginLeft: '30.5%' })
      container.p('Kelenba 2', { ...style.cliente.text, marginTop: '37.5%', marginLeft: '30.5%' })

      container.p('Bairro', { ...style.cliente.text, marginTop: '36%', marginLeft: '50.5%' })
      container.p('Projecto Nando', { ...style.cliente.text, marginTop: '37.5%', marginLeft: '50.5%' })

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
      container.p('Tipo de solicitação', style.cliente.text)
      container.div(style.cliente)

      container.p('Tipo', { ...style.cliente.text, marginTop: '44.5%' })
      container.p('Bilhete de indentidade', { ...style.cliente.text, marginTop: '46%' })

      container.p('Prioridade', { ...style.cliente.text, marginTop: '44.5%', marginLeft: '30.5%' })
      container.p('Urgente', { ...style.cliente.text, marginTop: '46%', marginLeft: '30.5%' })

      container.p('Data Prevista de Levantamento', { ...style.cliente.text, marginTop: '44.5%', marginLeft: '60.5%' })
      container.p('02/04/2022', { ...style.cliente.text, marginTop: '46%', marginLeft: '60.5%' })

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
      container.p('OPERADOR', style.div.text)
      style.div.text.marginTop = '18.5%'
      container.p('DATA', style.div.text)
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
