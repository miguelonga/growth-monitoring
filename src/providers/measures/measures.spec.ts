import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MeasuresProvider } from './measures';
import { AlertsProvider } from '../alerts/alerts';
import { AlertControllerMock } from 'ionic-mocks';
import { fakeData } from './fake-data'

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

  it('should retrieve empty if day has not measures', (done) => {
    // esto se tiene que cambiar a ISO date
    let dayWithoutData = "1994-01-11"
    provider.retrieve(dayWithoutData).subscribe((data) => {
      expect(data).toEqual([])
      done()
    })
  })

  it('should retrieve all measures for a day', (done) => {
    let day = fakeData[0].date.substring(0,10)
    provider.retrieve(day).subscribe((data) => {
      expect(data[0]).toEqual(fakeData[0])
      done()
    })
  })
});

class AlertsProviderMock {
  alertCtrl = AlertControllerMock.instance()
  check(){}
}