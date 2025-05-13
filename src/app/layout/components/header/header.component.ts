import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Observable } from 'rxjs';
import { VndCurrencyPipe } from '../../../shared/pipes/vnd-currency.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, VndCurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
  @Output() sidebarToggle = new EventEmitter<void>();
  
  // Di chuyển khai báo này xuống dưới, sau khi inject CartService
  cartTotal$!: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.getTotal();
    
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}