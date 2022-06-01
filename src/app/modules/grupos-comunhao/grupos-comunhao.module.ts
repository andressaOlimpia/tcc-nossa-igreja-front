import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GruposComunhaoRoutingModule } from './grupo-comunhao-routing.module';
import { GruposComunhaoAppComponent } from './grupos-comunhao.app.component';
import { ListaGruposComponent } from './lista-grupos/lista-grupos.component';
import { GrupoComunhaoResolve } from 'src/app/resolves/grupo-comunhao.resolve';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InscricaoGrupoComponent } from './inscricao-grupo/inscricao-grupo.component';
import { AuthService } from 'src/app/services/auth.service';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    GruposComunhaoAppComponent,
    ListaGruposComponent,
    InscricaoGrupoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    TooltipModule,

    GruposComunhaoRoutingModule
  ],
  providers: [
    MessageService,
    AuthService,
    DatePipe,
    ConfirmationService,
    GrupoComunhaoResolve
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GruposComunhaoModule { }
