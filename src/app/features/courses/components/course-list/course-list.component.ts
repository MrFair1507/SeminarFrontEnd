import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../../core/services/course.service';
import { CartService } from '../../../../core/services/cart.service';
import { Course } from '../../../../core/models/course.model';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  addToCart(course: Course): void {
    this.cartService.addToCart(course);
  }
}