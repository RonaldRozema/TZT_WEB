import {AuthenticationService} from './authenticationservice';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';
import {inject} from 'aurelia-framework';

@inject(AuthenticationService, Settings)
export class PackageService {

  constructor(authService, settings) {
    this.authService = authService;
    this.settings = settings;
  }

  getPackageTypes() {
    return new HttpClient()
      .createRequest('api/package/types')
      .asGet()
      .withBaseUrl(this.settings.apiUrl)
      .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
      .send().then(data => {
        return data.content;
      });
  }

  getShipmentByTrackingNumber(tracking_number) {
    return new HttpClient()
      .createRequest('api/package?tracking_number=' + tracking_number)
      .asGet()
      .withBaseUrl(this.settings.apiUrl)
      .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
      .send().then(data => {
        return data.content;
      });
  }

}
