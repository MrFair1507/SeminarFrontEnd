import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseCardComponent } from './components/course-card/course-card.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    CourseListComponent,
    CourseDetailComponent,
    CourseCardComponent
  ]
})
export class CoursesModule { }