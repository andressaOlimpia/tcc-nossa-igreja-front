import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDoacoesComponent } from './lista-doacoes.component';

describe('ListaDoacoesComponent', () => {
  let component: ListaDoacoesComponent;
  let fixture: ComponentFixture<ListaDoacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDoacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDoacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
