import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as momentTimeZone from 'moment-timezone';

@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {

  constructor(
    private datePipe: DatePipe
  ) { }

  transform(date: string, selectedTimeZone: string) {
    if (date) {
        const dates = new Date(date);
        const dd = momentTimeZone.tz(dates, selectedTimeZone);
        return this.datePipe.transform(new Date(dates.getTime() + dd.utcOffset() * 60000),  'dd/MM/yyyy hh:mm a');
    }
    return '-';
  }
}
