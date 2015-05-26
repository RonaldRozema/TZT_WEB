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

  calculateRoute(from_address_id, to_address_id, package_size, user_id) {
    return new HttpClient()
      .createRequest('api/planner/calculate_route?from_address=' + from_address_id + '&to_address=' + to_address_id +
                      '&package_size=' + package_size + '&user_id=' + user_id)
      .asPost()
      .withBaseUrl(this.settings.apiUrl)
      .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
      .send().then(data => {
        return data.content;
      });
  }

  get_shipment_by_id(shipment_id) {
    return new HttpClient()
    .createRequest('api/planner/get_shipment_by_id?shipment_id=' + shipment_id)
    .asGet()
    .withBaseUrl(this.settings.apiUrl)
    .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
    .send().then(data => {
      return data.content;
    });
  }

  get_shipments_for_user(user_id) {
    return new HttpClient()
    .createRequest('api/planner/get_shipments_for_user?user_id=' + user_id)
    .asGet()
    .withBaseUrl(this.settings.apiUrl)
    .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
    .send().then(data => {
      return data.content;
    });
  }

  update_shipment_to_cancel(shipment_id) {
    return new HttpClient()
    .createRequest('api/planner/update_shipment_to_cancel?shipment_id=' + shipment_id)
    .asPost()
    .withBaseUrl(this.settings.apiUrl)
    .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
    .send().then(data => {
      return data.content;
    });
  }

  update_shipment_to_payed(shipment_id) {
    return new HttpClient()
    .createRequest('api/planner/update_shipment_to_payed?shipment_id=' + shipment_id)
    .asPost()
    .withBaseUrl(this.settings.apiUrl)
    .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
    .send().then(data => {
      return data.content;
    });
  }

}
