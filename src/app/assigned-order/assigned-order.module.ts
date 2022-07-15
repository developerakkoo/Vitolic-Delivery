import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignedOrderPageRoutingModule } from './assigned-order-routing.module';

import { AssignedOrderPage } from './assigned-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignedOrderPageRoutingModule
  ],
  declarations: [AssignedOrderPage]
})
export class AssignedOrderPageModule {}
