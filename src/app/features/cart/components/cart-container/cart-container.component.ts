import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../core/models/cart-item.model';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-cart-container',
  standalone: true,
  imports: [CommonModule, CartItemComponent, CartSummaryComponent, ButtonComponent],
  templateUrl: './cart-container.component.html',
  styleUrl: './cart-container.component.css'
})
export class CartContainerComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.getTotal().subscribe(total => {
      this.total = total;
    });
  }

  updateQuantity(event: {id: number, quantity: number}): void {
    this.cartService.updateQuantity(event.id, event.quantity);
  }

  removeItem(courseId: number): void {
    this.cartService.removeFromCart(courseId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
