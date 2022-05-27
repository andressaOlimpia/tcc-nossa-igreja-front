import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoacaoModel } from 'src/app/models/doacao.model';

@Component({
  selector: 'app-detalhes-doacao',
  templateUrl: './detalhes-doacao.component.html',
  styleUrls: ['./detalhes-doacao.component.scss']
})
export class DetalhesDoacaoComponent implements OnInit {

  doacao: DoacaoModel;
  doacaoId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.doacao = this.activatedRoute.snapshot.data['doacao'];
    console.log(this.doacao)
  }

}
