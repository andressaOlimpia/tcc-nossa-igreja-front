import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoDoacaoComponent } from './edicao-doacao.component';

describe('EdicaoDoacaoComponent', () => {
  let component: EdicaoDoacaoComponent;
  let fixture: ComponentFixture<EdicaoDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoDoacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
