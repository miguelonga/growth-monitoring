import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { AlertsProvider } from '../../providers/alerts/alerts';

@Component({
  selector: 'room-settings',
  templateUrl: 'room-settings.html',
})
export class RoomSettings {
	room;
  rules;
  rulesKeys = []
  rulesProperties = {
    maxTemperature: {
      color: 'danger',
      icon: 'thermometer',
      maxRangeInput: 35,
      minRangeInput: 16,
      name: 'Max temperature'
    },
    minTemperature: {
      color: 'danger',
      icon: 'thermometer',
      maxRangeInput: 24,
      minRangeInput: 13,
      name: 'Min temperature'
    },
    maxHumidity: {
      color: 'primary',
      icon: 'water',
      maxRangeInput: 85,
      minRangeInput: 50,
      name: 'Max humidity'
    },
    minHumidity: {
      color: 'primary',
      icon: 'water',
      maxRangeInput: 50,
      minRangeInput: 30,
      name: 'Min humidity'
    }
  }
  refresInterval = 0;

  constructor(public viewCtrl: ViewController,
  						public navParams: NavParams,
              public alertsProvider: AlertsProvider) {
  	this.room = navParams.get('room')
    this.rules = alertsProvider.rules
    this.rulesKeys = Object.keys(this.rules)
  }

  edit(rules){
  	this.rules = rules
  }

  close(){
  	this.dismiss(this.room)
  }

  dismiss(room){
  	this.viewCtrl.dismiss(room)
  }
}
