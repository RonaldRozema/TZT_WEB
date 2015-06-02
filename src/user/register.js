import {inject} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';
import {AuthenticationService} from '../services/AuthenticationService';
import {Router} from 'aurelia-router';

@inject(AuthenticationService, Validation, HttpClient, Settings, Router)
export class Register {

  heading = "Maak uw gratis account aan";

  url = 'http://localhost:8080/api/';

  get canSave() {
    if(!this.validation.result.isValid) {
      return false;
    }

    return true;
  }

  constructor(authService, validation, http, settings, router) {

    this.user = {};

    this.router = router;
    this.settings = settings;
    this.http = http;
    this.authservice = authService;

    this.validation = validation.on(this)
    .ensure('user.email')
    .isNotEmpty()
    .isEmail()
    .ensure('user.first_name')
    .isNotEmpty()
    .ensure('user.last_name')
    .isNotEmpty()
    .ensure('user.city')
    .isNotEmpty()
    .ensure('user.street')
    .isNotEmpty()
    .ensure('user.number')
    .isNotEmpty()
    .ensure('user.zipcode')
    .isNotEmpty()
    .ensure('user.password')
    .isNotEmpty()

  }

  register() {

    this.error = "";
    this.info = "";

    this.validation.validate().then(() => {

      return this.http
        .configure(x => x.withHeader('Content-Type', 'application/json'))
        .post(this.settings.apiUrl + '/api/user/register', this.user)
        .then(response => {
          if (response.response == 200) {
            this.authservice.login(this.user.email, this.user.password)
            .then(() => {
                console.log(window.sessionStorage['access_token']);
                this.router.navigate('welcome');
              });
          }
        })
        .catch((response) => {
          if(response.content.error_description == "Invalid resource owner credentials") {
            this.error = 'WrongEmailPassword';
          }
          else {
            this.error = "GenericLoginError";
          }
        });

    });

  }

}
