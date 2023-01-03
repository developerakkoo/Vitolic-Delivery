import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as  moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  orders = []

  today;

  constructor(
    private http: HttpClient,
    private router: Router,
    private io: Socket) {
      this.io.connect();
      this.today = moment().format('YYYY-MM-DD');
      this.getAllCart(this.today);
    }

    getAllCart(today){
      this.http.get(environment.API +`/cart/delivery/${today}`)
      .subscribe(async (order) =>{
        console.log(order);
        this.orders = order['cart'];
        
      }, async(error) =>
      {
        console.log(error);
        
      })

    }

    orderDetails(order){
      this.router.navigate(['order-detail', order._id]);
    }
  }
