import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class MeasuresProvider {

  constructor(public events: Events) {
    this._subscribe()
  }

  read(){
  }

  _subscribe(){
  	this.events.subscribe('measure:reading', (room) => {
  		this.read()
  	})
  }	

}
