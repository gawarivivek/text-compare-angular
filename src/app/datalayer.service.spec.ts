import { TestBed } from '@angular/core/testing';

import { DatalayerService } from './datalayer.service';

describe('DatalayerService', () => {
  let service: DatalayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatalayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
