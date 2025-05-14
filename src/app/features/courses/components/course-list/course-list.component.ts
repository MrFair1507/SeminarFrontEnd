// src/app/features/courses/components/course-list/course-list.component.ts
// import { Component, OnInit } from '@angular/core';
// src/app/features/courses/components/course-list/course-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CourseService } from '../../../../core/services/course.service';
import { CartService } from '../../../../core/services/cart.service';
import { Course } from '../../../../core/models/course.model';
import { CourseCardComponent } from '../course-card/course-card.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  searchTerm: string = '';
  
  // Thêm category filter
  categories: string[] = [];
  selectedCategory: string = '';
  
  // Thêm sort options
  sortOptions = [
    { value: 'popular', label: 'Phổ biến' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-asc', label: 'Giá tăng dần' },
    { value: 'price-desc', label: 'Giá giảm dần' }
  ];
  selectedSort: string = 'popular';
  
  // Sử dụng Subject để xử lý debounce cho tìm kiếm
  private searchTerms = new Subject<string>();

  constructor(
    private courseService: CourseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Lấy tất cả khóa học ban đầu
    this.loadAllCourses();
    
    // Thiết lập debounce cho tìm kiếm
    this.searchTerms.pipe(
      // Đợi 300ms sau khi người dùng ngừng gõ
      debounceTime(300),
      // Bỏ qua nếu chuỗi tìm kiếm không thay đổi
      distinctUntilChanged(),
      // Chuyển sang Observable mới để tìm kiếm
      switchMap(term => this.courseService.searchCourses(term))
    ).subscribe(courses => {
      this.courses = this.applyCategoryFilter(this.applySorting(courses));
    });
  }

  // Kích hoạt tìm kiếm
  search(): void {
    this.searchTerms.next(this.searchTerm);
  }
  
  // Lấy tất cả khóa học và danh sách danh mục
  loadAllCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      
      // Lấy danh sách danh mục duy nhất
      const categoriesSet = new Set<string>();
      courses.forEach(course => categoriesSet.add(course.category));
      this.categories = Array.from(categoriesSet);
    });
  }
  
  // Xử lý khi thay đổi danh mục
  onCategoryChange(): void {
    this.applyFilters();
  }
  
  // Xử lý khi thay đổi sắp xếp
  onSortChange(): void {
    this.applyFilters();
  }
  
  // Áp dụng tất cả bộ lọc
  applyFilters(): void {
    // Nếu có chuỗi tìm kiếm, sử dụng searchCourses
    if (this.searchTerm.trim()) {
      this.searchTerms.next(this.searchTerm);
    } else {
      // Nếu không, lấy tất cả khóa học và áp dụng bộ lọc
      this.courseService.getCourses().subscribe(courses => {
        this.courses = this.applyCategoryFilter(this.applySorting(courses));
      });
    }
  }
  
  // Lọc theo danh mục
  private applyCategoryFilter(courses: Course[]): Course[] {
    if (!this.selectedCategory) {
      return courses;
    }
    return courses.filter(course => course.category === this.selectedCategory);
  }
  
  // Sắp xếp khóa học
  private applySorting(courses: Course[]): Course[] {
    switch(this.selectedSort) {
      case 'price-asc':
        return [...courses].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...courses].sort((a, b) => b.price - a.price);
      case 'newest':
        // Giả định có trường createdAt hoặc id để sắp xếp
        return [...courses].sort((a, b) => b.id - a.id);
      case 'popular':
      default:
        // Sắp xếp theo rating
        return [...courses].sort((a, b) => b.rating - a.rating);
    }
  }

  addToCart(course: Course): void {
    this.cartService.addToCart(course);
  }
}