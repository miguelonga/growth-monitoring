import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { growthRules } from './rules';
import { alertMessages } from './alertMessages';

@Injectable()
export class AlertsProvider {

	period = 'growth'
	rules = growthRules

  constructor() {

  }

  check(measure){
  	let temperature = measure.temperature
  	let humidity = measure.humidity

  	if(temperature >= this.rules.maxTemperature){
  		this.showAlert(alertMessages.maxTemperature)
  	}
  	if(temperature <= this.rules.minTemperature){
  		this.showAlert(alertMessages.minTemperature)
  	}
  	if(humidity <= this.rules.minHumidity){
  		this.showAlert(alertMessages.minHumidity)
  	}
  	if(humidity >= this.rules.maxHumidity){
  		this.showAlert(alertMessages.maxHumidity)
  	}
  }

  showAlert(alert){
  	
  }
}
