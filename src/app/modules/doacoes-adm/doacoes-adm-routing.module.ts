import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DoacaoResolve } from "src/app/resolves/doacao.resolve";
import { AuthorizationGuard } from "src/app/services/authorization.guard";
import { CadastroDoacaoComponent } from "./cadastro-doacao/cadastro-doacao.component";
import { DetalhesDoacaoComponent } from "./detalhes-doacao/detalhes-doacao.component";
import { DoacoesAdmAppComponent } from "./doacoes-adm.app.component";
import { EdicaoDoacaoComponent } from "./edicao-doacao/edicao-doacao.component";
import { ListaDoacoesComponent } from "./lista-doacoes/lista-doacoes.component";

const routes: Routes = [
    {
      path: '', component: DoacoesAdmAppComponent,
      canActivateChild: [AuthorizationGuard],
      children: [
          { 
              path: 'edicao/:id' , 
              component: EdicaoDoacaoComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
          { 
            path: 'detalhe/:id' ,
            resolve: {doacao: DoacaoResolve},
            component: DetalhesDoacaoComponent,
            data: {allowedRoles: ['ROLE_ADMIN']},
          },
          {   path:'cadastro' , 
              component: CadastroDoacaoComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
          {   path: 'lista', 
              component: ListaDoacoesComponent,
              data: {allowedRoles: ['ROLE_ADMIN']},
          },
      ]
  }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DoacoesAdmRoutingModule { }
  