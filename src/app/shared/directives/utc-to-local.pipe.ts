import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utcToLocal'
})
export class UtcToLocalPipe implements PipeTransform {
  datePipe: DatePipe;

  transform(utcTime: string): string {
    const date = new Date(utcTime).toUTCString();
   // const data = this.datePipe.transform(date, 'dd/MM/yyyy, h:mm a')
    return date; // You can customize the format as needed
  }

}
