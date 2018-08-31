import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Contact } from "./contact.component";

// const tempUrl = 'https://mailp-212721.appspot.com/v1/contact';
const tempUrl = 'http://localhost:8080/v1/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  sendForm(model: Contact) {
    return this.http.post<Contact>(
      tempUrl,
      model
    );
  }

  constructor(private http: HttpClient) { }
}
