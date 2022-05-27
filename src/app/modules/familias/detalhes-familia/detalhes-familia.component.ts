import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamiliaModel } from 'src/app/models/familia.model';
import { FamiliaService } from 'src/app/services/familia.service';

@Component({
  selector: 'app-detalhes-familia',
  templateUrl: './detalhes-familia.component.html',
  styleUrls: ['./detalhes-familia.component.scss']
})
export class DetalhesFamiliaComponent implements OnInit {

  familia: FamiliaModel;
  familiaId: string;

  constructor(
    private activatedRoute: ActivatedRoute,

    private familiaService: FamiliaService
  ) {
    this.familia = this.activatedRoute.snapshot.data['familia'];
    console.log(this.familia)
   }

  ngOnInit(): void {
  }

}
