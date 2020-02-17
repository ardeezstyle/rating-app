import { TestBed } from '@angular/core/testing';

import { AuthDataResolverService } from './auth-data-resolver.service';

describe('AuthDataResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthDataResolverService = TestBed.get(AuthDataResolverService);
    expect(service).toBeTruthy();
  });
});
