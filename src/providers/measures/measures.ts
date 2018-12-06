import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class MeasuresProvider {

  constructor(public events: Events) {
    this._subscribe()
  }

  read(){
  	let randomTemperature = (Math.random() * (26.0 - 23.0 + 1.0) + 23.0).toFixed(1);
  	let randomHumidity = (Math.random() * (66.0 - 62.0 + 1) + 62.0).toFixed(1);
  	let newMeasure = {
  		temperature: randomTemperature,
  		humidity: randomHumidity
  	}
  	this.events.publish('measure:received', newMeasure)
  }

  _subscribe(){
  	this.events.subscribe('measure:reading', (room) => {
  		this.read()
  	})
  }	

}
