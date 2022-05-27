import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { DoacoesComponent } from './modules/doacoes/doacoes/doacoes.component';
import { ItensDoacaoComponent } from './modules/itens-doacao/itens-doacao.component';
import { LoginComponent } from './modules/login/login.component';
import { MeusDadosComponent } from './modules/meus-dados/meus-dados.component';
import { AccessDeniedComponent } from './modules/navegacao/access-denied/access-denied.component';
import { EmConstrucaoComponent } from './modules/navegacao/em-construcao/em-construcao.component';
import { UsuariosComponent } from './modules/usuarios/usuarios.component';
import { ItensDoacaoResolve } from './resolves/item-doacao.resolve';
import { UsuarioResolve } from './resolves/usuario.resolve';
import { AuthGuard } from './services/auth.guard';
import { AuthorizationGuard } from './services/authorization.guard';

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
  { 
    path: 'doacoes',
    component: DoacoesComponent,
    canActivate: [AuthGuard],
    data: {
    authGuardRedirect: 'login'
    }
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
  },

  { 
    path: 'adm/usuarios',
    resolve: {usuarios: UsuarioResolve}, 
    component: UsuariosComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {
      authGuardRedirect: 'login',
      allowedRoles: ['ROLE_ADMIN']
    }
  },

  { 
    path: 'adm/itens-doacao',
    resolve: {itensDoacao: ItensDoacaoResolve},
    component: ItensDoacaoComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    data: {
      authGuardRedirect: 'login',
      allowedRoles: ['ROLE_ADMIN']
    }
  },

  { path: 'adm/familias',
    canActivate: [AuthGuard],
    data: {
    authGuardRedirect: 'login'
    }, 
    loadChildren:
    ()=> import('./modules/familias/familias.module')
    .then(m => m.FamiliasModule)
  },

  { path: 'adm/doacoes',
    canActivate: [AuthGuard],
    data: {
    authGuardRedirect: 'login'
    }, 
    loadChildren:
    ()=> import('./modules/doacoes-adm/doacoes-adm.module')
    .then(m => m.DoacoesAdmModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
