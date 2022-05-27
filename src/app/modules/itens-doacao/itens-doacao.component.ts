import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriaDoacaoModel } from 'src/app/models/categoria-doacao.model';
import { ItemDoacaoModel } from 'src/app/models/item-doacao.model';
import { CategoriaDoacaoService } from 'src/app/services/categoria-doacao.service';
import { ItensDoacaoService } from 'src/app/services/itens-doacao.service';

@Component({
  selector: 'app-itens-doacao',
  templateUrl: './itens-doacao.component.html',
  styleUrls: ['./itens-doacao.component.scss']
})
export class ItensDoacaoComponent implements OnInit {

  itens: ItemDoacaoModel[];
  itemSelecionado: ItemDoacaoModel;
  itemParaIncluir: ItemDoacaoModel;
  edicaoItemDoacaoForm: FormGroup;
  totalRecords: number;
  filteredCategorias: CategoriaDoacaoModel[];

  displayModalEdicao: boolean;
  displayModalInclusao: boolean;


  constructor(
    private activatedRoute: ActivatedRoute,
    private itensDoacaoService: ItensDoacaoService,
    private categoriasDoacaoService: CategoriaDoacaoService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.itens = this.activatedRoute.snapshot.data['itensDoacao'];
    this.totalRecords = this.itens.length;
   }

  ngOnInit(): void {
    this.criarFormularioEdicao()
  }

  criarFormularioEdicao(){
    this.edicaoItemDoacaoForm = this.formBuilder.group({
      nome: ["", Validators.required],
      categoria: ["", Validators.required],
    }); 
  }

  filtrarCategorias(event) {
    let prefixo = event.query;
    this.categoriasDoacaoService.consultarCategoriasDoacao(prefixo)
    .subscribe((categorias) =>  this.filteredCategorias = categorias)
  }

  showModalInclusao(){
    this.edicaoItemDoacaoForm.patchValue({
      nome: "",
      categoria: ""
    })
    this.displayModalInclusao = true;
  }

  incluirItemDoacao(){
    if (this.edicaoItemDoacaoForm.dirty && this.edicaoItemDoacaoForm.valid) {
      this.itemParaIncluir = Object.assign({}, this.itemParaIncluir, this.edicaoItemDoacaoForm.value);
      
      this.itensDoacaoService.cadastrarOuEditarItemDoacao(this.itemParaIncluir)
      .subscribe(
        (data) => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Item cadastrado com sucesso'});
          this.itens.push(data)
          this.itens.sort(function(a,b) {
            return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
          });
          this.displayModalInclusao = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, item não cadastrado'});
        }
      );
    }
  }

  showModalEdicao(item?:ItemDoacaoModel){
    this.displayModalEdicao = true;
    this.itemSelecionado = item

    this.edicaoItemDoacaoForm.patchValue({
      nome: this.itemSelecionado.nome,
      categoria: this.itemSelecionado.categoria
    })
  }

  editarItemDoacao(){
    if (this.edicaoItemDoacaoForm.dirty && this.edicaoItemDoacaoForm.valid) {
      this.itemSelecionado = Object.assign({}, this.itemSelecionado, this.edicaoItemDoacaoForm.value);
      
      this.itensDoacaoService.cadastrarOuEditarItemDoacao(this.itemSelecionado)
      .subscribe(
        (data) => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Item alterado com sucesso'});
          let indexItemEditado = this.itens.findIndex(item => item.id === data.id)
          this.itens.splice(indexItemEditado,1, data).sort(function(a,b) {
            return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
          });
          this.displayModalEdicao = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, item não alterado'});
        }
      );
    }
  }

  excluirItem(item:ItemDoacaoModel){
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir o item ${item.nome}`,
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.itensDoacaoService.excluirItemDoacao(item.id).subscribe(
          () => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Item excluído'});
            this.itens = this.itens.filter(itemLista => itemLista.id !== item.id)
          }
        )
      }
  });
  }

}
