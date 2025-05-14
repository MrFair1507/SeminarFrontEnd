import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // src/app/layout/components/sidebar/sidebar.component.ts
  menuItems = [
    { name: 'Dashboard', icon: 'fa-solid fa-gauge-high', route: '/dashboard' },
    { name: 'Khóa học', icon: 'fa-solid fa-book-open', route: '/courses' },
    {
      name: 'Khóa học của tôi',
      icon: 'fa-solid fa-graduation-cap',
      route: '/my-courses',
    },
    { name: 'Giỏ hàng', icon: 'fa-solid fa-cart-shopping', route: '/cart' },
  ];
}
