import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: UsuarioModel;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private messageService: MessageService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      birthDate: ["", Validators.required],
      phoneNumber: "",
      password: ["", Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }); 
  }

  cadastrarUsuario(){
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      let dataNascimento = this.usuario.birthDate.split("/").reverse().join('-')
      this.usuario.birthDate = dataNascimento
      console.log(this.usuario)
      this.usuarioService.cadastrarUsuario(this.usuario)
      .subscribe(
        (data: UsuarioModel) => this.fazerLogin(data));
    }
  }

  fazerLogin(usuario: UsuarioModel): void {
      const username = usuario.email;
      const senha = this.cadastroForm.get("password").value;

      this.authService.login(username.trim(), senha)
      .subscribe(
        () => {
          console.log("usuario logado");
          this.router.navigate(['meus-dados']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'algo deu errado'});
        }
      );
  }
}
