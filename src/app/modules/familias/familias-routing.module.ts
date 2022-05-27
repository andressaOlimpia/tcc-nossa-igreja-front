import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FamiliaResolve } from "src/app/resolves/familia.resolve";
import { AuthorizationGuard } from "src/app/services/authorization.guard";
import { CadastroFamiliaComponent } from "./cadastro-familia/cadastro-familia.component";
import { DetalhesFamiliaComponent } from "./detalhes-familia/detalhes-familia.component";
import { EdicaoFamiliaComponent } from "./edicao-familia/edicao-familia.component";
import { FamiliasAppComponent } from "./familias.app.component";
import { ListaFamiliasComponent } from "./lista-familias/lista-familias.component";

const routes: Routes = [
    {
      path: '', component: FamiliasAppComponent,
      canActivateChild: [AuthorizationGuard],
      children: [
          { 
              path: 'edicao/:id' , 
              component: EdicaoFamiliaComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
          { 
            path: 'detalhe/:id' ,
            component: DetalhesFamiliaComponent,
            resolve: {familia: FamiliaResolve},
            data: {allowedRoles: ['ROLE_ADMIN']},
          },
          {   path:'cadastro' , 
              component: CadastroFamiliaComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
          {   path: 'lista', 
              component: ListaFamiliasComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
      ]
  }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FamiliasRoutingModule { }