import { TestBed } from '@angular/core/testing';

import { CheckViewportSizeService } from './check-viewport-size.service';

describe('CheckViewportSizeService', () => {
  let service: CheckViewportSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckViewportSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
