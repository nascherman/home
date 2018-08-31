import { TestBed, inject } from '@angular/core/testing';

import { Contact.ServiceService } from './contact.service.service';

describe('Contact.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Contact.ServiceService]
    });
  });

  it('should be created', inject([Contact.ServiceService], (service: Contact.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
