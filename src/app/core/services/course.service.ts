import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      title: 'Lập trình JavaScript cơ bản đến nâng cao',
      description:
        'Khóa học toàn diện về JavaScript từ kiến thức cơ bản đến nâng cao, giúp bạn làm chủ ngôn ngữ lập trình phổ biến nhất thế giới.',
      price: 1290000,
      imageUrl: 'https://placehold.co/400x250',
      category: 'Lập trình web',
      rating: 4.8,
      instructor: 'Nguyễn Văn A',
      duration: '42 giờ',
    },
    {
      id: 2,
      title: 'Angular - Từ cơ bản đến ứng dụng thực tế',
      description:
        'Học Angular từ đầu và xây dựng ứng dụng thực tế với framework mạnh mẽ này của Google.',
      price: 1490000,
      imageUrl: 'https://placehold.co/400x250',
      category: 'Lập trình front-end',
      rating: 4.9,
      instructor: 'Trần Thị B',
      duration: '36 giờ',
    },
    {
      id: 3,
      title: 'Thiết kế UI/UX chuyên nghiệp',
      description:
        'Khóa học giúp bạn nắm vững nguyên tắc thiết kế UI/UX và tạo ra sản phẩm đẹp, thân thiện với người dùng.',
      price: 990000,
      imageUrl: 'https://placehold.co/400x250',
      category: 'Thiết kế',
      rating: 4.7,
      instructor: 'Lê Văn C',
      duration: '28 giờ',
    },
    {
      id: 4,
      title: 'Node.js và Express - Xây dựng REST API',
      description:
        'Học cách xây dựng REST API với Node.js và Express, tạo nền tảng cho ứng dụng web hiện đại.',
      price: 1390000,
      imageUrl: 'https://placehold.co/400x250',
      category: 'Lập trình back-end',
      rating: 4.6,
      instructor: 'Phạm Thị D',
      duration: '32 giờ',
    },
    {
      id: 5,
      title: 'Machine Learning cơ bản',
      description:
        'Nhập môn Machine Learning với Python, từ lý thuyết đến thực hành với các bài toán thực tế.',
      price: 1690000,
      imageUrl: 'https://placehold.co/400x250',
      category: 'AI & Machine Learning',
      rating: 4.9,
      instructor: 'Hoàng Văn E',
      duration: '45 giờ',
    },
    {
      id: 6,
      title: 'React.js và Redux',
      description:
        'Xây dựng ứng dụng single-page với React.js và quản lý state với Redux.',
      price: 1390000,
      imageUrl: 'https://placehold.co/400x250',
      category: 'Lập trình front-end',
      rating: 4.8,
      instructor: 'Ngô Thị F',
      duration: '38 giờ',
    },
  ];

   private coursesSubject = new BehaviorSubject<Course[]>(this.courses);

  constructor() {}

  getCourses(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }
  
  // Thêm phương thức tìm kiếm
  searchCourses(term: string): Observable<Course[]> {
    // Nếu chuỗi tìm kiếm trống, trả về tất cả khóa học
    if (!term.trim()) {
      return this.getCourses();
    }

    // Chuẩn hóa chuỗi tìm kiếm (chuyển về chữ thường và loại bỏ dấu tiếng Việt)
    const normalizedTerm = this.normalizeString(term);

    // Sử dụng pipe và map để lọc kết quả
    return this.getCourses().pipe(
      map((courses: Course[]) =>
        courses.filter((course: Course) => {
          // Chuẩn hóa các trường cần tìm kiếm
          const normalizedTitle = this.normalizeString(course.title);
          const normalizedDescription = this.normalizeString(
            course.description
          );
          const normalizedInstructor = this.normalizeString(course.instructor);
          const normalizedCategory = this.normalizeString(course.category);

          // Tìm kiếm trong nhiều trường
          return (
            normalizedTitle.includes(normalizedTerm) ||
            normalizedDescription.includes(normalizedTerm) ||
            normalizedInstructor.includes(normalizedTerm) ||
            normalizedCategory.includes(normalizedTerm)
          );
        })
      )
    );
  }

  // Hàm chuẩn hóa chuỗi (loại bỏ dấu tiếng Việt và chuyển thành chữ thường)
  private normalizeString(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }
}
