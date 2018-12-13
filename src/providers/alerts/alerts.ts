import { Injectable } from '@angular/core';
import { growthRules } from './rules';
import { alertMessages } from './alertMessages';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertsProvider {

	period = 'growth'
	rules = growthRules
  lastTimeAlert = {
    maxTemperature: '',
    minTemperature: '',
    maxHumidity: '',
    minHumidity: ''
  }
  noBotheringMinutes = 3

  constructor(public alertCtrl: AlertController) {

  }

  check(measure){
  	let temperature = measure.temperature
  	let humidity = measure.humidity

  	if(temperature >= this.rules.maxTemperature){
      let rule = 'maxTemperature'
      this.process(rule, measure.date)
  	}
  	if(temperature <= this.rules.minTemperature){
      let rule = 'minTemperature'
      this.process(rule, measure.date)
  	}
  	if(humidity >= this.rules.maxHumidity){
      let rule = 'maxHumidity'
      this.process(rule, measure.date)
  	}
    if(humidity <= this.rules.minHumidity){
      let rule = 'minHumidity'
      this.process(rule, measure.date)
    }
  }

  process(rule, date){
    console.log(rule, date)
    if(this.canBeAlerted(rule, date)){
      this.presentAlert(alertMessages[rule])
    }
    this.store(rule, date)
  }

  store(alert, date){
    this.lastTimeAlert[alert] = date
  }

  canBeAlerted(alert, date){
    if(this.lastTimeAlert[alert] === ''){
      return true
    }
    let toCompareDate = new Date(date)
    let lastTimeAlert = new Date(this.lastTimeAlert[alert])
    
    lastTimeAlert.setMinutes(lastTimeAlert.getMinutes() + this.noBotheringMinutes)
    
    return (lastTimeAlert < toCompareDate)
  }

  presentAlert(alertData) {
    let alert = this.alertCtrl.create({
      title: alertData.message,
      subTitle: 'has been triggered',
      buttons: ['Ok']
    });
    alert.present();
  }

  editRules(rules){
    this.rules = rules
  }
}
