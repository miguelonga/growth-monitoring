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

  retrieve(day): Observable<any>{
    let dayMeasures = fakeData.filter(measure => {
      return measure.date.substring(0,10) === day
    })
    return Observable.of(dayMeasures)
  }

  simulateMeasure(){
    let now = new Date().toISOString()
    if(this.index === this.data.length){
      this.index = 0
    }
    this.index += 1
    let measure = this.data[this.index]
    measure.date = now
    return this.data[this.index];
  }

}
