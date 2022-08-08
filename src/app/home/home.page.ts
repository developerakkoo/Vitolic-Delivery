import { Component } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  orders = []


  constructor(private launchNavigator: LaunchNavigator,
    private barcodeScanner: BarcodeScanner,
    private io: Socket) {
      this.io.connect();
    }


    scan(){
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
       }).catch(err => {
           console.log('Error', err);
       });
    }
  openGoogleMaps(){
    this.launchNavigator.navigate([1,1]).then((succes) =>{
      console.log(succes);
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }
}
