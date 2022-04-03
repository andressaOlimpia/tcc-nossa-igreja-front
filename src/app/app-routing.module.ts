import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { LoginComponent } from './modules/login/login.component';
import { MeusDadosComponent } from './modules/meus-dados/meus-dados.component';
import { AccessDeniedComponent } from './modules/navegacao/access-denied/access-denied.component';
import { EmConstrucaoComponent } from './modules/navegacao/em-construcao/em-construcao.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'acesso-negado', component: AccessDeniedComponent},
  { path: 'em-construcao', component: EmConstrucaoComponent},
  { 
    path: 'meus-dados',
    component: MeusDadosComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardRedirect: 'login'
    },
  },

  { path: 'adm/grupos-comunhao', 
    canActivate: [AuthGuard],
    data: {
      authGuardRedirect: 'login'
    },
    loadChildren:
    ()=> import('./modules/grupos-comunhao-adm/grupos-comunhao-adm.module')
    .then(m => m.GruposComunhaoAdmModule)
  },

  { path: 'grupos-comunhao',
    canActivate: [AuthGuard],
    data: {
    authGuardRedirect: 'login'
    }, 
    loadChildren:
    ()=> import('./modules/grupos-comunhao/grupos-comunhao.module')
    .then(m => m.GruposComunhaoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
