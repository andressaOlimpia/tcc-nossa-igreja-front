import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroGrupoComponent } from "./cadastro-grupo/cadastro-grupo.component";
import { EdicaoGrupoComponent } from "./edicao-grupo/edicao-grupo.component";
import { GruposComunhaoAdmAppComponent } from "./grupos-comunhao-adm.app.component";
import { ListaGruposComponent } from "./lista-grupos/lista-grupos.component";

const routes: Routes = [
    {
      path: '', component: GruposComunhaoAdmAppComponent,
      children: [
          { 
              path: 'editar/:id' , 
              component: EdicaoGrupoComponent,
          },
          {   path:'cadastro' , 
              component: CadastroGrupoComponent
          },
          {   path: 'lista', 
              component: ListaGruposComponent
          },
      ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class GruposComunhaoAdmRoutingModule { }
  