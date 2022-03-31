import { TestBed } from '@angular/core/testing';

import { GruposComunhaoService } from './grupos-comunhao.service';

describe('GruposComunhaoService', () => {
  let service: GruposComunhaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposComunhaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
