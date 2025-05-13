import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CartContainerComponent } from './components/cart-container/cart-container.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    CartContainerComponent,
    CartItemComponent,
    CartSummaryComponent
  ]
})
export class CartModule { }