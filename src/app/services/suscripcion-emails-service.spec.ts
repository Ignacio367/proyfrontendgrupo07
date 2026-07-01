import { TestBed } from '@angular/core/testing';

import { SuscripcionEmailsService } from './suscripcion-emails-service';

describe('SuscripcionEmailsService', () => {
  let service: SuscripcionEmailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuscripcionEmailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
