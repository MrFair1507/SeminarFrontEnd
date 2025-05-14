import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Course } from '../../../../core/models/course.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnChanges {
  @Input() course!: Course;
  @Output() addToCart = new EventEmitter<Course>();
   @Input() showAddToCart: boolean = true
  
  // Thêm biến để kiểm tra thay đổi
  courseSnapshot: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      // Xử lý khi đầu vào course thay đổi
      console.log('Course changed:', changes['course'].currentValue);
      
      // Lưu lại snapshot để so sánh sau này
      this.courseSnapshot = JSON.stringify(this.course);
      
      // Ví dụ: có thể thực hiện tính toán hoặc logic nào đó khi course thay đổi
      // Ví dụ: cập nhật thông tin hiển thị hoặc thêm logic business
    }
  }

  addCourseToCart(): void {
    this.addToCart.emit(this.course);
  }
}