import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assigned-order',
  templateUrl: './assigned-order.page.html',
  styleUrls: ['./assigned-order.page.scss'],
})
export class AssignedOrderPage implements OnInit {


  ngOnInit() {
  }

  constructor(private router:Router) { }

  
  Order(){
    this.router.navigate(['order-detail'])
  }

}
