import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CepConsultaModel } from 'src/app/models/cep-consulta.model';
import { FamiliaModel, PessoaSemCadastro } from 'src/app/models/familia.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FamiliaService } from 'src/app/services/familia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-edicao-familia',
  templateUrl: './edicao-familia.component.html',
  styleUrls: ['./edicao-familia.component.scss']
})
export class EdicaoFamiliaComponent implements OnInit {

  familiaId: string;

  edicaoFamiliaForm: FormGroup;
  inclusaoFamiliarForm: FormGroup;

  filteredMembros: UsuarioModel[];
  listaFamiliaresSemCadastro: PessoaSemCadastro[] = new Array();
  familia: FamiliaModel;
  displayModal: any;
  pessoaSemCadastro: PessoaSemCadastro;
  familiaEdicao: FamiliaModel;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,

    private usuarioService: UsuarioService,
    private familiaService: FamiliaService
  ) { }

  ngOnInit(): void {

    this.edicaoFamiliaForm = this.formBuilder.group({
      principal: [null, Validators.required],
      familiares: [new Array(0)],
      familiaresSemCadastro:[new Array(0)], 
      endereco: this.formBuilder.group({
        cep: ['', Validators.required],
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]]
      })
    });
    
    
    this.inclusaoFamiliarForm = this.formBuilder.group({
      nome: ["", Validators.required],
      sobrenome: ["", Validators.required],
      dataNascimento: ["", Validators.required],
    }); 
    

    this.activatedRoute.params.subscribe(params => {
      this.familiaId = params['id'];
      this.consultarFamilia(this.familiaId) 
    })
  }

  consultarFamilia(id: string){

    this.familiaService.consultarfamiliaPorId(id)
    .subscribe( response => {
      this.familiaEdicao = response
      this.listaFamiliaresSemCadastro = response.familiaresSemCadastro
      console.log(this.familiaEdicao)
      this.preencheFormularioInicial()
    })
  }

  preencheFormularioInicial(){   
    this.edicaoFamiliaForm.patchValue({
      principal: this.familiaEdicao?.principal,
      familiares: this.familiaEdicao?.familiares,
      familiaresSemCadastro:[new Array(0)], 
      endereco: {
        cep: this.familiaEdicao?.endereco?.cep,
        logradouro: this.familiaEdicao?.endereco?.logradouro,
        numero: this.familiaEdicao?.endereco?.numero,
        complemento: this.familiaEdicao?.endereco?.complemento,
        bairro: this.familiaEdicao?.endereco?.bairro,
        cidade: this.familiaEdicao?.endereco?.cidade,
        estado: this.familiaEdicao?.endereco?.estado
      }
    })
  }

  editarFamilia(){
    if (this.edicaoFamiliaForm.dirty && this.edicaoFamiliaForm.valid) {
      this.familia = Object.assign({}, this.familia, this.edicaoFamiliaForm.value);

      this.familia.id = this.familiaEdicao.id
      this.familia.endereco.id = this.familiaEdicao.endereco.id
      this.familia.familiaresSemCadastro = this.listaFamiliaresSemCadastro;
      
      if(this.familia.familiares == null) {
        this.familia.familiares = new Array(0)
      }

      if (this.familia.familiaresSemCadastro == null) {
        this.familia.familiaresSemCadastro = new Array(0)
      }
      
        console.log(this.familia)
      
        this.familiaService.editarfamilia(this.familia)
      .subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Família alterada com sucesso'});
          setTimeout(() => this.router.navigate(['adm/familias/lista']),3000);
          console.log("familia alterada");
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, família não alterada'});
        });
    }
  }

  filtrarUsuarios(event) {
    let prefixo = event.query;
    this.usuarioService.listarUsuariosFiltradosPorPrefixo(prefixo)
    .subscribe((usuarios) =>  this.filteredMembros = usuarios)
  }

  buscarCep(event) {
    let cep = event.target.value;
    console.log(cep)
    cep = StringUtils.somenteNumeros(cep);
    if (cep.length < 8) return;

    this.familiaService.consultarCepEndereco(cep)
      .subscribe(cepRetorno => this.preencherEnderecoConsulta(cepRetorno));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsultaModel) {
    this.edicaoFamiliaForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }

  incluirFamiliarSemCadastro(){
    let familiar = Object.assign({}, this.pessoaSemCadastro, this.inclusaoFamiliarForm.value);
    let dataNascimento = familiar.dataNascimento.split("/").reverse().join('-')
    familiar.dataNascimento = dataNascimento
    this.listaFamiliaresSemCadastro.push(familiar)
    console.log(this.listaFamiliaresSemCadastro)
    this.displayModal = false;
  }

  excluirFamiliarSemCadastro(nome: String){
    this.listaFamiliaresSemCadastro = this.listaFamiliaresSemCadastro.filter( pessoa => pessoa.nome !== nome)
    console.log(this.listaFamiliaresSemCadastro)
  }

}
