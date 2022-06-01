import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EscalaGrupoComunhaoModel } from 'src/app/models/escala-grupo-comunhao.model';
import { GrupoComunhaoModel } from 'src/app/models/grupo-comunhao.model';
import { GrupoTabelaModel } from 'src/app/models/grupo-tabela.model';
import { UsuarioInscricaoGrupoModel } from 'src/app/models/usuario-inscricao-grupo.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { EscalaGrupoComunhaoService } from 'src/app/services/escala-grupo-comunhao.service';
import { GruposComunhaoService } from 'src/app/services/grupos-comunhao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.scss']
})
export class MeusDadosComponent implements OnInit {

  usuario: UsuarioModel;
  displayModal: boolean;
  edicaoUsuarioForm: FormGroup;
  usuarioEditado: UsuarioModel;

  grupos: GrupoComunhaoModel[];
  gruposTabela: GrupoTabelaModel[] = new Array;
  escalas: EscalaGrupoComunhaoModel[];
  escalaSelecionada: EscalaGrupoComunhaoModel;
  edicaoItemDoacaoForm: FormGroup;
  totalRecords: number;
  inscricaoGrupo: boolean;

  displayModalInclusaoEscala: boolean;
  escalaForm: FormGroup;
  escalaParaIncluir: EscalaGrupoComunhaoModel;

  grupoSelecionado: GrupoTabelaModel;
  participantesGrupoSelecionado: UsuarioModel[];

  displayModalEdicaoEscala: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    private gruposComunhaoService: GruposComunhaoService,
    private escalaGrupoComunhaoService: EscalaGrupoComunhaoService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    let idUsuario = this.authService.getIdUsuarioLogado();
    this.usuarioService.listarUsuarioPorId(idUsuario).subscribe((usuario => this.usuario = usuario))
    this.criaFormulario()
    this.criaEscalaFormulario()

