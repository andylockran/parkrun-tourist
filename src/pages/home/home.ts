import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
      let locations = data.geo.e;
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

  getDistance(lat, lon) {
    /*Calculates distance in miles from local coords */
    var radlat1 = Math.PI * this.loclat/180
    var radlat2 = Math.PI * lat/180
    var theta = this.loclong - lon;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    console.log(dist);
    return dist;
  }
}