import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../core/services/course.service';
import { CartService } from '../../../../core/services/cart.service';
import { Course } from '../../../../core/models/course.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course?: Course;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.course = this.courseService.getCourseById(id);
      }
    });
  }

  addToCart(): void {
    if (this.course) {
      this.cartService.addToCart(this.course, this.quantity);
    }
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}