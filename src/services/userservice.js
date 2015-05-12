import {AuthenticationService} from './authenticationservice';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';
import {inject} from 'aurelia-framework';

@inject(AuthenticationService, Settings)
export class UserService {
  constructor(authService, settings) {
    this.authService = authService;
    this.settings = settings;
  }

  getProfile() {
    return new HttpClient()
      .createRequest('api/user/me')
      .asGet()
      .withBaseUrl(this.settings.apiUrl)
      .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
      .send().then(data => {
        return data.content;
      });
  }


  saveProfile(profile) {
    return new HttpClient()
      .createRequest('api/user/me')
      .asPost()
      .withContent(profile)
      .withBaseUrl(this.settings.apiUrl)
      .withHeader('Authorization', 'Bearer ' + this.authService.getAccessToken())
      .withHeader('Content-Type', 'application/json')
      .send();
  }
}
