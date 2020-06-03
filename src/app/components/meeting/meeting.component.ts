import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meeting } from 'src/app/models/meeting';
import * as moment from 'moment';
import { DateUtil } from 'src/app/models/date-util';
import {timeZones } from 'src/app/models/time-zone';
import { LocalService } from 'src/app/services/local.service';
import { GlobalConstants } from 'src/app/models/global-constant';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css'],
})
export class MeetingComponent implements OnInit {


  meridian = true;
  selectedTimeZone = 'Asia/Kolkata';

  meetingForm: FormGroup;
  isFormSubmitted = false;

  timeZones = timeZones;
  meetingList: Meeting[] = [];

  isSuccess = false;

  minDate: NgbDateStruct;

  constructor(
    private formBuilder: FormBuilder,
    private localService: LocalService
  ) { }

  ngOnInit() {
    this.minDate = DateUtil.convertDateToNgbDate(new Date());
    this.buildForm(new Meeting({}));
    const list = this.localService.getValue(GlobalConstants.LOCAL_STORAGE_KEY.MEETING_LIST);
    if (list) {
      this.meetingList = JSON.parse(list);
    }
  }

  /**
   *
   * @param data
   */
  buildForm(data: Meeting) {
    this.meetingForm = this.formBuilder.group({
      id: [data.id],
      name: [data.name, Validators.required],
      date: [data.date, Validators.required],
      startTime: [data.startTime, Validators.required],
      endTime: [data.endTime, Validators.required],
    });
    this.isFormSubmitted = false;
  }

  /**
   * Used to get the form control
   */
  get f() {
    return this.meetingForm.controls;
  }

  /**
   * For Form submit
   */
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.meetingForm.invalid) {
      return;
    }
    this.startDateTimeAndEndDateTimeChange();
    this.checkStartAndEndDate();
    if (this.meetingForm.invalid) {
      return;
    }
    const meetingData: Meeting = Object.assign(this.meetingForm.value);
    this.meetingList.push(meetingData);
    this.localService.setValue(GlobalConstants.LOCAL_STORAGE_KEY.MEETING_LIST, this.meetingList);
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 3000);
    this.buildForm(new Meeting({}));
  }

  /**
   * Used to check the start/end time is valid or not
   */
  startDateTimeAndEndDateTimeChange() {
    if (this.meetingForm.get('date').value && this.meetingForm.get('startTime').value && this.meetingForm.get('endTime').value) {

      const startTime = moment(DateUtil.covertDateAndTimeToDateObject(this.meetingForm.get('date').value,
        this.meetingForm.get('startTime').value, this.selectedTimeZone)).format('YYYY-MM-DD[T]HH:mm:ss');
      const endTime = moment(DateUtil.covertDateAndTimeToDateObject(this.meetingForm.get('date').value,
        this.meetingForm.get('endTime').value, this.selectedTimeZone)).format('YYYY-MM-DD[T]HH:mm:ss');

      if (moment(startTime).isAfter(moment(endTime))) {
        this.meetingForm.get('date').setErrors({ invalid : true });
        this.meetingForm.markAllAsTouched();
        this.meetingForm.markAsDirty();
      } else {
        this.meetingForm.get('date').setErrors(null);
        this.meetingForm.markAllAsTouched();
      }
    }
  }

  /**
   * For to check start and end date and time is valid or not
   */
  checkStartAndEndDate() {
    const meetingData: Meeting = Object.assign(this.meetingForm.value);

    meetingData.startDateTime = moment(DateUtil.covertDateAndTimeToDateObject(
      meetingData.date, meetingData.startTime, this.selectedTimeZone)).format('YYYY-MM-DD[T]HH:mm:ss');

    meetingData.endDateTime = moment(DateUtil.covertDateAndTimeToDateObject(
      meetingData.date, meetingData.endTime, this.selectedTimeZone)).format('YYYY-MM-DD[T]HH:mm:ss');

    const startDate = new Date(meetingData.startDateTime).getTime();
    const endDate = new Date(meetingData.endDateTime).getTime();

    const meetings = this.meetingList.filter(meeting => {
        const st = new Date(meeting.startDateTime).getTime();
        const et = new Date(meeting.endDateTime).getTime();
        return ((st >= startDate && st <= endDate) || (et >= startDate && et <= endDate));
    });

    if (meetings.length !== 0) {
      this.meetingForm.get('date').setErrors({ invalidSlot: true });
      this.meetingForm.markAllAsTouched();
      this.meetingForm.markAsDirty();
    } else {
      this.meetingForm.get('date').setErrors(null);
      this.meetingForm.markAllAsTouched();
    }
  }
}
