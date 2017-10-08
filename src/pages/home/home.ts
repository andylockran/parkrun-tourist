import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public events: any[];

  constructor(public navCtrl: NavController, public eventsp: EventsProvider) {
    this.events = this.eventsp.getEvents()
    .subscribe(data => {
      this.events = data.json();
    });;
    
  }

  getEvents() {
    this.events = this.eventsp.getEvents();
    console.log(this.events);
  }

}
