import {inject} from 'aurelia-framework'
import {Validation} from 'aurelia-validation';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteService} from '../services/routeService';
import {UserService} from '../services/userservice';

@inject(Validation, EventAggregator, RouteService, UserService)
export class Invoice {

  shipments = {};

  constructor(validation, ea, rs, us) {
    this.validation = validation;
    this.ea = ea;
    this.rs = rs;
    this.us = us;

    this.us.getProfile().then(user => {
      this.rs.get_shipments_for_user(user.id).then(shipments => {
        this.shipments = shipments;
      });
    });
  }

}
