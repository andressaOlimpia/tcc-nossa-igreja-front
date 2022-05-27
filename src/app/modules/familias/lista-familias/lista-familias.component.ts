import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FamiliaModel, PessoaSemCadastro } from 'src/app/models/familia.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-lista-familias',
  templateUrl: './lista-familias.component.html',
  styleUrls: ['./lista-familias.component.scss']
})
export class ListaFamiliasComponent implements OnInit {

  familias: FamiliaModel[];
  totalRecords: number;
  cols: any[];
  exportColumns: any[];
  exportFamilias: any[];

  constructor(
    private familiaService: FamiliaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.criaColunas()
    this.familiaService.consultarFamilias()
    .subscribe(response => {
      this.familias = response;
      this.totalRecords = response.length;
     })
  }

  criaColunas(){
    this.cols = [
      { field: 'principal', header: 'Principal' },
      { field: 'familiares', header: 'Familiares' },
      { field: 'endereco', header: 'Endereço' },
      { field: 'acoes', header: '' },
  ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  excluirFamilia(id: number){
      this.confirmationService.confirm({
        message: 'Você tem certeza que deseja excluir essa família?',
        header: 'Atenção',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.familiaService.excluirfamilia(id).subscribe(
            () => {
              this.messageService.add({severity:'success', summary:'Sucesso', detail:'Família excluída'});
              this.familias = this.familias.filter(familia => familia.id !== id)
            }
          )
        }
    });
  }

  exportPdf() {
    this.exportFamilias = JSON.parse(JSON.stringify(this.familias))

    
    this.exportFamilias.map(familia => {
      familia.principal = familia?.principal?.nomeCompleto

      familia.familiares = this.concatenaNomeFamiliares(familia.familiares)
      .concat(this.concatenaNomeFamiliaresSemCadastro(familia.familiaresSemCadastro))

      familia.endereco = this.concatenaEndereco(familia.endereco)
    })

    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default("l");
            (doc as any).autoTable(this.exportColumns, this.exportFamilias);
            doc.save('familias.pdf');
        })
    })
  }

  concatenaNomeFamiliares(familiares){
    console.log('familiares')
    console.log(familiares)
    let familiaresNomes: string = '';

    familiares.forEach(familiar => {
    familiaresNomes = familiaresNomes.concat(`${familiar.firstName} `)
    console.log(familiar.firstName)
    })
    console.log('familiares nomes')
    console.log(familiaresNomes)
    return familiaresNomes;
  }

  concatenaNomeFamiliaresSemCadastro(familiares){
    let familiaresNomes: string = '';
    familiares.forEach(familiar => {
    familiaresNomes = familiaresNomes.concat(`${familiar.nome} `)
    })
    return familiaresNomes;
  }

  concatenaEndereco(endereco){
    let enderecoCompleto: string = `Logradouro: ${endereco.logradouro}, nº: ${endereco.numero}, complemento: ${endereco.complemento}, bairro: ${endereco.bairro}, cidade: ${endereco.cidade}, CEP: ${endereco.cep}`;
    return enderecoCompleto;
  }

}
