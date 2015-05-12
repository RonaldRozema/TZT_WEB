import {inject} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';
import {AuthenticationService} from '../services/AuthenticationService';
import {UserService} from '../services/userservice';
import {Router} from 'aurelia-router';

@inject(AuthenticationService, UserService ,Validation, HttpClient, Settings, Router)
export class CreateClient {

  constructor(authService, userService, validation, http, settings, router) {

    this.contact = {};
    this.user = {};

    this.router = router;
    this.settings = settings;
    this.http = http;
    this.authService = authService;
    this.userService = userService;

    this.userService.getProfile().then(user => {
      this.user = user;
    });

    this.validation = validation.on(this)
    .ensure('contact.name')
    .isNotEmpty()
    .ensure('contact.first_name')
    .isNotEmpty()
    .ensure('contact.last_name')
    .isNotEmpty()
    .ensure('contact.phone_number')
    .isNotEmpty()
    .ensure('contact.email')
    .isNotEmpty()
    .isEmail()
    .ensure('contact.city')
    .isNotEmpty()
    .ensure('contact.street')
    .isNotEmpty()
    .ensure('contact.number')
    .isNotEmpty()
    .ensure('contact.zipcode_digits')
    .isNotEmpty()
    .ensure('contact.zipcode_ext')
    .isNotEmpty()

  }

  create() {

    this.error = "";
    this.info = "";

    this.validation.validate().then(() => {
      return this.http
        .configure(x => x.withHeader('Content-Type', 'application/json')
          .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken()))
        .post(this.settings.apiUrl + '/api/contact/create/' + this.user.id, this.contact)
        .then(response => {
          if(response.response == 200) {
            this.router.navigate('contact');
          }
        });
    });

  }
}
