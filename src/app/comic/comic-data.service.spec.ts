import { TestBed } from '@angular/core/testing';

import { ComicDataService } from './comic-data.service';

describe('ComicDataService', () => {
  let service: ComicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
