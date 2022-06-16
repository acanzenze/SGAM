import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './views/clientes/clientes.component';
import { CategoriasComponent } from './views/configuracao/categorias/categorias.component';
import { MunicipiosComponent } from './views/configuracao/municipios/municipios.component';
import { PermissionsComponent } from './views/configuracao/permissions/permissions.component';
import { ProvinciasComponent } from './views/configuracao/provincias/provincias.component';
import { RolesComponent } from './views/configuracao/roles/roles.component';
import { TipoDocumentosComponent } from './views/configuracao/tipo-documentos/tipo-documentos.component';
import { UsersComponent } from './views/configuracao/users/users.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProdutosComponent } from './views/produtos/produtos.component';
import { LoginComponent } from './views/login/login.component';
import { SeriesComponent } from './views/configuracao/series/series.component';
import { TipoDocumentoSerieComponent } from './views/configuracao/tipo-documento-serie/tipo-documento-serie.component';
import { MovimentoCaixaComponent } from './views/configuracao/movimento-caixa/movimento-caixa.component';
import { DistritosComponent } from './views/configuracao/distritos/distritos.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  /*{
    path: "dashboard",
    component: LoginComponent,
  }, */
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: 'operacoes',
    children: [
      { path: 'categorias-produto', component: CategoriasComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'permissoes', component: PermissionsComponent },
      { path: 'utilizadores', component: UsersComponent }
    ]
  },
  {
    path: 'configuracao',
    children: [
      { path: 'provincias', component: ProvinciasComponent },
      { path: 'municipios', component: MunicipiosComponent },
      { path: 'tipo-documentos', component: TipoDocumentosComponent },
      { path: 'documento-series', component: TipoDocumentoSerieComponent },
      { path: 'series', component: SeriesComponent },
      { path: 'movimento-caixa', component: MovimentoCaixaComponent },
      {path:  'distritos', component: DistritosComponent}
    ]
  },
  {
    path: 'clientes',
    children: [
      { path: '', component: ClientesComponent }
    ]
  },
  {
    path: 'produtos',
    children: [
      { path: '', component: ProdutosComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
