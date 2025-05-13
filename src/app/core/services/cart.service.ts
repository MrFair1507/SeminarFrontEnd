import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private totalSubject = new BehaviorSubject<number>(0);

  constructor() { }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  getTotal(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  addToCart(course: Course, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.course.id === course.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ course, quantity });
    }
    
    this.updateCart();
  }

  removeFromCart(courseId: number): void {
    this.cartItems = this.cartItems.filter(item => item.course.id !== courseId);
    this.updateCart();
  }

  updateQuantity(courseId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.course.id === courseId);
    
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart(): void {
    this.cartItemsSubject.next([...this.cartItems]);
    this.calculateTotal();
  }

  private calculateTotal(): void {
    const total = this.cartItems.reduce((sum, item) => 
      sum + (item.course.price * item.quantity), 0);
    this.totalSubject.next(total);
  }
}