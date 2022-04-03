import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GrupoComunhaoModel } from 'src/app/models/grupo-comunhao.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { GruposComunhaoService } from 'src/app/services/grupos-comunhao.service';

@Component({
  selector: 'app-detalhes-grupo',
  templateUrl: './detalhes-grupo.component.html',
  styleUrls: ['./detalhes-grupo.component.scss']
})
export class DetalhesGrupoComponent implements OnInit {

  grupoComunhao: GrupoComunhaoModel;
  grupoId: string;
  participantes: UsuarioModel[];
  enderecoMap;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,

    private grupoComunhaoService: GruposComunhaoService
  ) {
    this.grupoComunhao = this.activatedRoute.snapshot.data['grupoComunhao'];
    console.log(this.grupoComunhao);
    this.participantes = this.grupoComunhao.participantes;
    this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/search?q=" + this.getEnderecoCompleto() + "&key=AIzaSyAcnvfV-BuB5UHTLwBHDRnH3frxF2YxeTM");
  }

  ngOnInit(): void {
/*
    this.activatedRoute.params.subscribe(params => {
      this.grupoId = params['id'];
      this.consultarGrupo(this.grupoId) 
    })
*/
  }
  
  public getEnderecoCompleto(): string {
    return this.grupoComunhao.endereco.logradouro + ", " + this.grupoComunhao.endereco.numero + " - " + this.grupoComunhao.endereco.bairro + ", " + this.grupoComunhao.endereco.cidade + " - " + this.grupoComunhao.endereco.estado;
  }

  consultarGrupo(idGrupo: string){

    this.grupoComunhaoService.consultarGrupoComunhaoPorId(idGrupo)
    .subscribe( response => {
      this.grupoComunhao = response;
      this.participantes = response.participantes
      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.getEnderecoCompleto() + "&key=AIzaSyAcnvfV-BuB5UHTLwBHDRnH3frxF2YxeTM");
      console.log(this.enderecoMap)
    })
  }

}
