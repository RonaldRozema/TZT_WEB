import {AuthenticationService} from './authenticationservice';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';
import {inject} from 'aurelia-framework';

@inject(AuthenticationService, Settings)
export class RouteService {

  constructor(authService, settings) {
    this.authService = authService;
    this.settings = settings;
  }

  calculateRoute(from_address_id, to_address_id, package_size) {
    console.log('inside calculate route');
    return new HttpClient()
      .createRequest('api/planner/calculate_route?from_address=' + from_address_id + '&to_address=' + to_address_id +
                    '&package_size=' + package_size)
      .asGet()
      .withBaseUrl(this.settings.apiUrl)
      .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
      .send().then(data => {
        return data.content;
      });
  }

}
