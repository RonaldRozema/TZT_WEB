import {inject} from 'aurelia-framework';
import {AuthenticationService} from '../services/AuthenticationService';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-http-client';
import {UserService} from '../services/userservice';
import {Settings} from '../settings'

@inject(AuthenticationService, Router, HttpClient, UserService, Settings)
export class Profile {

  constructor(authService, router, http, userService, settings) {
    this.authService = authService;
    this.router = router;
    this.http = http;
    this.userService = userService;
    this.settings = settings;

    this.user = {};

    this.userService.getProfile().then(user => {
      console.log(user);
      this.user = user;
    });

  }
}
