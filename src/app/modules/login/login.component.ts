import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {MessageService} from 'primeng/api';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginIncorreto: Boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.loginIncorreto = false;

    if(this.authService.estaAutenticado()){
      this.router.navigate(['meus-dados']);
    }

      this.loginForm = this.formBuilder.group({
          email: ["", [Validators.required, Validators.email]],
          senha: ["", Validators.required],
      }); 
  }

  fazerLogin(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get("email").value;
      const senha = this.loginForm.get("senha").value;

      this.authService.login(username.trim(), senha)
      .subscribe(
        () => {
          console.log("usuario logado");
          this.router.navigate(['meus-dados']);
          this.loginIncorreto = false;
        },
        (error: HttpErrorResponse) => {
          this.loginIncorreto = true;
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Login Inválido', detail: 'Verifique seu usuário e senha'});
        }
      );
    }
  }
}
