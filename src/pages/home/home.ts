import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
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

  constructor(public navCtrl: NavController, public eventsp: EventsProvider) {
    this.getEvents();
  }

  getEvents() {
    this.eventsp.getEvents()
    .then(data => {
      this.events = data.geo.e;
      console.log(this.events);
    });
  }
}