import { Component, OnInit } from '@angular/core';
import {ParsedNumber} from "libphonenumber-js";

import { ContactService } from "./contact.service";
import { PhonePipe } from "../../pipes/phone.pipe";
import ContactConfig from './contact-config';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model = new Contact('', '', '', '');
  formErrors: Array<string> = [];

  contactItems = ContactConfig.contactItems;

  constructor(
    private contactService: ContactService,
    private phonePipe: PhonePipe
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('SUBMIT', this.model);
    this.contactService
      .sendForm(this.model)
      .subscribe();
  }

  onPhoneChange($event) {
    this.model.phone = this.phonePipe.transform(this.model.phone);
  }

}

export class Contact {
  name: string;
  email: string;
  phone: string;
  content: string;

  constructor(
    name: string,
    email: string,
    phone: string,
    content: string
  ) {}
}
