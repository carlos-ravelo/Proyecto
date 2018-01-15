import { TestBed, inject } from '@angular/core/testing';

import { CanActivateviaAuthGuardService } from './can-activatevia-auth-guard.service';

describe('CanActivateviaAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateviaAuthGuardService]
    });
  });

  it('should be created', inject([CanActivateviaAuthGuardService], (service: CanActivateviaAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
