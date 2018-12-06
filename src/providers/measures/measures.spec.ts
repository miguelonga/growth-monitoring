import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MeasuresProvider } from './measures';
import { Events } from 'ionic-angular';

describe('MeasuresProvider', () => {

  let service;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ 
    	MeasuresProvider,
    	Events
    ]
  }));

  beforeEach(inject([MeasuresProvider], (s) => {
    service = s;
	}

  it('should be created', () => {
    expect(service).toBeTruthy();
  }));

  it('should be subscribed to measure:reading event', fakeAsync(() => {
    let readSpy = spyOn(service, 'read').and.callThrough()
    expect(readSpy.calls.any()).toBe(false)

    service.events.publish('measure:reading', {})

    expect(readSpy.calls.count()).toBe(1)
  }));
});