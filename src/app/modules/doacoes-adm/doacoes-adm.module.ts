import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CadastroDoacaoComponent } from './cadastro-doacao/cadastro-doacao.component';
import { DetalhesDoacaoComponent } from './detalhes-doacao/detalhes-doacao.component';
import { EdicaoDoacaoComponent } from './edicao-doacao/edicao-doacao.component';
import { ListaDoacoesComponent } from './lista-doacoes/lista-doacoes.component';
import { DoacoesAdmRoutingModule } from './doacoes-adm-routing.module';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DoacoesAdmAppComponent } from './doacoes-adm.app.component';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { DoacaoResolve } from 'src/app/resolves/doacao.resolve';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    DoacoesAdmAppComponent,
    CadastroDoacaoComponent,
    DetalhesDoacaoComponent,
    EdicaoDoacaoComponent,
    ListaDoacoesComponent
    
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
    ChartModule,
    CardModule,
    TooltipModule,

    DoacoesAdmRoutingModule
  ],
  providers: [
    MessageService,
    DatePipe,
    ConfirmationService,
    DoacaoResolve
  ],
})
export class DoacoesAdmModule { }
