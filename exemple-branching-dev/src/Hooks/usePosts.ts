// src/hooks/usePosts.ts
import { useState, useEffect } from "react";
import type { Post } from "../types";
import { getPosts } from "../api";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(data => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading, setPosts };
}
