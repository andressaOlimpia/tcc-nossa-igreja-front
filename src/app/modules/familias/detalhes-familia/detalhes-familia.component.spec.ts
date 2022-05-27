import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesFamiliaComponent } from './detalhes-familia.component';

describe('DetalhesFamiliaComponent', () => {
  let component: DetalhesFamiliaComponent;
  let fixture: ComponentFixture<DetalhesFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesFamiliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
