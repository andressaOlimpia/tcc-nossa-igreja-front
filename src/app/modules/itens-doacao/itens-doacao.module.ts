import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensDoacaoComponent } from './itens-doacao.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItensDoacaoResolve } from 'src/app/resolves/item-doacao.resolve';
import { TooltipModule } from 'primeng/tooltip';



@NgModule({
  declarations: [
    ItensDoacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    AutoCompleteModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    TooltipModule,
  ],

  providers: [
    MessageService,
    ConfirmationService,
    ItensDoacaoResolve
  ],
})
export class ItensDoacaoModule { }
