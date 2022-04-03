import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    let idUsuario = this.authService.getIdUsuarioLogado();
    this.usuarioService.listarUsuarioPorId(idUsuario).subscribe((usuario => this.usuario = usuario))
    this.criaFormulario()
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

}
