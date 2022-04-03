import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GrupoComunhaoResolve } from "src/app/resolves/grupo-comunhao.resolve";
import { AuthorizationGuard } from "src/app/services/authorization.guard";
import { GruposComunhaoAppComponent } from "./grupos-comunhao.app.component";
import { InscricaoGrupoComponent } from "./inscricao-grupo/inscricao-grupo.component";
import { ListaGruposComponent } from "./lista-grupos/lista-grupos.component";

const routes: Routes = [
    {
      path: '', component: GruposComunhaoAppComponent,
      canActivateChild: [AuthorizationGuard],
      children: [
          { 
            path: 'inscricao/:id' ,
            resolve: {grupoComunhao: GrupoComunhaoResolve},
            component: InscricaoGrupoComponent,
            data: {allowedRoles: ['ROLE_ADMIN', 'ROLE_MEMBRO']},
          },
          {   path: 'lista', 
              component: ListaGruposComponent,
              data: {allowedRoles: ['ROLE_ADMIN', 'ROLE_MEMBRO']},
          },
      ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class GruposComunhaoRoutingModule { }