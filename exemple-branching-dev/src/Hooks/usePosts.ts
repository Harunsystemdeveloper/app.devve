import { useEffect, useState } from "react";
import { getPosts } from "../api";
import type { Post } from "../api";

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { posts, setPosts, loading };
}

