import { TestBed } from '@angular/core/testing';

import { CategoriaDoacaoService } from './categoria-doacao.service';

describe('CategoriaDoacaoService', () => {
  let service: CategoriaDoacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaDoacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
