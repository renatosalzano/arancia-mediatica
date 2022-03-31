import { TestBed } from '@angular/core/testing';

import { Oauth2Guard } from './oauth2.guard';

describe('Oauth2Guard', () => {
  let guard: Oauth2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Oauth2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
