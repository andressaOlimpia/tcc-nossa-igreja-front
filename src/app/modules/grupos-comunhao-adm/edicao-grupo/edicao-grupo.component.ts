import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { CepConsultaModel } from 'src/app/models/cep-consulta.model';
import { GrupoComunhaoModel } from 'src/app/models/grupo-comunhao.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { GruposComunhaoService } from 'src/app/services/grupos-comunhao.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StringUtils } from 'src/app/utils/string-utils';
import { DiaSemanaEnum } from '../../../models/dia-semana.enum';

@Component({
  selector: 'app-edicao-grupo',
  templateUrl: './edicao-grupo.component.html',
  styleUrls: ['./edicao-grupo.component.scss']
})
export class EdicaoGrupoComponent implements OnInit {

  edicaoGrupoForm: FormGroup;
  grupoId: string;
  grupoEdicao: GrupoComunhaoModel;

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
    private activatedRoute: ActivatedRoute,

    private usuarioService: UsuarioService,
    private grupoComunhaoService: GruposComunhaoService
  ) {}

  ngOnInit(): void {

    this.diasDaSemana = this.getDiasDaSemana();
    this.criaFormulario()

    this.activatedRoute.params.subscribe(params => {
      this.grupoId = params['id'];
      this.consultarGrupo(this.grupoId) 
    })
  }

  editarGrupo(){
    if (this.edicaoGrupoForm.dirty && this.edicaoGrupoForm.valid) {
      this.grupoComunhao = Object.assign({}, this.grupoComunhao, this.edicaoGrupoForm.value);

      this.grupoComunhao.id = this.grupoEdicao.id
      this.grupoComunhao.endereco.id = this.grupoEdicao.endereco.id
      this.grupoComunhao.diaSemana = this.diaSemanaSelecionado.value;
      this.grupoComunhao.horario = this.datePipe.transform(this.edicaoGrupoForm.value.horario, 'HH:mm')
      if(this.grupoComunhao.participantes == null) {
        this.grupoComunhao.participantes = new Array(0)}
      
        console.log(this.grupoComunhao)
      
        this.grupoComunhaoService.cadastrarGrupoComunhao(this.grupoComunhao)
      .subscribe(
        () => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Grupo alterado com sucesso'});
          setTimeout(() => this.router.navigate(['adm/grupos-comunhao/lista']),3000);
          console.log("grupo alterado");
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, alterações não realizadas'});
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
    this.edicaoGrupoForm.patchValue({
      endereco: {
        logradouro: cepConsulta.logradouro,
        bairro: cepConsulta.bairro,
        cep: cepConsulta.cep,
        cidade: cepConsulta.localidade,
        estado: cepConsulta.uf
      }
    });
  }

  consultarGrupo(idGrupo: string){

    this.grupoComunhaoService.consultarGrupoComunhaoPorId(idGrupo)
    .subscribe( response => {
      this.grupoEdicao = response
      console.log(this.grupoEdicao)
      this.preencheFormularioInicial()
    })
  }

  criaFormulario(){
    this.edicaoGrupoForm = this.formBuilder.group({
      horario: ['', Validators.required],
      lider: [''],
      participantes: [''],
      maxParticipantes: ['', Validators.required],
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

  preencheFormularioInicial(){
    this.diaSemanaSelecionado = this.diasDaSemana.find(diaSemana => diaSemana.value === this.grupoEdicao.diaSemana)
    
    this.edicaoGrupoForm.patchValue({
      horario: this.getHorario(),
      lider: this.grupoEdicao?.lider,
      participantes: this.grupoEdicao?.participantes,
      maxParticipantes: this.grupoEdicao?.maxParticipantes,
      nome: this.grupoEdicao?.nome,
      endereco: {
        cep: this.grupoEdicao?.endereco?.cep,
        logradouro: this.grupoEdicao?.endereco?.logradouro,
        numero: this.grupoEdicao?.endereco?.numero,
        complemento: this.grupoEdicao?.endereco?.complemento,
        bairro: this.grupoEdicao?.endereco?.bairro,
        cidade: this.grupoEdicao?.endereco?.cidade,
        estado: this.grupoEdicao?.endereco?.estado
      }
    })
  }

  getHorario(){
    let time = this.grupoEdicao.horario.split(':');
    return new Date(1970,0,1, Number(time[0]), Number(time[1]), 0);
  }
}
