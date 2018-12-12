import { Injectable } from '@angular/core';
import { growthRules } from './rules';
import { alertMessages } from './alertMessages';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertsProvider {

	period = 'growth'
	rules = growthRules

  constructor(public alertCtrl: AlertController) {

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
