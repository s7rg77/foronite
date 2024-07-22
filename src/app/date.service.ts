import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class DateService {

  constructor() { }

  formatDate(date: any): any {

    const currentDate = new Date();
    const inputDate = new Date(date);

    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    const datePipe = new DatePipe('en-US');

    if (currentDate.toDateString() == inputDate.toDateString()) {
      return 'hoy ' + datePipe.transform(inputDate, 'HH:mm');
    } else if (yesterday.toDateString() == inputDate.toDateString()) {
      return 'ayer ' + datePipe.transform(inputDate, 'HH:mm');
    } else {
      return datePipe.transform(inputDate, 'dd/MM HH:mm');
    }

  }

}