import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../../../core/models/cart-item.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { VndCurrencyPipe } from '../../../../shared/pipes/vnd-currency.pipe';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, VndCurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() quantityChanged = new EventEmitter<{id: number, quantity: number}>();
  @Output() removed = new EventEmitter<number>();

  decrementQuantity(): void {
    if (this.item.quantity > 1) {
      this.item.quantity--;
      this.updateQuantity();
    }
  }

  incrementQuantity(): void {
    this.item.quantity++;
    this.updateQuantity();
  }

  updateQuantity(): void {
    if (this.item.quantity < 1) {
      this.item.quantity = 1;
    }
    this.quantityChanged.emit({
      id: this.item.course.id,
      quantity: this.item.quantity
    });
  }

  removeItem(): void {
    this.removed.emit(this.item.course.id);
  }
}