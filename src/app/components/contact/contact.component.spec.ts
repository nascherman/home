import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {Contact, ContactComponent} from './contact.component';
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HttpClientModule} from "@angular/common/http";
import {PhonePipe} from "../../pipes/phone.pipe";
import {ContactService} from "../../services/contact.service";
import {Observable} from "rxjs/index";

let contactServiceSpy, phonePipeSpy;

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    const contactSpy = jasmine.createSpyObj(
      'ContactService',
      ['sendForm']
    );
    const phoneSpy = jasmine.createSpyObj(
      'PhonePipe',
      ['transform']
    );

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule
      ],
      declarations: [
        ContactComponent,
        PhonePipe
      ],
      providers: [
        { provide: PhonePipe, useValue: phoneSpy },
        { provide: ContactService, useValue: contactSpy }
      ]
    })
    .compileComponents();

    contactServiceSpy = TestBed.get(ContactService);
    phonePipeSpy = TestBed.get(PhonePipe);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Init functions', () => {
    it('Should initialize a new model on create', async(() => {
      expect(component.model).toEqual(new Contact('', '', '', ''));
    }));
  });

  describe('model changes', () => {
    it('Should call phone pipe transform on value change', async(() => {
      phonePipeSpy.transform.and.callThrough();

      component.onPhoneChange();
      expect(phonePipeSpy.transform).toHaveBeenCalledTimes(1);
    }));

    it('Should call sendform on contact service with model on submit', async(() => {
      contactServiceSpy.sendForm.and.returnValue(
        new Observable()
      );

      component.onSubmit();
      expect(contactServiceSpy.sendForm).toHaveBeenCalledWith(component.model, component.errorHandler);
    }));

    it('Should update form errors on submit error', async(() => {
      const errorMessages = ['Hey', 'this is an error test'];

      component.errorHandler(errorMessages);

      expect(component.formErrors).toEqual(errorMessages);
    }));
  });
});
