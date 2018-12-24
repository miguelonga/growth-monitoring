import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Calendar } from './calendar';
import { IonicModule } from 'ionic-angular/index';
import { fakeData } from '../../providers/measures/fake-data';
import { Observable } from 'rxjs';
import { MeasuresProvider } from '../../providers/measures/measures'
 
class MeasuresProviderStub {
  constructor() {
  }

  retrieve(day): Observable<any>{
    return Observable.of([])
  }
}

describe('Calendar Modal', () => {
  let debugElement: DebugElement;
  let component: Calendar;
  let fixture: ComponentFixture<Calendar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Calendar],
      imports: [
        IonicModule.forRoot(Calendar)
      ],
      providers: [
        { provide: MeasuresProvider, useClass: MeasuresProviderStub }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Calendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeDefined()
  })

  it('should know which day is today', () => {
    let today = new Date().toISOString().substring(0,10)
    expect(component.today).toEqual(today)
  })

  it('should retrieve data from measures provider for a selected day', fakeAsync(() => {
    let dayWithoutData = "1994-01-11"
    
    component.retrieveData(dayWithoutData)

    fixture.detectChanges()
    expect(component.errorMessage).toEqual('No data available')
  }))

  xit('should check for selected day data if day changes', () => {
    let someDayWithMeasures = fakeData[0].date
    let selectedDay = new Date(someDayWithMeasures).toISOString().substring(0,10)
    let retrieveDataSpy = spyOn(component, 'onDayChange').and.callThrough()

    fixture.detectChanges ()
    let ionicInputEl = fixture.debugElement.query(By.css('.datetime-text')).nativeElement
    console.log(ionicInputEl)
    ionicInputEl.value = selectedDay

    expect(retrieveDataSpy).toHaveBeenCalledWith(selectedDay)
  })
})
