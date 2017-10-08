import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as xml2js from 'xml2js';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class EventsProvider {

  public events;
  public jsondata;

  constructor(public http: Http) {
    console.log('Hello EventsProvider Provider');
    //this.http.get('http://www.parkrun.org.uk/wp-content/themes/parkrun/xml/geo.xml').subscribe(data => {
    this.events = this.http.get('http://localhost:8100/assets/geo.json')
    .subscribe(data => {
      this.events = data.json().geo.e;
    });
  }

  getEvents() {
    return this.events;
  }

}
