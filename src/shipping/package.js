import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {PackageService} from '../services/packageService';
import {UserService} from '../services/userservice';
import {ContactService} from '../services/contactService';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, PackageService, UserService, ContactService, EventAggregator)
export class Package {

  constructor(http, ps, us, cs, ea) {
    this.http = http;
    this.packageService = ps;
    this.userService = us;
    this.contactService = cs;
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

}
