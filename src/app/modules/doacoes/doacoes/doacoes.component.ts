import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DoacaoModel } from 'src/app/models/doacao.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { DoacoesService } from 'src/app/services/doacoes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.component.html',
  styleUrls: ['./doacoes.component.scss']
})
export class DoacoesComponent implements OnInit {

  doacoes: DoacaoModel[];
  totalRecords: number;
  cols: any[];

  displayModal: boolean;
  quantidadeMaxima: number;
  itemSelecionado: DoacaoModel;
  doacaoForm: FormGroup;
  usuario: UsuarioModel;

  constructor(
    private doacoesService: DoacoesService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getDoacoes()
    this.criarFormularioDoacao()
    this.getDoador()
  }

  getDoacoes(){
    this.doacoesService.consultarDoacoesBasicInfo()
    .subscribe(response => {
      this.doacoes = response;
      console.log(this.doacoes)
      this.totalRecords = response.length;
     })
  }

  criarFormularioDoacao(){
    this.doacaoForm = this.formBuilder.group({
      quantidade: [null, Validators.required],
      dataEntrega: ["", Validators.required],
    }); 
  }

  showModal(doacao: DoacaoModel){
    this.doacaoForm.reset()
    Object.keys(this.doacaoForm.controls).forEach(key => {
      this.doacaoForm.controls[key].setErrors(null)
    });

    this.quantidadeMaxima = doacao.quantidade;
    this.itemSelecionado = doacao
    this.displayModal = true;
  }

  confirmarDoacao(){
    if (this.doacaoForm.dirty && this.doacaoForm.valid) {
      this.itemSelecionado.quantidadeReservada = this.doacaoForm.get('quantidade').value

      let dataEntrega = this.doacaoForm.get('dataEntrega').value
      console.log(dataEntrega)
      this.itemSelecionado.dataEntrega = dataEntrega.split("/").reverse().join('-')
      this.itemSelecionado.doador = this.usuario

      console.log(this.itemSelecionado)
      
      this.doacoesService.doar(this.itemSelecionado)
      .subscribe(
        (data) => {
          this.messageService.add({severity: 'success', summary: 'Eba!', detail: 'Doação foi registrada com sucesso'});
          this.getDoacoes()
          this.displayModal = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.messageService.add({severity: 'error', summary: 'Ops', detail: 'Algo deu errado, doação não reservada'});
        }
      );
    }
  }

  getDoador(){
    let idUsuario = this.authService.getIdUsuarioLogado();
    console.log(idUsuario)
    this.usuarioService.listarUsuarioPorId(idUsuario).subscribe(usuario =>this.usuario = usuario)
  }
}
