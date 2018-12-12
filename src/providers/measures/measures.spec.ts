import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MeasuresProvider } from './measures';
import { AlertsProvider } from '../alerts/alerts';
import { AlertControllerMock } from 'ionic-mocks';

describe('MeasuresProvider', () => {

  let provider;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ 
    	MeasuresProvider,
      { provide: AlertsProvider, useClass: AlertsProviderMock }
    ]
  }));

  beforeEach(inject([MeasuresProvider], (p) => {
    provider = p;
	}));

  it('should be created', () => {
    expect(provider).toBeTruthy();
  });

  it('should return an observable of a measure interface', (done) => {
  	let expectedResponse = {
  		date: 'some date',
  		temperature: 'some temperature',
  		humidity: 'some humidity'
  	}
  	let expectedResponseKeys = Object.keys(expectedResponse)
  	
  	provider.measure().subscribe((measure) => {
  		let responseKeys = Object.keys(measure)
  		expect(expectedResponseKeys).toEqual(responseKeys)
  		done()
  	})

  })
});

class AlertsProviderMock {
  alertCtrl = AlertControllerMock.instance()
  check(){}
}