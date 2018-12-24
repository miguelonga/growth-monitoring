import { Component } from '@angular/core';
import { MeasuresProvider } from '../../providers/measures/measures'

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class Calendar {
	today = new Date().toISOString().substring(0,10)
	errorMessage = ''
  constructor(public measuresProvider: MeasuresProvider) {
  }

  onDayChange(event){
  	this.today = this.composeDayFrom(event)
  }

  composeDayFrom(event){
  	let day = '' + event.year + '-' + event.month + '-' + event.day
  	return day
  }

  retrieveData(day){
  	this.measuresProvider.retrieve(day).subscribe(data => {
  		if(data.length === 0){
  			this.errorMessage = 'No data available'
  		}
  	})
  }
}
