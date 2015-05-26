import moment from 'moment';

export class MomentValueConverter {
  toView(date) {
    moment.locale('nl');
    return moment(date).format('LLL');
  }
}
