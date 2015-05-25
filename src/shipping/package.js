import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {PackageService} from '../services/packageService';
import {UserService} from '../services/userservice';
import {ContactService} from '../services/contactService';
import {RouteService} from '../services/routeService';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, PackageService, UserService, ContactService, RouteService, EventAggregator)
export class Package {

  constructor(http, ps, us, cs, rs, ea) {
    this.http = http;
    this.packageService = ps;
    this.userService = us;
    this.contactService = cs;
    this.routeService = rs;
    this.ea = ea;

    this.user = {};
    this.package = {};
    this.contacts = {};
    this.addresses = [];

    this.package_types = [];
    this.packageService.getPackageTypes().then(types => {
      this.package_types = types;
    });

    this.userService.getProfile().then(profile => {
      this.user = profile;
      this.contactService.getMyContacts(profile.id).then(contacts => {
        this.contacts = contacts;
        this.contactService.getSingleContact(contacts[0].id).then(contact => {
          this.addresses = contact.Addresses;
        });
      });
    });
  }

  ChangeContact() {
    this.contactService.getSingleContact(this.package.receiver_id).then(contact => {
        this.addresses = contact.Addresses;
    });
  }

  CalculateRoute() {
    this.routeService.calculateRoute(this.package.sender_id ,this.package.receiver_address_id, this.package.size)
      .then(route => {
        console.log(route);
      });
  }

}
