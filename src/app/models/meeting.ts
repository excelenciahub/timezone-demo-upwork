import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from './date-util';

export class Meeting {
    id: number;
    name: string;
    startDateTime: string;
    endDateTime: string;
    date: NgbDateStruct;
    startTime: NgbTimeStruct;
    endTime: NgbTimeStruct;

    constructor(data) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.startDateTime = data.startDateTime || '';
        this.date = DateUtil.convertDateToNgbDate(data.startDateTime);
        this.endTime = DateUtil.convertDateToNgbTime(data.endDateTime);
    }

}
