import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DoacaoModel } from 'src/app/models/doacao.model';
import { DoacoesService } from 'src/app/services/doacoes.service';

@Component({
  selector: 'app-lista-doacoes',
  templateUrl: './lista-doacoes.component.html',
  styleUrls: ['./lista-doacoes.component.scss']
})
export class ListaDoacoesComponent implements OnInit {

  doacoes: DoacaoModel[];
  totalRecords: number;
  cols: any[];
  exportColumns: any[];
  doacoesToExport: any[];

  dataPedidosVsAguardandoEntrega: any;
  dataPedidosPorMes: any;
  dataPedidosPorCategoria: any;
  chartOptions: any;
  subscription: Subscription;
  
  totalFamiliasComPedido: any;
  totalDoadores: any;

  constructor(
    private doacoesService: DoacoesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.criaColunas()
    this.consultarDoacoes()
  }

  consultarDoacoes(){
    this.doacoesService.consultarDoacoes()
    .subscribe(response => {
      this.doacoes = response;
      console.log(this.doacoes)
      this.totalRecords = response.length;
      this.construirGraficoPedidosVsAguardandoEntrega()
      this.construirGraficoPedidosPorMes()
      this.construirGraficoPedidosPorCategoria()
      this.construirCardFamiliasComPedido()
      this.construirCardTotalDoadores()
     })
  }

  criaColunas(){
    this.cols = [
      { field: 'item', header: 'Item' },
      { field: 'tamanho', header: 'Tamanho' },
      { field: 'quantidade', header: 'Quantidade' },
      { field: 'familia', header: 'Família' },
      { field: 'status', header: 'Status' },
      { field: 'acoes', header: '' },
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  construirGraficoPedidosVsAguardandoEntrega(){

    let doacoesAguardandoEntrega = this.doacoes.filter(doacao => doacao.dataEntrega && !doacao.entregaRealizada);
    let doacoesEntregues = this.doacoes.filter(doacao => doacao.entregaRealizada);
    let doacoesPendentes = this.doacoes.filter(doacao => !doacao.dataEntrega && !doacao.entregaRealizada);
    
    this.dataPedidosVsAguardandoEntrega = {
      labels: ['Aguardando entrega','Entregue', 'Doações pendentes'],
      datasets: [
          {
              data: [doacoesAguardandoEntrega.length, doacoesEntregues.length, doacoesPendentes.length],
              backgroundColor: [
                  "#FFCE56",
                  "#3F51B5",
                  "#78909C"

              ],
              hoverBackgroundColor: [
                  "#FFCE56",
                  "#3F51B5",
                  "#78909C"
              ]
          }
      ]
    };
  }

  construirGraficoPedidosPorMes(){
    let meses;
    let quantidades;

    this.doacoesService.consultarQuantidadesDoacoesMensais()
    .subscribe(response => {
      console.log(response)
      meses = response.map(dado => dado.mes).reverse();
      console.log(meses)
      quantidades = response.map(dado => dado.quantidade).reverse();
      console.log(quantidades)

      this.dataPedidosPorMes = {
        labels: meses,
        datasets: [
            {
                data: quantidades,
                backgroundColor: ["#78909C"],
                label: "Pedidos de doações nos últimos seis meses"
            }
        ]
      };
    })
  }

  construirGraficoPedidosPorCategoria(){
    let categorias;
    let quantidades;

    this.doacoesService.consultarCincoPrincipaisCategoriasDoacoes()
    .subscribe(response => {
      categorias = response.map(dado => dado.categoria);
      quantidades = response.map(dado => dado.quantidade);

      this.dataPedidosPorCategoria = {
        labels: categorias,
        datasets: [
            {
                data: quantidades,
                backgroundColor: ["#3F51B5"],
                label: "Principais categorias de doações"
            }
        ]
      };
    });
    
  }

  construirCardFamiliasComPedido(){
    this.totalFamiliasComPedido = [...new Set(this.doacoes.map(doacao => doacao.familia.id))].length
  }

  construirCardTotalDoadores(){
    let doacoesComDoadores = this.doacoes.filter((doacao)=> doacao.doador)
    this.totalDoadores = [...new Set(doacoesComDoadores.map(doacao => doacao.doador.id))].length
  }

  excluirDoacao(id: number){
      this.confirmationService.confirm({
        message: 'Você tem certeza que deseja excluir esse pedido de doação?',
        header: 'Atenção',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.doacoesService.excluirDoacao(id).subscribe(
            () => {
              this.messageService.add({severity:'success', summary:'Sucesso', detail:'Doação excluída'});
              this.doacoes = this.doacoes.filter(doacao => doacao.id !== id)
            }
          )
        }
    });
  }

  informarEntrega(doacaoParaEntregar){
      this.confirmationService.confirm({
        message: 'Deseja informar entrega desse pedido de doação?',
        header: 'Informar entrega',
        icon: 'pi pi-info-circle',
        accept: () => {
          console.log("entrega registarada")
          this.doacoesService.alterarRegistroEntrega(doacaoParaEntregar).subscribe(
            (data) => {
              this.messageService.add({severity:'success', summary:'Sucesso', detail:'Entrega resgistrada'});
              let indexDoacaoEditada = this.doacoes.findIndex(item => item.id === data.id)
              this.doacoes.splice(indexDoacaoEditada,1, data)
            }
          )
        }
    });
  }

  cancelarEntrega(doacaoParaEntregar){
      this.confirmationService.confirm({
        message: 'Deseja cancelar o registro de entrega desse pedido de doação?',
        header: 'Cancelar entrega',
        icon: 'pi pi-info-circle',
        accept: () => {
          console.log("cancelamento do registro de entrega")
            this.doacoesService.alterarRegistroEntrega(doacaoParaEntregar).subscribe(
            (data) => {
              this.messageService.add({severity:'success', summary:'Sucesso', detail:'Registro de entrega cancelado'});
              let indexDoacaoEditada = this.doacoes.findIndex(item => item.id === data.id)
              this.doacoes.splice(indexDoacaoEditada,1, data)
            }
          )
        }
    });
  }

  exportPdf() {
    this.doacoesToExport = JSON.parse(JSON.stringify(this.doacoes))
    this.doacoesToExport.map(doacao => {
      doacao.item = doacao?.item.nome;
      doacao.familia = doacao?.familia.principal.nomeCompleto;
      doacao.status = doacao.entregaRealizada? 'Entregue' : (doacao.dataEntrega? 'Aguardando Entrega': 'Pendente')
    })

    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default("l");
            (doc as any).autoTable(this.exportColumns, this.doacoesToExport);
            doc.save('pedidos-doacoes.pdf');
            console.log(this.doacoes)
        })
    })
  }
}
