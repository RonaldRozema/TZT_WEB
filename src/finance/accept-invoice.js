import {inject} from 'aurelia-framework'
import {Validation} from 'aurelia-validation';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteService} from '../services/routeService';

@inject(Validation, EventAggregator, RouteService)
export class AcceptInvoice {

  shipment_info = {};
  date = new Date();

  constructor(validation, ea, rs) {
    this.validation = validation;
    this.ea = ea;
    this.rs = rs;
  }

  activate(routerValues) {
    return this.rs.get_shipment_by_id(routerValues.shipment_id).then(shipment_info => {
      console.log(shipment_info);
      this.shipment_info = shipment_info;
    });
  }

}
