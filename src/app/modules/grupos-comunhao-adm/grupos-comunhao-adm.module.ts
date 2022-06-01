import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {DataViewModule} from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


import { CadastroGrupoComponent } from './cadastro-grupo/cadastro-grupo.component';
import { EdicaoGrupoComponent } from './edicao-grupo/edicao-grupo.component';
import { ListaGruposComponent } from './lista-grupos/lista-grupos.component';
import { GruposComunhaoAdmAppComponent } from './grupos-comunhao-adm.app.component';
import { GruposComunhaoAdmRoutingModule } from './grupos-comunhao-adm-routing.module';
import { DetalhesGrupoComponent } from './detalhes-grupo/detalhes-grupo.component';
import { GrupoComunhaoResolve } from 'src/app/resolves/grupo-comunhao.resolve';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    GruposComunhaoAdmAppComponent,
    CadastroGrupoComponent,
    EdicaoGrupoComponent,
    ListaGruposComponent,
    DetalhesGrupoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputMaskModule,
    DropdownModule,
    AutoCompleteModule,
    CalendarModule,
    TableModule,
    DataViewModule,
    TagModule,
    ConfirmDialogModule,
    TooltipModule,

    GruposComunhaoAdmRoutingModule
  ],
  providers: [
    MessageService,
    DatePipe,
    ConfirmationService,
    GrupoComunhaoResolve
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GruposComunhaoAdmModule { }
