import { async, fakeAsync, ComponentFixture, TestBed, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RoomPage } from './room';
import { IonicModule } from 'ionic-angular/index';
import { Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MeasuresProvider } from '../../providers/measures/measures'
import { Observable } from 'rxjs';

class MeasuresProviderStub {
  constructor() {
  }

  measure(): Observable<any>{
    const newMeasure = {
      date: '2018-11-30 19:17:23',
      temperature: 20.69,
      humidity: 75.32
    }
    return Observable.of(newMeasure)
  }
}

describe('RoomPage', () => {
  let debugElement: DebugElement;
  let component: RoomPage;
  let fixture: ComponentFixture<RoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomPage],
      imports: [
        IonicModule.forRoot(RoomPage)
      ],
      providers: [{provide: MeasuresProvider, useClass: MeasuresProviderStub}]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => expect(component).toBeDefined());

  it('should display temperature value as number', () => {
    const debugElement = fixture.debugElement.query(By.css('#temperature'));
    const temperature = component.temperature
    const displayedTemperature = debugElement.nativeElement.innerText
    
    expect(temperature === Number(displayedTemperature)).toBe(true)
  });

  it('should display humidity value as number', () => {
    const debugElement = fixture.debugElement.query(By.css('#humidity'));
    const humidity = component.humidity
    const displayedHumidity = debugElement.nativeElement.innerText

    expect(humidity === Number(displayedHumidity)).toBe(true)
  });

  it('asks for actual temperature and humidity anytime the interval has been expired', fakeAsync(() => {
    const refreshInterval = component.refreshInterval
    component.ngOnInit()
    let measureSpy = spyOn(component, 'measure').and.callThrough()
    expect(measureSpy.calls.any()).toBe(false)
    
    tick(refreshInterval)
    fixture.detectChanges()

    expect(measureSpy.calls.count()).toBe(1)

    discardPeriodicTasks()
  }));

  it('renders new value each time it is measured', fakeAsync(() => {
    const refreshInterval = component.refreshInterval
    component.ngOnInit()
    const stubedMeasure = {
      date: '2018-11-30 19:17:23',
      temperature: 20.69,
      humidity: 75.32
    }

    tick(refreshInterval)

    expect(component.temperature).toBe(stubedMeasure.temperature)
    expect(component.humidity).toBe(stubedMeasure.humidity)

    discardPeriodicTasks()
  }));
});
