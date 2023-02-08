import { TestBed } from '@angular/core/testing';

import { ValidadorSesionGuard } from './validador-sesion.guard';

describe('ValidadorSesionGuard', () => {
  let guard: ValidadorSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidadorSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
