import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthenticationService} from '../services/AuthenticationService';

@inject(Router, AuthenticationService)
export class Welcome{
  heading = 'Public Blended Shipping!';

  constructor(router, authservice) {
    this.router = router;
    this.authService = authservice;

    if (this.authService.isAuthenticated()) {
      this.url = '#/package';
    } else {
      this.url = '#/login';
    }
  }

}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
