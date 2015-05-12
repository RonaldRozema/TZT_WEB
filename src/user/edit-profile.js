import {inject} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';
import {AuthenticationService} from '../services/AuthenticationService';
import {UserService} from '../services/userservice'
import {Router} from 'aurelia-router';

@inject(AuthenticationService, Validation, HttpClient, Settings, Router, UserService)
export class EditProfile {

  url = 'http://localhost:8080/api/';

  constructor(authService, validation, http, settings, router, userService) {

    this.router = router;
    this.settings = settings;
    this.http = http;
    this.authService = authService;
    this.userService = userService;

    this.user = {};

    this.userService.getProfile().then(user => {
      this.user = user;
    });

    this.validation = validation.on(this)
      .ensure('user.email')
      .isNotEmpty()
      .isEmail()
      .ensure('user.first_name')
      .isNotEmpty()
      .ensure('user.last_name')
      .isNotEmpty();

  }

  edit() {

    this.error = "";
    this.info = "";

    this.validation.validate().then(() => {

      return this.http
        .configure(x =>
          x.withHeader('Content-Type', 'application/json')
            .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken()))
        .put(this.settings.apiUrl + '/api/user/edit/' + this.user.id, this.user)
        .then(response => {
          if (response.response == 200) {
            console.log(response);
            this.router.navigate('profile');
          }
        });

    })
    .catch((err) => {
      console.log(err);
    });

  }

}
