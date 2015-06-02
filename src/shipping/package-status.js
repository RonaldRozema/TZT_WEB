import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {PackageService} from '../services/packageService';

@inject(PackageService)
export class PackageStatus {

  shipment = {};

  constructor(ps) {
    this.ps = ps;
  }

  activate(routerValues) {
    return this.ps.getShipmentByTrackingNumber(routerValues.tracking_number).then(shipment => {
      this.shipment = shipment;
    });
  }

}
