import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartContainerComponent } from './components/cart-container/cart-container.component';

const routes: Routes = [
  {
    path: '',
    component: CartContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }