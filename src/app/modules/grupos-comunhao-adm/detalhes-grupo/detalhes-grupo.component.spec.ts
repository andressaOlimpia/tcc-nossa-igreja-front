import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesGrupoComponent } from './detalhes-grupo.component';

describe('DetalhesGrupoComponent', () => {
  let component: DetalhesGrupoComponent;
  let fixture: ComponentFixture<DetalhesGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
