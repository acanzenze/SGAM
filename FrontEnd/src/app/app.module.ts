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
import { CreatOrEditProvinciasComponent } from './views/configuracao/provincias/creat-or-edit-provincias/creat-or-edit-provincias.component';
import { CreateOrEditUsersComponent } from './views/configuracao/users/create-or-edit-users/create-or-edit-users.component';
import { CreateOrEditCategoriasComponent } from './views/configuracao/categorias/create-or-edit-categorias/create-or-edit-categorias.component';
import { CreateOrEditMunicipiosComponent } from './views/configuracao/municipios/create-or-edit-municipios/create-or-edit-municipios.component';
import { CreateOrEditPermissionsComponent } from './views/configuracao/permissions/create-or-edit-permissions/create-or-edit-permissions.component';
import { CreateOrEditRolesComponent } from './views/configuracao/roles/create-or-edit-roles/create-or-edit-roles.component';
import { CreateOrEditTipoDocumentosComponent } from './views/configuracao/tipo-documentos/create-or-edit-tipo-documentos/create-or-edit-tipo-documentos.component';
import { SeriesComponent } from './views/configuracao/series/series.component';
import { CreateOrEditSeriesComponent } from './views/configuracao/series/create-or-edit-series/create-or-edit-series.component';
import { CategoriasComponent } from './views/configuracao/categorias/categorias.component';
import { HttpClientModule } from '@angular/common/http';
import { RolesComponent } from './views/configuracao/roles/roles.component';
import { ArchwizardModule } from 'angular-archwizard';
import { MovimentoCaixaComponent } from './views/configuracao/movimento-caixa/movimento-caixa.component';
import { AbrirCaixaComponent } from './views/configuracao/movimento-caixa/abrir-caixa/abrir-caixa.component';
import { FecharCaixaComponent } from './views/configuracao/movimento-caixa/fechar-caixa/fechar-caixa.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { ProvinciasComponent } from './views/configuracao/provincias/provincias.component';
import { MunicipiosComponent } from './views/configuracao/municipios/municipios.component';
import { PermissionsComponent } from './views/configuracao/permissions/permissions.component';
import { UsersComponent } from './views/configuracao/users/users.component';
import { TipoDocumentoSerieComponent } from './views/configuracao/tipo-documento-serie/tipo-documento-serie.component';
import { CreateOrEditDucomentoSerieComponent } from './views/configuracao/tipo-documento-serie/create-or-edit-ducomento-serie/create-or-edit-ducomento-serie.component';
import { MessageComponent } from './views/Message/message/message.component';
import { DistritosComponent } from './views/configuracao/distritos/distritos.component';
import { CreatOrEditDistritosComponent } from './views/configuracao/distritos/creat-or-edit-distritos/creat-or-edit-distritos.component';
import { InstituicaoComponent } from './views/configuracao/instituicao/instituicao.component';

@NgModule({
  declarations: [
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
