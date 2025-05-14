import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Observable, Subscription } from 'rxjs';
import { VndCurrencyPipe } from '../../../shared/pipes/vnd-currency.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, VndCurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  @Output() sidebarToggle = new EventEmitter<void>();
  
  cartTotal$!: Observable<number>;
  
  // Thêm biến subscription để quản lý subscription
  private cartItemsSubscription!: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.getTotal();
    
    // Lưu subscription để có thể hủy sau này
    this.cartItemsSubscription = this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  // Thêm ngOnDestroy để dọn dẹp subscription khi component bị hủy
  ngOnDestroy(): void {
    // Hủy đăng ký subscription để tránh memory leak
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
    
    console.log('HeaderComponent destroyed - cleaned up subscriptions');
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}