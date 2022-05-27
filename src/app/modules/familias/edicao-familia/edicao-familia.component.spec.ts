import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoFamiliaComponent } from './edicao-familia.component';

describe('EdicaoFamiliaComponent', () => {
  let component: EdicaoFamiliaComponent;
  let fixture: ComponentFixture<EdicaoFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoFamiliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
