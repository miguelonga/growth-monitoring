import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RoomPage } from './room';
import { IonicModule, Platform, NavController} from 'ionic-angular/index';
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
      providers: [
        NavController
      ]
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
    const temperature = component.temperature;
    const displayedTemperature = debugElement.nativeElement.innerText;
    
    expect(temperature === Number(displayedTemperature)).toBe(true)
  });

  it('should display humidity value as number', () => {
    const debugElement = fixture.debugElement.query(By.css('#humidity'));
    const humidity = component.humidity
    const displayedHumidity = debugElement.nativeElement.innerText;

    expect(humidity === Number(displayedHumidity)).toBe(true)
  });
});
