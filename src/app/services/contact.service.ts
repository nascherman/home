import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from 'rxjs/operators';

import { Contact } from "../components/contact/contact.component";

// const tempUrl = 'https://mailp-212721.appspot.com/v1/contact';
const tempUrl = 'http://localhost:8080/v1/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  sendForm(model: Contact, errorHandler) {
    return this.http.post<Contact>(
      tempUrl,
      model
    )
      .pipe(catchError(e => {
        errorHandler(this.handleFormErrorResponse(e));

        return new Promise((resolve, reject) => reject(e));
      }));
  }

  handleFormErrorResponse(errorResponse: any) {
    // error property of the error
    const { error } = errorResponse;

    if (error) {
      return error.split(',');
    } else if (errorResponse.status === 500) {
      return ['The system is down. Try again later.'];
    } else {
      return ['Something went wrong. Try again later'];
    }
  }

  constructor(private http: HttpClient) { }
}
