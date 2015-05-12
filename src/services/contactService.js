import {AuthenticationService} from './authenticationservice';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';
import {inject} from 'aurelia-framework';

@inject(AuthenticationService, Settings)
export class ContactService {

  constructor(authService, settings) {
    this.authService = authService;
    this.settings = settings;
  }

  getMyContacts(user_id) {
    return new HttpClient()
      .createRequest('api/contacts/' + user_id)
      .asGet()
      .withBaseUrl(this.settings.apiUrl)
      .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
      .send().then(data => {
        return data.content;
      });
  }

  getSingleContact(contact_id) {
    return new HttpClient()
      .createRequest('api/contact/' + contact_id)
      .asGet()
      .withBaseUrl(this.settings.apiUrl)
      .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
      .send().then(data => {
        return data.content;
      });
  }

}
