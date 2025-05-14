// src/app/core/services/user-course.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserCourse } from '../models/user-course.model';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class UserCourseService {
  private userCourses: UserCourse[] = [];
  private userCoursesSubject = new BehaviorSubject<UserCourse[]>(this.userCourses);

  constructor() {
    // In a real app, you would load this from a backend/localStorage
    const savedCourses = localStorage.getItem('userCourses');
    if (savedCourses) {
      this.userCourses = JSON.parse(savedCourses);
      this.userCoursesSubject.next(this.userCourses);
    }
  }

  getUserCourses(): Observable<UserCourse[]> {
    return this.userCoursesSubject.asObservable();
  }

  addPurchasedCourses(courses: Course[], userId: string = 'user123'): void {
    const now = new Date();
    
    courses.forEach(course => {
      // Check if the course is already purchased
      const existingCourse = this.userCourses.find(
        uc => uc.userId === userId && uc.courseId === course.id
      );
      
      if (!existingCourse) {
        this.userCourses.push({
          userId: userId,
          courseId: course.id,
          purchaseDate: now,
          completionStatus: 0
        });
      }
    });
    
    // Save to localStorage in this example (in real app, would be sent to backend)
    localStorage.setItem('userCourses', JSON.stringify(this.userCourses));
    this.userCoursesSubject.next([...this.userCourses]);
  }

  updateCourseProgress(courseId: number, progress: number, userId: string = 'user123'): void {
    const course = this.userCourses.find(
      uc => uc.userId === userId && uc.courseId === courseId
    );
    
    if (course) {
      course.completionStatus = progress;
      localStorage.setItem('userCourses', JSON.stringify(this.userCourses));
      this.userCoursesSubject.next([...this.userCourses]);
    }
  }
}