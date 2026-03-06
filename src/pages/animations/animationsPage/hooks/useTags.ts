import { useEffect, useState } from "react";
import axios from "axios";
import type { Tag } from "../../../../types/tag";

export function useTags(API_URL: string) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await axios.get(`${API_URL}/tags/all-tags`);
        setTags(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTags();
  }, [API_URL]);

  return { tags, isLoading };
}