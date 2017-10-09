import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { EventsProvider } from '../../providers/events/events';

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  providers: [
    EventsProvider,
    Geolocation
  ]
})
export class HomePageModule {}
