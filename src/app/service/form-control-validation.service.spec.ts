import { TestBed } from '@angular/core/testing';

import { FormControlValidationService } from './form-control-validation.service';

describe('FormControlValidationService', () => {
  let service: FormControlValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormControlValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
