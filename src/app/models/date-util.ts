import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import * as momentTimeZone from 'moment-timezone';

export class DateUtil {

    static convertDateToNgbDate(value: any): NgbDateStruct {
        if (!value) {
            return null;
        }
        value = new Date(value);
        return { year: + value.getFullYear(), month: value.getMonth() + 1, day: value.getDate() };
    }

    static convertDateToNgbTime(value: any): NgbTimeStruct {
        if (!value) {
            return null;
        }
        value = new Date(value);
        return { hour: + value.getHours(), minute: value.getMinutes(), second: 0 };
    }

    static covertDateAndTimeToDateObject(date: NgbDateStruct, time: NgbTimeStruct, selectedTimeZone): Date {

        const dates = new Date();
        dates.setDate(date.day);
        dates.setMonth(date.month - 1);
        dates.setFullYear(date.year);
        dates.setHours(time.hour);
        dates.setMinutes(time.minute);

        const dd = momentTimeZone.tz(dates, selectedTimeZone);
        return new Date(dates.getTime() - dd.utcOffset() * 60000);
    }
}
