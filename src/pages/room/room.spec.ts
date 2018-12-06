import { async, fakeAsync, ComponentFixture, TestBed, tick, discardPeriodicTasks } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RoomPage } from './room';
import { IonicModule } from 'ionic-angular/index';
import { Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
      providers: []
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

  // it('should publish measure:reading event when measure() is called', () => {
    
  // })

  it('is subscribed for new measuring changes', () => {
    let temperature = component.temperature
    let humidity = component.humidity
    component.ngOnInit()
    
    let newMeasures = {
      temperature: 0,
      humidity: 0
    }

    component.events.publish('measure:received', newMeasures)

    temperature = component.temperature
    humidity = component.humidity

    expect(temperature).toBe(0)
    expect(humidity).toBe(0)
  })
});
