import { TestBed } from '@angular/core/testing';

import { ApiGwService } from './api-gw.service';

describe('ApiGwService', () => {
  let service: ApiGwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
