import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GrupoComunhaoResolve } from "src/app/resolves/grupo-comunhao.resolve";
import { AuthorizationGuard } from "src/app/services/authorization.guard";
import { CadastroGrupoComponent } from "./cadastro-grupo/cadastro-grupo.component";
import { DetalhesGrupoComponent } from "./detalhes-grupo/detalhes-grupo.component";
import { EdicaoGrupoComponent } from "./edicao-grupo/edicao-grupo.component";
import { GruposComunhaoAdmAppComponent } from "./grupos-comunhao-adm.app.component";
import { ListaGruposComponent } from "./lista-grupos/lista-grupos.component";

const routes: Routes = [
    {
      path: '', component: GruposComunhaoAdmAppComponent,
      canActivateChild: [AuthorizationGuard],
      children: [
          { 
              path: 'edicao/:id' , 
              component: EdicaoGrupoComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
          { 
            path: 'detalhe/:id' ,
            resolve: {grupoComunhao: GrupoComunhaoResolve},
            component: DetalhesGrupoComponent,
            data: {allowedRoles: ['ROLE_ADMIN']},
          },
          {   path:'cadastro' , 
              component: CadastroGrupoComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
          {   path: 'lista', 
              component: ListaGruposComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
      ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class GruposComunhaoAdmRoutingModule { }
  