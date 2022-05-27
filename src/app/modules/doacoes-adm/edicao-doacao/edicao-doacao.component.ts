import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edicao-doacao',
  templateUrl: './edicao-doacao.component.html',
  styleUrls: ['./edicao-doacao.component.scss']
})
export class EdicaoDoacaoComponent implements OnInit {

  edicaoDoacaoForm: FormGroup;
  doacaoId: string;
  doacaoEdicao: DoacaoModel;

  filteredCategorias: CategoriaDoacaoModel[];
  filteredItens: ItemDoacaoModel[];
  filteredFamilias: FamiliaModel[];
  categoriaSelecionada: CategoriaDoacaoModel;

  doacao: DoacaoModel;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,

    private categoriaDoacaoService: CategoriaDoacaoService,
    private itemDoacaoService: ItensDoacaoService,
    private familiaService: FamiliaService,
    private doacaoService: DoacoesService
  ) { }

  ngOnInit(): void {
    this.criaFormulario()

    this.activatedRoute.params.subscribe(params => {
      this.doacaoId = params['id'];
      console.log(this.doacaoId)
      this.consultarDoacao(this.doacaoId) 
    })

  }

  consultarDoacao(doacaoId: string){

    this.doacaoService.consultarDoacaoPorId(doacaoId)
    .subscribe( response => {
      this.doacaoEdicao = response
      console.log(this.doacaoEdicao)
      this.preencheFormularioInicial()
    })
  }

  criaFormulario(){
    this.edicaoDoacaoForm = this.formBuilder.group({
      categoria: [null, Validators.required],
      item: [null, Validators.required],
      tamanho: ['', Validators.required],
      quantidade: [0, Validators.required],
      familia: [null, Validators.required],
      detalhes: [''],
    }); 
  }

  preencheFormularioInicial(){
    this.edicaoDoacaoForm.patchValue({
      categoria: this.doacaoEdicao?.item.categoria,
      item: this.doacaoEdicao?.item,
      tamanho: this.doacaoEdicao?.tamanho,
      quantidade: this.doacaoEdicao?.quantidade,
      familia: this.doacaoEdicao?.familia,
      detalhes: this.doacaoEdicao?.detalhes,
    });
  }

  filtrarCategorias(event){
    let prefixo = event.query;
    this.categoriaDoacaoService.consultarCategoriasDoacao(prefixo)
    .subscribe((categorias) =>  this.filteredCategorias = categorias)
  }

  filtrarItens(event){
    let prefixo = event.query;
    this.categoriaSelecionada = this.edicaoDoacaoForm.get('categoria').value;
    console.log(this.categoriaSelecionada);
    this.itemDoacaoService.consultarItensDoacaoPorCategoria(this.categoriaSelecionada.id, prefixo)
    .subscribe((itens) =>  this.filteredItens = itens)
  }

  filtrarFamilias(event){
    let prefixo = event.query;
    this.familiaService.consultarFamilias()
    .subscribe((familias) =>  this.filteredFamilias = familias)
  }

  editarDoacao(){
    if (this.edicaoDoacaoForm.dirty && this.edicaoDoacaoForm.valid) {
      this.doacao = Object.assign({}, this.doacao, this.edicaoDoacaoForm.value);

      this.doacao.id = this.doacaoEdicao.id;
      
      console.log(this.doacao)
      
      this.doacaoService.editarDoacao(this.doacao)
      .subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Doação alterada com sucesso'});
          setTimeout(() => this.router.navigate(['adm/doacoes/lista']),3000);
          console.log("doação alterada");
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, doação não alterada'});
        });
    }
  }

  verificaSeCategoriaSelecionada(){
    return this.edicaoDoacaoForm.get('categoria').value;
  }

}
