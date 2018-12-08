import { TestBed, inject } from '@angular/core/testing';
import { AlertsProvider } from './alerts';
import { growthRules } from './rules';
import { alertMessages } from './alertMessages';

describe('AlertsProvider', () => {

  let provider;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ 
    	AlertsProvider
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
    let showAlertSpy = spyOn(provider, 'showAlert').and.callThrough()

    provider.check(newMeasure)

    expect(showAlertSpy).toHaveBeenCalledWith(expectedMessage)
  })

  it('should alert if minimum temperature has been lowered', () => {
    let newMeasure = {
      date: 'some date',
      temperature: growthRules.minTemperature - 1,
      humidity: 'some humidity'
    }
    let expectedMessage = alertMessages.minTemperature
    let showAlertSpy = spyOn(provider, 'showAlert').and.callThrough()

    provider.check(newMeasure)

    expect(showAlertSpy).toHaveBeenCalledWith(expectedMessage)
  })

  it('should alert if maximum humidity has been exceeded', () => {
    let newMeasure = {
      date: 'some date',
      temperature: 'some temperature',
      humidity: growthRules.maxHumidity + 1
    }
    let expectedMessage = alertMessages.maxHumidity
    let showAlertSpy = spyOn(provider, 'showAlert').and.callThrough()

    provider.check(newMeasure)

    expect(showAlertSpy).toHaveBeenCalledWith(expectedMessage)
  })

  it('should alert if minimum humidity has been lowered', () => {
    let newMeasure = {
      date: 'some date',
      temperature: 'some temperature',
      humidity: growthRules.minHumidity - 1 
    }
    let expectedMessage = alertMessages.minHumidity
    let showAlertSpy = spyOn(provider, 'showAlert').and.callThrough()

    provider.check(newMeasure)

    expect(showAlertSpy).toHaveBeenCalledWith(expectedMessage)
  })
});