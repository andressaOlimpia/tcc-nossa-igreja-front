import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { LoginComponent } from './modules/login/login.component';
import { MeusDadosComponent } from './modules/meus-dados/meus-dados.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'meus-dados', component:MeusDadosComponent},

  { path: 'adm/grupos-comunhao', 
    loadChildren:
    ()=> import('./modules/grupos-comunhao-adm/grupos-comunhao-adm.module')
    .then(m => m.GruposComunhaoAdmModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
