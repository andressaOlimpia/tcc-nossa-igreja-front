import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusDadosComponent } from './meus-dados.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    MeusDadosComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class MeusDadosModule { }
