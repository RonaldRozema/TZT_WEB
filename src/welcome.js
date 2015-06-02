import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthenticationService} from 'services/AuthenticationService';
import {PackageService} from 'services/packageService';

@inject(Router, AuthenticationService, PackageService)
export class Welcome{
  heading = 'Public Blended Shipping!';

  tracking_number;

  constructor(router, authservice, ps) {
    this.router = router;
    this.authService = authservice;
    this.ps = ps;

    if (this.authService.isAuthenticated()) {
      this.url = '#/package';
    } else {
      this.url = '#/login';
    }
  }

  track() {
    if (tracking_number.value != "") {
      this.router.navigate('package/' + tracking_number.value);
    }
  }

}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
