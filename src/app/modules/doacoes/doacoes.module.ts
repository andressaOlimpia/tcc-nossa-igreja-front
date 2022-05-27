import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoacoesComponent } from './doacoes/doacoes.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    DoacoesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    TableModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    CalendarModule,
    DialogModule,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DoacoesModule { }
