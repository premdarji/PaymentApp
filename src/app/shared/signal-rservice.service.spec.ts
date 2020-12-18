import { TestBed } from '@angular/core/testing';

import { SignalRserviceService } from './signal-rservice.service';

describe('SignalRserviceService', () => {
  let service: SignalRserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
