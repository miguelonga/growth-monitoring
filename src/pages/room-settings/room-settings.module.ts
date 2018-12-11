import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomSettings } from './room-settings';

@NgModule({
  declarations: [
    RoomSettings,
  ],
  imports: [
    IonicPageModule.forChild(RoomSettings),
  ],
})
export class RoomSettingsPageModule {}
