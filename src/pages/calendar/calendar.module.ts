import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Calendar } from './calendar';

@NgModule({
  declarations: [
    Calendar,
  ],
  imports: [
    IonicPageModule.forChild(Calendar),
  ]
})
export class CalendarPageModule {}
