import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {PackageService} from '../services/packageService';
import {Validation} from 'aurelia-validation';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteService} from '../services/routeService';
import {Router} from 'aurelia-router';

@inject(PackageService, RouteService)
export class Label {

  shipment = {};

  constructor(ps, rs) {
    this.ps = ps;
    this.rs = rs;
  }

  activate(routerValues) {
    return this.ps.getShipmentByTrackingNumber(routerValues.tracking_number).then(shipment => {
      console.log(shipment);
      this.shipment = shipment;
    });
  }
}
