import { TestBed } from '@angular/core/testing';

import { ProcessHTTPMsgService } from './process-httpmsg-service.service';

describe('ProcessHTTPMsgServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHTTPMsgService = TestBed.get(ProcessHTTPMsgService);
    expect(service).toBeTruthy();
  });
});
