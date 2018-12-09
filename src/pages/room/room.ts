import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { MeasuresProvider } from '../../providers/measures/measures'

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage implements OnInit{
	temperature$;
	humidity$;
	refreshInterval = 1000;
  
  constructor(public measuresProvider: MeasuresProvider) {
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

  _start(){
  	let measureInterval = setInterval(() => {
  		this.measure()
  	}, this.refreshInterval)
  }
}
