import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignedOrderPage } from './assigned-order.page';

const routes: Routes = [
  {
    path: '',
    component: AssignedOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignedOrderPageRoutingModule {}
