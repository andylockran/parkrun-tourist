import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class EventsProvider {

  public events;
  public jsondata;
  public apiurl = "http://localhost:8100/assets/geo.json";
  //let apiurl = "http://www.parkrun.org.uk/wp-content/themes/parkrun/xml/geo.xml";

  constructor(public http: HttpClient) {
    console.log('Hello EventsProvider Provider');
  }

  getEvents() {
    return new Promise(resolve => {
      this.http.get(this.apiurl).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
