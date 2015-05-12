import {inject} from 'aurelia-framework';
import {AuthenticationService} from '../services/AuthenticationService'
import {Validation} from 'aurelia-validation';
import {Router} from 'aurelia-router';

@inject(AuthenticationService, Validation, Router)
export class Login {
  heading = "Inloggen";
  loading = false;
  error = "";
  info = "";

  email = "";
  password = "";

  constructor(authService, validation, router) {
    this.router = router;
    this.authService = authService;
    this.validation =
      validation.on(this)
        .ensure('email')
        .isNotEmpty()
        .isEmail()
        .ensure('password')
        .isNotEmpty();
  }

  activate(params, queryParams, config) {
    if(typeof(queryParams.message) != 'undefined') {
      this.info = queryParams.message;
    }
  }



  login() {
    this.loading = true;
    this.error = "";
    this.info = "";

    this.validation.validate().then(() => {
      this.authService.login(this.email, this.password)
        .then(() => {
          this.router.navigate('welcome');
        })
        .catch((response) => {
          if(response.content.error_description == "Invalid resource owner credentials") {
            this.error = 'WrongEmailPassword';
          }
          else {
            this.error = "GenericLoginError";
          }

          this.loading = false;
        });


    }).catch(() => {
      this.loading = false;
    });
  }
}
