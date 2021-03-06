import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDoacaoComponent } from './cadastro-doacao.component';

describe('CadastroDoacaoComponent', () => {
  let component: CadastroDoacaoComponent;
  let fixture: ComponentFixture<CadastroDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDoacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
