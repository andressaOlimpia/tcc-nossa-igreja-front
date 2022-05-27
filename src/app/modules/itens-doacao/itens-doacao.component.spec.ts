import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensDoacaoComponent } from './itens-doacao.component';

describe('ItensDoacaoComponent', () => {
  let component: ItensDoacaoComponent;
  let fixture: ComponentFixture<ItensDoacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensDoacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensDoacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
