import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage implements OnInit{
	temperature = 25;
	humidity = 68;
	refreshInterval = 1000;
  
  constructor(public events: Events) {
	}

	ngOnInit(){
  	this._start()
  	this._subscribe()
	}

  measure(){
  	this.events.publish('measure:reading', {})
  }

  _start(){
  	let measureInterval = setInterval(() => {
  		this.measure()
  	}, this.refreshInterval)
  }

  _subscribe(){
  	this.events.subscribe('measure:received', (newMeasure) => {
  		this.temperature = newMeasure.temperature
  		this.humidity = newMeasure.humidity
  	})
  }
}
