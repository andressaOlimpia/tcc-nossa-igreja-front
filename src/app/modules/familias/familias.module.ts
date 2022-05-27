import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListaFamiliasComponent } from './lista-familias/lista-familias.component';
import { CadastroFamiliaComponent } from './cadastro-familia/cadastro-familia.component';
import { DetalhesFamiliaComponent } from './detalhes-familia/detalhes-familia.component';
import { EdicaoFamiliaComponent } from './edicao-familia/edicao-familia.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FamiliasRoutingModule } from './familias-routing.module';
import { FamiliasAppComponent } from './familias.app.component';
import { DialogModule } from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { FamiliaResolve } from 'src/app/resolves/familia.resolve';



@NgModule({
  declarations: [
    FamiliasAppComponent,
    ListaFamiliasComponent,
    CadastroFamiliaComponent,
    DetalhesFamiliaComponent,
    EdicaoFamiliaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputMaskModule,
    DropdownModule,
    AutoCompleteModule,
    TableModule,
    DataViewModule,
    ConfirmDialogModule,
    DialogModule,
    CardModule,
    ChipModule,

    FamiliasRoutingModule
  ]
,
providers: [
  MessageService,
  DatePipe,
  ConfirmationService,
  FamiliaResolve
],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FamiliasModule { }
