export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  instructor: string;
  duration: string; // Ví dụ: "10 hours"
}