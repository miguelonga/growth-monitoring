import { TestBed, inject, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { AlertsProvider } from './alerts';
import { growthRules } from './rules';
import { alertMessages } from './alertMessages';
import { AlertControllerMock } from 'ionic-mocks';
import { AlertController } from 'ionic-angular';

describe('AlertsProvider', () => {

  let provider;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ 
      { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
      AlertsProvider,
    ]
  }));

  beforeEach(inject([AlertsProvider], (p) => {
    provider = p;
	}));

  it('should be created', () => {
    expect(provider).toBeTruthy();
  });

  it('should start with growth period as default', () => {
    let expectedRules = growthRules

    expect(provider.rules).toEqual(expectedRules)
    expect(provider.period).toEqual('growth')
  })

  it('should alert if maximum temperature has been exceeded', () => {
    let newMeasure = {
      date: 'some date',
      temperature: growthRules.maxTemperature + 1,
      humidity: 0
    }
    let expectedMessage = alertMessages.maxTemperature
    let presentAlertSpy = spyOn(provider, 'presentAlert').and.callThrough()

    provider.check(newMeasure)

    expect(presentAlertSpy).toHaveBeenCalledWith(expectedMessage)
    expect(provider.alertCtrl.create).toHaveBeenCalled()
  })

  it('should alert if minimum temperature has been lowered', () => {
    let newMeasure = {
      date: 'some date',
      temperature: growthRules.minTemperature - 1,
      humidity: 'some humidity'
    }
    let expectedMessage = alertMessages.minTemperature
    let presentAlertSpy = spyOn(provider, 'presentAlert').and.callThrough()

    provider.check(newMeasure)

    expect(presentAlertSpy).toHaveBeenCalledWith(expectedMessage)
    expect(provider.alertCtrl.create).toHaveBeenCalled()
  })

  it('should alert if maximum humidity has been exceeded', () => {
    let newMeasure = {
      date: 'some date',
      temperature: 'some temperature',
      humidity: growthRules.maxHumidity + 1
    }
    let expectedMessage = alertMessages.maxHumidity
    let presentAlertSpy = spyOn(provider, 'presentAlert').and.callThrough()

    provider.check(newMeasure)

    expect(presentAlertSpy).toHaveBeenCalledWith(expectedMessage)
    expect(provider.alertCtrl.create).toHaveBeenCalled()
  })

  it('should alert if minimum humidity has been lowered', () => {
    let newMeasure = {
      date: 'some date',
      temperature: 'some temperature',
      humidity: growthRules.minHumidity - 1 
    }
    let expectedMessage = alertMessages.minHumidity
    let presentAlertSpy = spyOn(provider, 'presentAlert').and.callThrough()

    provider.check(newMeasure)

    expect(presentAlertSpy).toHaveBeenCalledWith(expectedMessage)
    expect(provider.alertCtrl.create).toHaveBeenCalled()
  })

  it('should be able to edit the measure rules', () => {
    let presentAlertSpy = spyOn(provider, 'presentAlert').and.callThrough()
    let newRules = {
      maxTemperature: growthRules.maxTemperature - 2,
      minTemperature: growthRules.minTemperature,
      maxHumidity: growthRules.maxHumidity - 2,
      minHumidity: growthRules.minHumidity
    }
    let measureForNewRulesMaximumsFailures = {
      date: 'some date',
      temperature: newRules.maxTemperature + 1,
      humidity: newRules.maxHumidity + 1 
    }
    let expectedHumidityMessage = alertMessages.maxHumidity
    let expectedTemperatureMessage = alertMessages.maxTemperature
    expect(presentAlertSpy.calls.any()).toBe(false)

    provider.editRules(newRules)   
    provider.check(measureForNewRulesMaximumsFailures)

    expect(presentAlertSpy).toHaveBeenCalledWith(expectedTemperatureMessage)
    expect(presentAlertSpy).toHaveBeenCalledWith(expectedHumidityMessage)
    expect(provider.alertCtrl.create).toHaveBeenCalled()
  })
});