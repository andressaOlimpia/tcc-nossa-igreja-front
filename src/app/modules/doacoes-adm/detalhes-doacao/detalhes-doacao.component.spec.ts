import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDoacaoComponent } from './detalhes-doacao.component';

describe('DetalhesDoacaoComponent', () => {
  let component: DetalhesDoacaoComponent;
  let fixture: ComponentFixture<DetalhesDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesDoacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
