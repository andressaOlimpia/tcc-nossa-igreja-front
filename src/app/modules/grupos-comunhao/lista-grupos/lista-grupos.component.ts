import { Component, OnInit } from '@angular/core';
import { GrupoComunhaoModel } from 'src/app/models/grupo-comunhao.model';
import { GruposComunhaoService } from 'src/app/services/grupos-comunhao.service';

@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.scss']
})
export class ListaGruposComponent implements OnInit {

  grupos: GrupoComunhaoModel[];
  totalRecords: number;

  constructor(private grupoComunhaoService: GruposComunhaoService) { }

  ngOnInit(): void {

    this.grupoComunhaoService.consultarGruposComunhao()
    .subscribe(response => {
      this.grupos = response;
      console.log(this.grupos)
      this.totalRecords = response.length;
     })
  }

  verificaSeGrupoLotado(grupo: GrupoComunhaoModel):boolean {
    return grupo.maxParticipantes <= grupo.participantes.length
  }

}
