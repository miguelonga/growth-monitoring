import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as measures from './fake-data.json'

@Injectable()
export class MeasuresProvider {

	data = measures

  constructor() {
  }

  measure(): Observable<any>{
  	return Observable.of(this.data[0])
  }
}
