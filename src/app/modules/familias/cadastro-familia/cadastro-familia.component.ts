import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { CepConsultaModel } from 'src/app/models/cep-consulta.model';
import { FamiliaModel, PessoaSemCadastro } from 'src/app/models/familia.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { FamiliaService } from 'src/app/services/familia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-cadastro-familia',
  templateUrl: './cadastro-familia.component.html',
  styleUrls: ['./cadastro-familia.component.scss']
})
export class CadastroFamiliaComponent implements OnInit {

  cadastroFamiliaForm: FormGroup;
  inclusaoFamiliarForm: FormGroup;

  filteredMembros: UsuarioModel[];
  listaFamiliaresSemCadastro: PessoaSemCadastro[] = new Array();
  familia: FamiliaModel;
  displayModal: any;
  pessoaSemCadastro: PessoaSemCadastro;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private messageService: MessageService,

    private usuarioService: UsuarioService,
    private familiaService: FamiliaService
  ) { }

  ngOnInit(): void {

    this.cadastroFamiliaForm = this.formBuilder.group({
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
    
  }

  cadastrarFamilia(){
    if (this.cadastroFamiliaForm.dirty && this.cadastroFamiliaForm.valid) {
      this.familia = Object.assign({}, this.familia, this.cadastroFamiliaForm.value);

      this.familia.familiaresSemCadastro = this.listaFamiliaresSemCadastro;
      
      if(this.familia.familiares == null) {
        this.familia.familiares = new Array(0)
      }

      if (this.familia.familiaresSemCadastro == null) {
        this.familia.familiaresSemCadastro = new Array(0)
      }
      
        console.log(this.familia)
      
        this.familiaService.cadastrarFamilia(this.familia)
      .subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Família cadastrada com sucesso'});
          setTimeout(() => this.router.navigate(['adm/familias/lista']),3000);
          console.log("familia cadastrada");
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, família não cadastrada'});
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
    this.cadastroFamiliaForm.patchValue({
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
