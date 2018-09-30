import {Component, OnInit} from '@angular/core';
import {ParsedNumber} from "libphonenumber-js";

import {ContactService} from "../../services/contact.service";
import {PhonePipe} from "../../pipes/phone.pipe";
import ContactConfig from './contact-config';

import {faMinusCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  model = new Contact('', '', '', '');
  formErrors: Array<string> = [];
  contactItems = ContactConfig.contactItems;

  faMinusCircle = faMinusCircle;

  constructor(private contactService: ContactService,
              private phonePipe: PhonePipe) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.contactService
      .sendForm(this.model, this.errorHandler)
      .subscribe();
  }

  errorHandler(messages: Array<string>) {
    if (messages) {
      this.formErrors = messages;
    }
  }

  onPhoneChange() {
    this.model.phone = this.phonePipe.transform(this.model.phone);
  }

}

export class Contact {
  name: string;
  email: string;
  phone: string;
  content: string;

  constructor(name: string,
              email: string,
              phone: string,
              content: string) {
  }
}
