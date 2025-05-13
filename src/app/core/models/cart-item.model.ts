import { Course } from "./course.model";

export interface CartItem {
  course: Course;
  quantity: number;
}