import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCourseService } from '../../core/services/user-course.service';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../core/models/course.model';
import { UserCourse } from '../../core/models/user-course.model';
import { CourseCardComponent } from '../courses/components/course-card/course-card.component';

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, CourseCardComponent], // Add RouterModule here
  templateUrl: 'my-courses.component.html',
  styleUrl: 'my-courses.component.css',
})
export class MyCoursesComponent implements OnInit {
  userCourses: UserCourse[] = [];
  courseDetails: Course[] = [];

  constructor(
    private userCourseService: UserCourseService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.userCourseService.getUserCourses().subscribe((userCourses) => {
      this.userCourses = userCourses;
      this.loadCourseDetails();
    });
  }

  private loadCourseDetails(): void {
    this.courseService.getCourses().subscribe((allCourses) => {
      this.courseDetails = this.userCourses
        .map((uc) => {
          const course = allCourses.find((c) => c.id === uc.courseId);
          return course!;
        })
        .filter((course) => course !== undefined);
    });
  }
  getCompletionStatus(courseId: number): number {
    const course = this.userCourses.find((uc) => uc.courseId === courseId);
    return course?.completionStatus || 0;
  }

  getProgressWidth(courseId: number): number {
    return this.getCompletionStatus(courseId);
  }
}
