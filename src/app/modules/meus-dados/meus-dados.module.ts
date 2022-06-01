import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusDadosComponent } from './meus-dados.component';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    MeusDadosComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputMaskModule,
    DialogModule,
    TooltipModule,
    TableModule,
    AutoCompleteModule,
    DropdownModule,
    ConfirmDialogModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
})
export class MeusDadosModule { }
