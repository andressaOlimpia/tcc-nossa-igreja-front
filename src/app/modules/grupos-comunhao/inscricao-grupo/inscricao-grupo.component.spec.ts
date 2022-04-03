import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscricaoGrupoComponent } from './inscricao-grupo.component';

describe('InscricaoGrupoComponent', () => {
  let component: InscricaoGrupoComponent;
  let fixture: ComponentFixture<InscricaoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscricaoGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscricaoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
