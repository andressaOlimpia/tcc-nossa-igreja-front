import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaDoacaoModel } from 'src/app/models/categoria-doacao.model';
import { DoacaoModel } from 'src/app/models/doacao.model';
import { FamiliaModel } from 'src/app/models/familia.model';
import { ItemDoacaoModel } from 'src/app/models/item-doacao.model';
import { CategoriaDoacaoService } from 'src/app/services/categoria-doacao.service';
import { DoacoesService } from 'src/app/services/doacoes.service';
import { FamiliaService } from 'src/app/services/familia.service';
import { ItensDoacaoService } from 'src/app/services/itens-doacao.service';

@Component({
  selector: 'app-cadastro-doacao',
  templateUrl: './cadastro-doacao.component.html',
  styleUrls: ['./cadastro-doacao.component.scss']
})
export class CadastroDoacaoComponent implements OnInit {

  cadastroDoacaoForm: FormGroup;

  filteredCategorias: CategoriaDoacaoModel[];
  filteredItens: ItemDoacaoModel[];
  filteredFamilias: FamiliaModel[];
  categoriaSelecionada: CategoriaDoacaoModel;

  doacao: DoacaoModel;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private messageService: MessageService,
    private datePipe: DatePipe,

    private categoriaDoacaoService: CategoriaDoacaoService,
    private itemDoacaoService: ItensDoacaoService,
    private familiaService: FamiliaService,
    private doacaoService: DoacoesService
  ) { }

  ngOnInit(): void {
    this.cadastroDoacaoForm = this.formBuilder.group({
      categoria: [null, Validators.required],
      item: [null, Validators.required],
      tamanho: ['', Validators.required],
      quantidade: [0, Validators.required],
      familia: [null, Validators.required],
      detalhes: [''],
    }); 
  }

  filtrarCategorias(event){
    let prefixo = event.query;
    this.categoriaDoacaoService.consultarCategoriasDoacao(prefixo)
    .subscribe((categorias) =>  this.filteredCategorias = categorias)
  }

  filtrarItens(event){
    let prefixo = event.query;
    this.categoriaSelecionada = this.cadastroDoacaoForm.get('categoria').value;
    console.log(this.categoriaSelecionada);
    this.itemDoacaoService.consultarItensDoacaoPorCategoria(this.categoriaSelecionada.id, prefixo)
    .subscribe((itens) =>  this.filteredItens = itens)
  }

  filtrarFamilias(event){
    let prefixo = event.query;
    this.familiaService.consultarFamilias()
    .subscribe((familias) =>  this.filteredFamilias = familias)
  }

  cadastrarDoacao(){
    if (this.cadastroDoacaoForm.dirty && this.cadastroDoacaoForm.valid) {
      this.doacao = Object.assign({}, this.doacao, this.cadastroDoacaoForm.value);
      
      console.log(this.doacao)
      
      this.doacaoService.cadastrarDoacao(this.doacao)
      .subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Doação cadastrada com sucesso'});
          setTimeout(() => this.router.navigate(['adm/doacoes/lista']),3000);
          console.log("doação cadastrada");
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, doação não cadastrada'});
        });
    }
  }

  verificaSeCategoriaSelecionada(){
    return this.cadastroDoacaoForm.get('categoria').value;
  }
}
