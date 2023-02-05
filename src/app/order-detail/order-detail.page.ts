import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import * as  moment from 'moment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  _id;
  subId;
  order;
  orderId;
  products: any[];
  orderTotal;
  userAddress;
  add2;
  add3;
  city;
  pincode;
  username;
  email;

  isLoading: boolean = true;
  orderDeliveredSub: Subscription;
  subOrderDeleteSub: Subscription;
  constructor(

    private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute) {
      this._id = this.route.snapshot.paramMap.get("id");
      this.subId = this.route.snapshot.paramMap.get("subId");
      this.getOrder(this._id);
      console.log(moment().add(1,'d').format("YYYY-MM-DD"));
      
     }

  ngOnInit() {
  }

  ionViewDidLeave(){
    this.orderDeliveredSub.unsubscribe();
    this.subOrderDeleteSub.unsubscribe();
  }

  async getOrder(id){
    this.http.get(environment.API +'/cart/'+ id)
    .subscribe((cart) =>{
      console.log(cart);
      this.order = cart['cart'];
      this.orderId = cart['cart']['orderId'];
      this.userAddress = cart['cart']['address']['addLine1'];
      this.add2 = cart['cart']['address']['addLine2'];
      this.add3 = cart['cart']['address']['landmark'];
      this.city = cart['cart']['address']['city'];
      this.pincode = cart['cart']['address']['pincode'];
      this.orderTotal = cart['cart']['products'][0]['discountedPrice'];
      this.products = cart['cart']['products'];
      this.username = cart['cart']['userId']['fName'];
      this.email = cart['cart']['userId']['email'];
      console.log(this.username);
      this.isLoading = false;
      
      
    }, (error) =>{
      console.log(error);
      this.isLoading = false;

      
    }, ()=>{
      this.isLoading = false;
    })
  }

  async presentAlertSuccess(msg: string, header: string, subHeader: string) {
    const alert = await this.alertController.create({
      header:header,
      subHeader: subHeader,
      message: msg,
      buttons: [{
        text: "Okay",
        handler:() =>{
          this.router.navigate(['home']);
        }
      }]
    });
  
    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position:'top',
      duration: 4000
    });
    toast.present();
  }

  async startScan(){
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.body.classList.add("qrscanner");
    const result = await BarcodeScanner.startScan();
    document.body.classList.remove("qrscanner"); 
    if (result.hasContent) {
      this.presentToast(result.content);
      this.scan(result.content);
    }
  }

  async stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }
  async scan(id){
    let loading = await this.loadingController.create({
      message:"Please wait...",
    });
    await loading.present();
    let today = moment().add(1, 'day').format("YYYY-MM-DD");
    let totalPrice = this.products['amount'] * this.products['discountedPrice'];
    let body = {
      today: today,
      price: totalPrice
    }

    console.log(body);
    this.presentToast(today);

    this.orderDeliveredSub =   this.http.put(environment.API +'/deliver/'+ id, body).subscribe(async (done) =>{
        console.log(done);

       this.subOrderDeleteSub = this.http.delete(environment.API + '/suborder/'+this.subId)
       .subscribe(async (data) =>{
        await loading.dismiss();
        this.presentAlertSuccess("Order Successfully Delivered!", "Success", "Order Completed");
        
       })
      }, async(error) =>{
        console.log(error);
        await loading.dismiss();

    this.presentToast("Something went wrong.");

        
      },async()=>{
        await loading.dismiss();

      })
      
    
  }

}