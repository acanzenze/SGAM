import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { SidebarComponent } from './views/layout/sidebar/sidebar.component';
import { NavbarComponent } from './views/layout/navbar/navbar.component';
import { LoginComponent } from './views/login/login.component';
import { ClientesComponent } from './views/clientes/clientes.component';
import { ProdutosComponent } from './views/produtos/produtos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateOrEditClientesComponent } from './views/clientes/create-or-edit-clientes/create-or-edit-clientes.component';
import { CreateOrEditProdutosComponent } from './views/produtos/create-or-edit-produtos/create-or-edit-produtos.component';
import { CreatOrEditProvinciasComponent } from './views/configuracao/morada/provincias/creat-or-edit-provincias/creat-or-edit-provincias.component';
import { CreateOrEditUsersComponent } from './views/configuracao/users/create-or-edit-users/create-or-edit-users.component';
import { CreateOrEditCategoriasComponent } from './views/configuracao/categorias/create-or-edit-categorias/create-or-edit-categorias.component';
import { CreateOrEditMunicipiosComponent } from './views/configuracao/morada/municipios/create-or-edit-municipios/create-or-edit-municipios.component';
import { CreateOrEditPermissionsComponent } from './views/configuracao/permissions/create-or-edit-permissions/create-or-edit-permissions.component';
import { CreateOrEditRolesComponent } from './views/configuracao/roles/create-or-edit-roles/create-or-edit-roles.component';
import { CreateOrEditTipoDocumentosComponent } from './views/configuracao/tipo-documentos/create-or-edit-tipo-documentos/create-or-edit-tipo-documentos.component';
import { SeriesComponent } from './views/configuracao/series/series.component';
import { CreateOrEditSeriesComponent } from './views/configuracao/series/create-or-edit-series/create-or-edit-series.component';
import { CategoriasComponent } from './views/configuracao/categorias/categorias.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RolesComponent } from './views/configuracao/roles/roles.component';
import { ArchwizardModule } from 'angular-archwizard';
import { MovimentoCaixaComponent } from './views/configuracao/movimento-caixa/movimento-caixa.component';
import { AbrirCaixaComponent } from './views/configuracao/movimento-caixa/abrir-caixa/abrir-caixa.component';
import { FecharCaixaComponent } from './views/configuracao/movimento-caixa/fechar-caixa/fechar-caixa.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { ProvinciasComponent } from './views/configuracao/morada/provincias/provincias.component';
import { MunicipiosComponent } from './views/configuracao/morada/municipios/municipios.component';
import { PermissionsComponent } from './views/configuracao/permissions/permissions.component';
import { UsersComponent } from './views/configuracao/users/users.component';
import { TipoDocumentoSerieComponent } from './views/configuracao/tipo-documento-serie/tipo-documento-serie.component';
import { CreateOrEditDucomentoSerieComponent } from './views/configuracao/tipo-documento-serie/create-or-edit-ducomento-serie/create-or-edit-ducomento-serie.component';
import { MessageComponent } from './views/Message/message/message.component';
import { DistritosComponent } from './views/configuracao/morada/distritos/distritos.component';
import { CreatOrEditDistritosComponent } from './views/configuracao/morada/distritos/creat-or-edit-distritos/creat-or-edit-distritos.component';
import { InstituicaoComponent } from './views/configuracao/instituicao/instituicao.component';
import { BairrosComponent } from './views/configuracao/morada/bairros/bairros.component';
import { CreatOrEditBairrosComponent } from './views/configuracao/morada/bairros/creat-or-edit-bairros/creat-or-edit-bairros.component';
import { SolicitacaoComponent } from './views/solicitacao/solicitacao.component';
import { CreateOrEditSolicitacaoComponent } from './views/solicitacao/create-or-edit-solicitacao/create-or-edit-solicitacao.component';
import { CreateSelectSolicitacaoComponent } from './views/solicitacao/create-select-solicitacao/create-select-solicitacao.component';
import { FaturacaoComponent } from './views/faturacao/faturacao.component';
import { CreateOrEditFacturaComponent } from './views/faturacao/create-or-edit-factura/create-or-edit-factura.component';
import { TipoSolicitacaoComponent } from './views/solicitacao/tipo-solicitacao/tipo-solicitacao.component';
import { CreatOrEditTipoSolicitacaoComponent } from './views/solicitacao/tipo-solicitacao/creat-or-edit-tipo-solicitacao/creat-or-edit-tipo-solicitacao.component';
import { ListagemDeFacturaComponent } from './views/listagemFactura/listagem-de-factura.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
//import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { EditUsersComponent } from './views/configuracao/users/edit-users/edit-users.component';
import { AlterPassworComponent } from './views/configuracao/users/alter-passwor/alter-passwor.component';
import { CancelSolicitacaoComponent } from './views/solicitacao/cancel-solicitacao/cancel-solicitacao.component';
import { PublicarSolicitacaoComponent } from './views/solicitacao/publicar-solicitacao/publicar-solicitacao.component';
import { CreateDocumentoComponent } from './views/solicitacao/create-documento/create-documento.component';
import { ListarDocumentoComponent } from './views/solicitacao/listar-documento/listar-documento.component';
import { ListarIdentificacaoComponent } from './views/clientes/listar-identificacao/listar-identificacao.component';
import { ListarAfiliacaoComponent } from './views/clientes/listar-afiliacao/listar-afiliacao.component';

@NgModule({
  declarations: [
    TipoSolicitacaoComponent,
    ListagemDeFacturaComponent,
    CreatOrEditTipoSolicitacaoComponent,
    BairrosComponent,
    CreateOrEditSolicitacaoComponent,
    CreateSelectSolicitacaoComponent,
    SolicitacaoComponent,
    CreatOrEditBairrosComponent,
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    LoginComponent,
    ClientesComponent,
    ProvinciasComponent,
    MunicipiosComponent,
    CreateOrEditClientesComponent,
    ProdutosComponent,
    CreateOrEditProdutosComponent,
    CreatOrEditProvinciasComponent,
    CreateOrEditUsersComponent,
    CreateOrEditCategoriasComponent,
    CreateOrEditMunicipiosComponent,
    CreateOrEditPermissionsComponent,
    CreateOrEditRolesComponent,
    CreateOrEditTipoDocumentosComponent,
    CreateOrEditClientesComponent,
    CreateOrEditProdutosComponent,
    UsersComponent,
    SeriesComponent,
    CreateOrEditSeriesComponent,
    CategoriasComponent,
    RolesComponent,
    MovimentoCaixaComponent,
    AbrirCaixaComponent,
    FecharCaixaComponent,
    PermissionsComponent,
    TipoDocumentoSerieComponent,
    CreateOrEditDucomentoSerieComponent,
    MessageComponent,
    DistritosComponent,
    CreatOrEditDistritosComponent,
    InstituicaoComponent,
    FaturacaoComponent,
    CreateOrEditFacturaComponent,
    //EditUsersComponent,
    EditUsersComponent,
    AlterPassworComponent,
    CancelSolicitacaoComponent,
    PublicarSolicitacaoComponent,
    CreateDocumentoComponent,
    ListarDocumentoComponent,
    ListarIdentificacaoComponent,
    ListarAfiliacaoComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ArchwizardModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
