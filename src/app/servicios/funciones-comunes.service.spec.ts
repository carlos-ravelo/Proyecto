import { TestBed, inject } from '@angular/core/testing';

import { FuncionesComunesService } from './funciones-comunes.service';

describe('FuncionesComunesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FuncionesComunesService]
    });
  });

  it('should be created', inject([FuncionesComunesService], (service: FuncionesComunesService) => {
    expect(service).toBeTruthy();
  }));
});
