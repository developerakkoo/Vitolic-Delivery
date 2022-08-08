import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
const config: SocketIoConfig = { url: 'http://192.168.3.108:8080', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,SocketIoModule.forRoot(config), IonicStorageModule.forRoot({
    name: "vitolic-delivery"
  })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BarcodeScanner,LaunchNavigator],
  bootstrap: [AppComponent],
})
export class AppModule {}
