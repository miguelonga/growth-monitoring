import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MeasuresProvider } from '../providers/measures/measures';
import { AlertsProvider } from '../providers/alerts/alerts';
import { RoomSettings } from '../pages/room-settings/room-settings';
import { Calendar } from '../pages/calendar/calendar';

@NgModule({
  declarations: [
    MyApp,
    RoomSettings,
    Calendar
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RoomSettings,
    Calendar
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MeasuresProvider,
    AlertsProvider
  ]
})
export class AppModule { }
