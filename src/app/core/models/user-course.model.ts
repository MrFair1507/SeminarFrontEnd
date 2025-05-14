export interface UserCourse {
  userId: string;
  courseId: number;
  purchaseDate: Date;
  completionStatus?: number; 
}