// Ví dụ cho src/app/features/dashboard/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../../../core/services/course.service';
import { Course } from '../../../../core/models/course.model';
import { CourseCardComponent } from '../../../courses/components/course-card/course-card.component';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CourseCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  featuredCourses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      console.log('Courses loaded:', courses); // Thêm log để kiểm tra
      this.featuredCourses = courses.slice(0, 3);
    });
  }

  addToCart(course: Course): void {
    this.cartService.addToCart(course);
  }
}