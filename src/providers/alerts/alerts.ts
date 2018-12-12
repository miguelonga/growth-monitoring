import { Injectable } from '@angular/core';
import { growthRules } from './rules';
import { alertMessages } from './alertMessages';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertsProvider {

	period = 'growth'
	rules = growthRules
  lastTimeofAlert;
  noBotherTime = 2 * 60 * 1000

  constructor(public alertCtrl: AlertController) {
    let now = Date.now()
    this.lastTimeofAlert = {
      maxTemperature: now,
      minTemperature: now,
      maxHumidity: now,
      minHumidity: now
    }
  }

  check(measure){
  	let temperature = measure.temperature
  	let humidity = measure.humidity

  	if(temperature >= this.rules.maxTemperature){
  		this.presentAlert(alertMessages.maxTemperature)
  	}
  	if(temperature <= this.rules.minTemperature){
  		this.presentAlert(alertMessages.minTemperature)
  	}
  	if(humidity <= this.rules.minHumidity){
  		this.presentAlert(alertMessages.minHumidity)
  	}
  	if(humidity >= this.rules.maxHumidity){
  		this.presentAlert(alertMessages.maxHumidity)
  	}
  }

  hasBeenRecentlyAlerted(alertKey){
    let now = Date.now()
    console.log(now)
    let timeFromLastAlert = this.lastTimeofAlert[alertKey] - now
    console.log(timeFromLastAlert)
    return (timeFromLastAlert > this.noBotherTime)
  }

  presentAlert(alertData) {
    let now = Date.now()
    if(this.hasBeenRecentlyAlerted(alertData.key)){
      console.log('ha sido ')
      return
    }
    let alert = this.alertCtrl.create({
      title: alertData.message,
      subTitle: 'has been triggered',
      buttons: ['Ok']
    });
    alert.present();
    this.lastTimeofAlert[alertData.key] = now
  }

  editRules(rules){
    this.rules = rules
  }
}
