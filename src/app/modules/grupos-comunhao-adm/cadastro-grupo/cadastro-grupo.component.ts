import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { CepConsultaModel } from 'src/app/models/cep-consulta.model';
import { GrupoComunhaoModel } from 'src/app/models/grupo-comunhao.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { DiaSemanaEnum } from 'src/app/models/dia-semana.enum';
import { GruposComunhaoService } from 'src/app/services/grupos-comunhao.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StringUtils } from 'src/app/utils/string-utils';

@Component({
  selector: 'app-cadastro-grupo',
  templateUrl: './cadastro-grupo.component.html',
  styleUrls: ['./cadastro-grupo.component.scss']
})
export class CadastroGrupoComponent implements OnInit {

  cadastroGrupoForm: FormGroup;

  diasDaSemana: SelectItem[];
  diaSemanaSelecionado: SelectItem;
  filteredMembros: UsuarioModel[];
  listaDeUsuariosFiltrados: SelectItem[];
  grupoComunhao: GrupoComunhaoModel;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private messageService: MessageService,
    private datePipe: DatePipe,

    private usuarioService: UsuarioService,
    private grupoComunhaoService: GruposComunhaoService
  ) { }

  ngOnInit(): void {
    this.diasDaSemana = this.getDiasDaSemana();

    this.cadastroGrupoForm = this.formBuilder.group({
      horario: [new Date(), Validators.required],
      lider: [null],
      participantes: [new Array(0)],
      maxParticipantes: [0, Validators.required],
      nome: [''],
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
  }

  cadastrarGrupo(){
    if (this.cadastroGrupoForm.dirty && this.cadastroGrupoForm.valid) {
      this.grupoComunhao = Object.assign({}, this.grupoComunhao, this.cadastroGrupoForm.value);
      
      this.grupoComunhao.diaSemana = this.diaSemanaSelecionado.value;
      this.grupoComunhao.horario = this.datePipe.transform(this.cadastroGrupoForm.value.horario, 'HH:mm')
      if(this.grupoComunhao.participantes == null) {
        this.grupoComunhao.participantes = new Array(0)}
      
        console.log(this.grupoComunhao)
      
        this.grupoComunhaoService.cadastrarGrupoComunhao(this.grupoComunhao)
      .subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Grupo cadastrado com sucesso'});
          setTimeout(() => this.router.navigate(['adm/grupos-comunhao/lista']),3000);
          console.log("grupo cadastrado");
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, grupo não cadastrado'});
        });
    }
  }

  getDiasDaSemana() : SelectItem[]{
    return Object.keys(DiaSemanaEnum).map(key => ({ label: DiaSemanaEnum[key], value: key}));
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

    this.grupoComunhaoService.consultarCepEndereco(cep)
      .subscribe(cepRetorno => this.preencherEnderecoConsulta(cepRetorno));
  }

  preencherEnderecoConsulta(cepConsulta: CepConsultaModel) {
    this.cadastroGrupoForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }
}
