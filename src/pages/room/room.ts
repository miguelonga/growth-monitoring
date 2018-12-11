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
	refreshInterval = 1000;
  
  constructor(public measuresProvider: MeasuresProvider,
              public modalController: ModalController) {
	}

	ngOnInit(){
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
    settingsModal.present();
  }

  _start(){
  	let measureInterval = setInterval(() => {
  		this.measure()
  	}, this.refreshInterval)
  }
}
