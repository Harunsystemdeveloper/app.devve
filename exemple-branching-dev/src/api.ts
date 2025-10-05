// src/api.ts
export interface User {
  id: number;
  username: string;
  role: string;
}

export interface UserLogin {
  username: string;
  password: string;
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

const API_URL = "https://localhost:5001";

// AUTH
export async function register(user: { username: string; password: string }): Promise<User> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Registrering misslyckades");
  return res.json();
}

export async function login(credentials: UserLogin): Promise<User> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login misslyckades");
  return res.json();
}

// POSTS
export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Kunde inte hämta inlägg");
  return res.json();
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Kunde inte hämta inlägg");
  return res.json();
}

export async function createPost(post: Partial<Post>): Promise<Post> {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Kunde inte skapa inlägg");
  return res.json();
}

export async function updatePost(id: number, post: Partial<Post>): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error("Kunde inte uppdatera inlägg");
  return res.json();
}

export async function deletePost(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Kunde inte ta bort inlägg");
}

// CATEGORIES
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Kunde inte hämta kategorier");
  return res.json();
}

// COMMENTS
export async function getComments(postId: number): Promise<Comment[]> {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Kunde inte hämta kommentarer");
  return res.json();
}


