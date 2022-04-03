import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MenubarModule} from 'primeng/menubar';
import {ToolbarModule} from 'primeng/toolbar';
import { SharedModule } from 'primeng/api'

import { NavbarComponent } from './navbar/navbar.component';
import { ButtonModule } from 'primeng/button';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';


@NgModule({
  declarations: [
    NavbarComponent,
    AccessDeniedComponent,
    EmConstrucaoComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ToolbarModule,
    SharedModule,
    ButtonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavegacaoModule { }
