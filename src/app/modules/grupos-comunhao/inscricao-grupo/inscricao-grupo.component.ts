import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GrupoComunhaoModel } from 'src/app/models/grupo-comunhao.model';
import { UsuarioInscricaoGrupoModel } from 'src/app/models/usuario-inscricao-grupo.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { GruposComunhaoService } from 'src/app/services/grupos-comunhao.service';

@Component({
  selector: 'app-inscricao-grupo',
  templateUrl: './inscricao-grupo.component.html',
  styleUrls: ['./inscricao-grupo.component.scss']
})
export class InscricaoGrupoComponent {

  grupoComunhao: GrupoComunhaoModel;
  grupoId: number;
  participantes: UsuarioModel[];
  enderecoMap;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private grupoComunhaoService: GruposComunhaoService
  ) { 
    this.grupoComunhao = this.activatedRoute.snapshot.data['grupoComunhao'];
    console.log(this.grupoComunhao);
    this.participantes = this.grupoComunhao.participantes;
    this.grupoId = this.grupoComunhao.id
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/search?q=" + this.getEnderecoCompleto() + "&key=AIzaSyAcnvfV-BuB5UHTLwBHDRnH3frxF2YxeTM");
  }

  public getEnderecoCompleto(): string {
    return this.grupoComunhao.endereco.logradouro + ", " + this.grupoComunhao.endereco.numero + " - " + this.grupoComunhao.endereco.bairro + ", " + this.grupoComunhao.endereco.cidade + " - " + this.grupoComunhao.endereco.estado;
  }

  fazerInscricaoNoGrupo(){
    this.verificaSeGrupoLotado()? this.getMensagemAviso() : this.concluirInscricao()
  }

  verificaSeGrupoLotado():boolean {
    return this.grupoComunhao?.maxParticipantes <= this.grupoComunhao?.participantes?.length
  }

  getMensagemAviso(){
    this.messageService.add({severity:'warn', summary:'Grupo lotado', detail:'Entre em contato com a liderança'});
  }

  concluirInscricao(){
    this.confirmationService.confirm({
      message: 'Deseja confirmar inscrição para esse grupo?',
      header: 'Confirmação de inscrição',
      icon: 'pi pi-info-circle',
      accept: () => {
        let usuarioInscricao: UsuarioInscricaoGrupoModel = {id:Number(localStorage.getItem('idUsuario'))};
        
        this.grupoComunhaoService.incluirParticipante(this.grupoId, usuarioInscricao)
        .subscribe((grupoAtualizado) => {
          this.participantes = grupoAtualizado.participantes;
          this.messageService.add({severity:'success', summary:'Eba!', detail:'Inscrição feita com sucesso'});
        })
      }
    });
  }
}
