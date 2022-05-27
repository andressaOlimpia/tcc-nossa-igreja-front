import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroFamiliaComponent } from './cadastro-familia.component';

describe('CadastroFamiliaComponent', () => {
  let component: CadastroFamiliaComponent;
  let fixture: ComponentFixture<CadastroFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroFamiliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
