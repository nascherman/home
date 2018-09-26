import { TestBed, inject } from '@angular/core/testing';

import { ContactService } from './contact.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('Contact.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactService,
        HttpClient,
        HttpHandler
      ]
    });
  });

  it('should be created', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
