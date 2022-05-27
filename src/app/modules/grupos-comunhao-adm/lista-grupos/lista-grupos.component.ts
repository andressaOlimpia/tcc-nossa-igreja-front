import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GrupoComunhaoModel } from 'src/app/models/grupo-comunhao.model';
import { GruposComunhaoService } from 'src/app/services/grupos-comunhao.service';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.scss']
})
export class ListaGruposComponent implements OnInit {

  grupos: GrupoComunhaoModel[];
  totalRecords: number;
  cols: any[];
  exportColumns: any[];
  exportGruposComunhao: any[];

  constructor(
    private grupoComunhaoService: GruposComunhaoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.criaColunas()
    this.grupoComunhaoService.consultarGruposComunhao()
    .subscribe(response => {
      this.grupos = response;
      console.log(this.grupos)
      this.totalRecords = response.length;
     })
  }

  criaColunas(){
    this.cols = [
      { field: 'nome', header: 'Grupo' },
      { field: 'diaSemana', header: 'Dia da semana' },
      { field: 'horario', header: 'Horário' },
      { field: 'lider', header: 'Líder' },
      { field: 'participantes', header: 'Nº de participantes' },
      { field: 'status', header: 'Status' },
      { field: 'acoes', header: '' },
  ];

    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  verificaSeGrupoLotado(grupo: GrupoComunhaoModel):boolean {
    return grupo.maxParticipantes <= grupo.participantes.length
  }

  excluirGrupoComunhao(id: any) {
    this.confirmationService.confirm({
        message: 'Você tem certeza que deseja excluir esse grupo?',
        header: 'Atenção',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.grupoComunhaoService.excluirGrupoComunhao(id).subscribe(
            () => {
              this.messageService.add({severity:'success', summary:'Sucesso', detail:'Grupo de comunhão excluído'});
              this.grupos = this.grupos.filter(grupo => grupo.id !== id)
            }
          )
        }
    });
  }

  exportPdf(){
    this.exportGruposComunhao = JSON.parse(JSON.stringify(this.grupos))
    this.exportGruposComunhao.map(grupo => {
      grupo.status = this.verificaSeGrupoLotado(grupo)? 'Lotado' : 'Disponível'
      grupo.lider = grupo.lider?.nomeCompleto
      grupo.participantes = grupo.participantes?.length
      
    })

    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default("l");
            (doc as any).autoTable(this.exportColumns, this.exportGruposComunhao);
            doc.save('grupos-comunhao.pdf');
        })
    })
  }
}
