import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RoomSettings } from './room-settings';
import { IonicModule } from 'ionic-angular/index';
import { ViewController, NavParams } from 'ionic-angular';
import { NavParamsMock, ViewControllerMock } from '../../../test-config/mocks-ionic'
import { AlertsProvider } from '../../providers/alerts/alerts';

describe('Room Settings Modal', () => {
  let debugElement: DebugElement;
  let component: RoomSettings;
  let fixture: ComponentFixture<RoomSettings>;
  let roomFromNavParams: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomSettings],
      imports: [
        IonicModule.forRoot(RoomSettings)
      ],
      providers: [
        {provide: ViewController, useClass: ViewControllerMock},
        {provide: NavParams, useClass: NavParamsMock},
        AlertsProvider
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSettings);
    component = fixture.componentInstance;
    roomFromNavParams = component.navParams.get('room')
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeDefined()
  })

  it('should be initialized with some room', () => {
    expect(component.room).toEqual(roomFromNavParams)
    expect(component.room.temperature$).toEqual(roomFromNavParams.temperature$)
  })

  it('should be able to edit room rules', () => {
    let newRules = {
      maxTemperature: 100,
      minTemperature: 50,
      maxHumidity: 200,
      minHumidity: 100
    }

    component.edit(newRules)
    fixture.detectChanges()
    let editedRules = component.rules

    expect(newRules.maxTemperature).toEqual(editedRules.maxTemperature)
  })

  it('should know ion-range params for each rule', () => {
    let rulesKeys = Object.keys(component.rules)
    let rulesRangeInputPropertiesKeys = Object.keys(component.rulesProperties)
    
    let anyRuleRangeInputPropertiesKeys = ['color', 'icon', 'maxRangeInput', 'minRangeInput', 'name']

    let randomRuleProperties = rulesRangeInputPropertiesKeys[Math.floor(Math.random() * rulesRangeInputPropertiesKeys.length)]
    let randomRulePropertiesKeys = Object.keys(component.rulesProperties[randomRuleProperties])

    expect(rulesRangeInputPropertiesKeys).toEqual(rulesKeys)
    expect(anyRuleRangeInputPropertiesKeys).toEqual(randomRulePropertiesKeys)
  })

  it('should close and dismiss with the room information', () => {
    let dismissSpy = spyOn(component, 'dismiss').and.callThrough()

    component.close()

    expect(dismissSpy).toHaveBeenCalledWith(component.room)
  })
})
