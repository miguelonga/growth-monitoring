import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fakeData } from './fake-data';
import { AlertsProvider } from '../alerts/alerts';

@Injectable()
export class MeasuresProvider {

	data = fakeData
	index = 60

  constructor(public alertsProvider: AlertsProvider) {
  }

  measure(): Observable<any>{
  	let randomMeasure = this.simulateMeasure()
  	this.alertsProvider.check(randomMeasure)
  	return Observable.of(randomMeasure)
  }

  simulateMeasure(){
  	if(this.index === this.data.length){
  		this.index = 0
  	}
  	this.index += 1
  	return this.data[this.index];
  }
}
