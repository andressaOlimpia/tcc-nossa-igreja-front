import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoGrupoComponent } from './edicao-grupo.component';

describe('EdicaoGrupoComponent', () => {
  let component: EdicaoGrupoComponent;
  let fixture: ComponentFixture<EdicaoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
