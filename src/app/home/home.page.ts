import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as  moment from 'moment';
import { ModalController } from '@ionic/angular';
import { OrderDetailPage } from '../order-detail/order-detail.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  orders = []

  today = "2023-02-07";
  getCartSub:Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalController: ModalController,
    private io: Socket) {
      this.io.connect();
      this.today = moment().format('YYYY-MM-DD');
      this.getAllCart(this.today);
    }

    ionViewDidLeave(){
      console.log("Home leave");
      this.getCartSub.unsubscribe();
    }

    dateEvent(ev){
      console.log(ev.detail.value);
      
    }


    getAllCart(today){
     this.getCartSub =  
     this.http.get(environment.API +`/suborder/2023-03-09/422101`)
      .subscribe(async (order) =>{
        console.log(order);
        this.orders = order['sub'];
        
      }, async(error) =>
      {
        console.log(error);
        
      })

    }
    handleRefresh(event) {
      setTimeout(() => {
        // Any calls to load data go here`
        event.target.complete();
        this.getAllCart(this.today);
      }, 2000);
    };

    async presentModal(order) {
      const modal = await this.modalController.create({
      component: OrderDetailPage,
      componentProps: { mainOrderId: order.mainOrderId, orderId: order._id }
      });
    
      await modal.present();
    
    }

    orderDetails(order){
      this.presentModal(order)
      // this.router.navigate(['order-detail', order.mainOrderId, order._id]);
    }

    cancel() {
    }
  
    confirm() {
    }
  
    onWillDismiss(event: any) {
      const ev = event as CustomEvent<string>;
      
    }
  }