    this.gruposComunhaoService.consultarGruposComunhaoPorParticipante(idUsuario).subscribe(grupos => {
      console.log(grupos)
      this.grupos = grupos
      this.grupos.length == 0 ? this.inscricaoGrupo = false : this.criarGruposTabela(this.grupos)
    })
  }

  criarGruposTabela(grupos: GrupoComunhaoModel[]){
    this.inscricaoGrupo = true;
    console.log(grupos)
    grupos.forEach(grupo => {
      console.log(grupo)
      console.log("montando grupoTabela")
      let grupoTabela: GrupoTabelaModel = {
        grupo: grupo,
        escalas: new Array
      }
      console.log(grupoTabela)

      this.escalaGrupoComunhaoService.consultarEscalaGruposComunhao(grupo.id)
      .subscribe((escalas) => {
        console.log(escalas)
        grupoTabela.escalas = escalas
        this.gruposTabela.push(grupoTabela)
        this.gruposTabela = this.gruposTabela.sort((a,b)=> a.grupo.id - b.grupo.id)
      })
    })
    console.log(this.gruposTabela)
  }

  showModalEdicao() {
    this.displayModal = true;

    this.edicaoUsuarioForm.patchValue({
      firstName: this.usuario.firstName,
      lastName: this.usuario.lastName,
      email: this.usuario.email,
      birthDate: this.datePipe.transform(this.usuario.birthDate, 'dd/MM/yyyy'),
      phoneNumber:this.usuario.phoneNumber
    })
  }

  editarUsuario(){
    this.usuarioEditado = Object.assign({}, this.usuario, this.edicaoUsuarioForm.value);
    let dataNascimento = this.usuarioEditado.birthDate.split("/").reverse().join('-')
    this.usuarioEditado.birthDate = dataNascimento
    this.usuarioEditado.id = this.usuario.id
    console.log(this.usuario)

    this.usuarioService.editarUsuario(this.usuarioEditado)
    .subscribe(
      (data: UsuarioModel) => {
        this.usuario = data;
        this.displayModal = false;
        this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Dados alterados com sucesso'});
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, alterações não realizadas'});
      });
  }

  criaFormulario(){
    this.edicaoUsuarioForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      birthDate: ["", Validators.required],
      phoneNumber: "",
    }); 
  }

  criaEscalaFormulario(){
    this.escalaForm = this.formBuilder.group({
      data: ["", Validators.required],
      dinamica: null,
      louvor: null,
      palavra: null,
      lanche: null,
    }); 
  }

  filterParticipantes(event) {
    let filtered : UsuarioModel[] = [];
    let query = event.query;

    this.grupoSelecionado.grupo.participantes.forEach(participante => {
      if (participante.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(participante);
    }
    })
    console.log(filtered)
    this.participantesGrupoSelecionado = filtered;
}

  showModalInclusaoEscala(grupoTabela){
    this.grupoSelecionado = grupoTabela;
    this.participantesGrupoSelecionado = grupoTabela.grupo.participantes
    this.displayModalInclusaoEscala = true;

    this.escalaForm.reset()
    Object.keys(this.escalaForm.controls).forEach(key => {
      this.escalaForm.controls[key].setErrors(null)
    });

  }

  incluirEscala(){
    if (this.escalaForm.dirty && this.escalaForm.valid) {
      this.escalaParaIncluir = Object.assign({}, this.escalaParaIncluir, this.escalaForm.value);

      this.escalaParaIncluir.grupoComunhao = JSON.parse(JSON.stringify(this.grupoSelecionado.grupo));
      this.escalaParaIncluir.grupoComunhao.horario =null
      this.escalaParaIncluir.data = this.escalaParaIncluir.data.split("/").reverse().join('-')

      this.substituiSelectVazioPorNull(this.escalaParaIncluir)

      console.log(this.escalaParaIncluir)
      
      this.escalaGrupoComunhaoService.cadastrarOuEditarEscalaGrupoComunhao(this.escalaParaIncluir)
      .subscribe(
        (data) => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Escala cadastrado com sucesso'});
          this.displayModalInclusaoEscala = false;

          this.gruposComunhaoService.consultarGruposComunhaoPorParticipante(this.usuario.id.toString()).subscribe(grupos => {
            this.grupos = grupos
            this.gruposTabela = [];
            this.grupos.length == 0 ? this.inscricaoGrupo = false : this.criarGruposTabela(this.grupos)
          })
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, escala não cadastrado'});
        }
      );
    }
  }

  showModalEdicaoEscala(grupoTabela, escala){
    this.grupoSelecionado = grupoTabela;
    this.displayModalEdicaoEscala = true;
    this.escalaSelecionada = escala

    this.escalaForm.patchValue({
      data: this.datePipe.transform(this.escalaSelecionada.data, 'dd/MM/yyyy'),
      dinamica: this.escalaSelecionada.dinamica,
      louvor: this.escalaSelecionada.louvor,
      palavra: this.escalaSelecionada.palavra,
      lanche: this.escalaSelecionada.lanche,
    })
  }

  editarEscala(){
    if (this.escalaForm.dirty && this.escalaForm.valid) {
      this.escalaSelecionada = Object.assign({}, this.escalaSelecionada, this.escalaForm.value);
      this.escalaSelecionada.data = this.escalaSelecionada.data.split("/").reverse().join('-')

      this.substituiSelectVazioPorNull(this.escalaSelecionada)
      console.log(this.escalaSelecionada)
      
      this.escalaGrupoComunhaoService.cadastrarOuEditarEscalaGrupoComunhao(this.escalaSelecionada)
      .subscribe(
        (data) => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Escala alterada com sucesso'});
          this.displayModalInclusaoEscala = false;

          this.gruposComunhaoService.consultarGruposComunhaoPorParticipante(this.usuario.id.toString()).subscribe(grupos => {
            this.grupos = grupos
            this.gruposTabela = [];
            this.grupos.length == 0 ? this.inscricaoGrupo = false : this.criarGruposTabela(this.grupos)
          })
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, escala não alterada'});
        }
      );
    }

  }

  excluirEscala(escala){
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir essa escala?`,
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.escalaGrupoComunhaoService.excluirEscalaGrupoComunhao(escala.id).subscribe(
          () => {
            this.messageService.add({severity:'success', summary:'Sucesso', detail:'Escala excluída'});
            this.gruposComunhaoService.consultarGruposComunhaoPorParticipante(this.usuario.id.toString()).subscribe(grupos => {
              this.grupos = grupos
              this.gruposTabela = [];
              this.grupos.length == 0 ? this.inscricaoGrupo = false : this.criarGruposTabela(this.grupos)
            })
          }
        )
      }
  });
  }

  substituiSelectVazioPorNull(escala){
    if(this.escalaForm.get("dinamica").value == ""){
      escala.dinamica = null
    }

    if(this.escalaForm.get("louvor").value == ""){
      escala.louvor = null
    }

    if(this.escalaForm.get("palavra").value == ""){
      escala.palavra = null
    }

    if(this.escalaForm.get("lanche").value == ""){
      escala.lanche = null
    }
  }

  cancelarInscricao(grupo){
      this.confirmationService.confirm({
        message: `Você tem certeza que deseja sair desse grupo?`,
        header: 'Atenção',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          let usuarioExclusao: UsuarioInscricaoGrupoModel = {id:this.usuario.id};
          this.gruposComunhaoService.excluirParticipante(grupo.id, usuarioExclusao).subscribe(
            () => {
              this.messageService.add({severity:'success', summary:'Sucesso', detail:'Escala excluída'});
              this.gruposTabela = this.gruposTabela.filter(grupoTabela => grupoTabela.grupo.id !== grupo.id)
            }
          )
        }
    });
  }
}
