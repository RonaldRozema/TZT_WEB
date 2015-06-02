import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Settings} from '../settings';



@inject(HttpClient, Settings)
export class AuthenticationService {
  constructor(httpClient, settings) {
    this.httpClient = httpClient;
    this.settings = settings;
  }




  login(username, password) {
    var data = 'grant_type=password&username=' + username +
      '&password=' + password +
      '&client_id=tzt&client_secret=tzt';

    return this.httpClient
      .configure(x => x.withHeader('Content-Type', 'application/x-www-form-urlencoded'))
      .post(this.settings.apiUrl + '/token', data)
      .then(response => {
        this.setAccessToken(response.content.access_token);
        this.setExpirationDate(response.content.expires_in);

        return response;
      });
  }


  logout() {
    this.setAccessToken(null);
    this.setExpirationDate(null);
  }



  getAccessToken() {
    return window.sessionStorage['access_token'];
  }

  setAccessToken(token) {
    if(token == null) {
      window.sessionStorage.removeItem('access_token');
    }
    else {
      window.sessionStorage['access_token'] = token;
    }
  }


  getExpirationDate() {
    var token = window.sessionStorage['expiration_date'];

    if (typeof(token) !== 'undefined' && token != null) {
      return token;
    }

    return null;
  }



  setExpirationDate(expirationDate) {
    if(expirationDate == null) {
      window.sessionStorage.removeItem('expiration_date');
    }
    else {
      window.sessionStorage['expiration_date'] = expirationDate;
    }
  }



  isAuthenticated(){
    if(typeof(this.getAccessToken()) == 'undefined' || this.getAccessToken() == null)
    {
      return false;
    }

    return true;
  }
}
