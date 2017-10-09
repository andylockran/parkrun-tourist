import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { Geolocation } from '@ionic-native/geolocation';
import * as _ from 'lodash';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public events: any;
  public loclat: any;
  public loclong: any;

  constructor(public navCtrl: NavController, public eventsp: EventsProvider, private geolocation: Geolocation) {

  }

  getEvents() {
    this.eventsp.getEvents()
    .then(data => {
      let locations = data['geo']['e'];
      locations.forEach(loc => {
        console.log(loc);
        loc.distance = this.getDistance(loc.la, loc.lo);
        return loc
      });
      this.events = _.orderBy(locations, ['distance']);
      console.log(this.events);
    });
  }

  getLocation() {
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.loclat = resp.coords.latitude;
      this.loclong = resp.coords.longitude;
      console.log(this.loclat, this.loclong);
    }).catch( err => {
      console.log('Error getting location', err);
    });
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  getDistance(lat, lon) {
    /*Calculates distance in miles from local coords */
    var R = 6371;
    var dlat = this.deg2rad(lat - this.loclat);
    var dlon = this.deg2rad(lon - this.loclong);
    var a = 
    Math.sin(dlat/2) * Math.sin(dlat/2) +
    Math.cos(this.deg2rad(this.loclat)) * Math.cos(this.deg2rad(lat)) *
    Math.sin(dlon/2) * Math.sin(dlon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d
  }
}