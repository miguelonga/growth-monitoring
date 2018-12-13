import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { MeasuresProvider } from '../../providers/measures/measures'
import { RoomSettings } from '../room-settings/room-settings'

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage implements OnInit{
	temperature$;
	humidity$;
  measureInterval;
	refreshInterval = 30000;
  
  constructor(public measuresProvider: MeasuresProvider,
              public modalController: ModalController) {
	}

	ngOnInit(){
    this.measure()
  	this._start()
	}

  measure(){
  	this.measuresProvider.measure().subscribe(measure=> {
  		this.temperature$ = measure.temperature
  		this.humidity$ = measure.humidity
  	})
  }

  openSettings(){
    let settingsModal = this.modalController.create(RoomSettings, {room: this});
    settingsModal.onDidDismiss(data => {
      this.refreshInterval = data.refreshInterval
      clearInterval(this.measureInterval);
      this._start()
    });
    settingsModal.present();
  }

  _start(){
  	this.measureInterval = setInterval(() => {
  		this.measure()
  	}, this.refreshInterval)
  }
}
