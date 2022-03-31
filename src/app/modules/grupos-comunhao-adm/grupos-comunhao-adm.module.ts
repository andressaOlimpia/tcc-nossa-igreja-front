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


import { CadastroGrupoComponent } from './cadastro-grupo/cadastro-grupo.component';
import { EdicaoGrupoComponent } from './edicao-grupo/edicao-grupo.component';
import { ListaGruposComponent } from './lista-grupos/lista-grupos.component';
import { GruposComunhaoAdmAppComponent } from './grupos-comunhao-adm.app.component';
import { GruposComunhaoAdmRoutingModule } from './grupos-comunhao-adm-routing.module';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    GruposComunhaoAdmAppComponent,
    CadastroGrupoComponent,
    EdicaoGrupoComponent,
    ListaGruposComponent
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

    GruposComunhaoAdmRoutingModule
  ],
  providers: [
    MessageService,
    DatePipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GruposComunhaoAdmModule { }
