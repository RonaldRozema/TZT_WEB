import {inject} from 'aurelia-framework'
import {Validation} from 'aurelia-validation';
import {EventAggregator} from 'aurelia-event-aggregator';
import {RouteService} from '../services/routeService';
import {Router} from 'aurelia-router';

@inject(Validation, EventAggregator, Router, RouteService)
export class AcceptInvoice {

  shipment_info = {};

  constructor(validation, ea, router, rs) {
    this.validation = validation;
    this.ea = ea;
    this.rs = rs;
    this.router = router;
  }

  activate(routerValues) {
    return this.rs.get_shipment_by_id(routerValues.shipment_id).then(shipment_info => {
      this.shipment_info = shipment_info;
    });
  }

  pay(){
    this.rs.update_shipment_to_payed(this.shipment_info.shipment.id).then(shipment => {
      this.router.navigate('invoice');
    });
  }

}
