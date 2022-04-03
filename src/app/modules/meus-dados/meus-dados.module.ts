import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusDadosComponent } from './meus-dados.component';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';



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
  ]
})
export class MeusDadosModule { }
