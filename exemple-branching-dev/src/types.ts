export interface User {
  id: number;
  username: string;
  role: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  categoryId: number;
  user?: User;
  category?: Category;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  user?: User;
}

export interface UserLogin {
  username: string;
  password: string;
}

