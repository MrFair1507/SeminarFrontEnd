// src/app/features/cart/components/cart-summary/cart-summary.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CartService } from '../../../../core/services/cart.service';
import { UserCourseService } from '../../../../core/services/user-course.service';
import { CartItem } from '../../../../core/models/cart-item.model';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent {
  @Input() total: number = 0;
  @Input() cartItems: CartItem[] = [];
  
  constructor(
    private cartService: CartService,
    private userCourseService: UserCourseService,
    private router: Router
  ) {}
  
  checkout(): void {
    // Add the purchased courses to the user's courses
    const coursesToAdd = this.cartItems.map(item => item.course);
    this.userCourseService.addPurchasedCourses(coursesToAdd);
    
    // Clear the cart
    this.cartService.clearCart();
    
    // Navigate to the user's courses page
    this.router.navigate(['/my-courses']);
    
    // You could also show a success message here
    alert('Thanh toán thành công! Khóa học đã được thêm vào tài khoản của bạn.');
  }
}