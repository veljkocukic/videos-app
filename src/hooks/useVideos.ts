import { useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchVideos } from '../api/videos';

export const useVideos = ({
  query,
  category,
  perPage = 12
}: UseVideosParams): UseVideosReturn => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500
  });

  const loadVideos = useCallback(async (reset = false) => {
    try {
      if (loading) return;

      setLoading(true);
      setError(null);

      const pageToLoad = reset ? 1 : currentPage;

      const response = await fetchVideos({
        page: pageToLoad,
        limit: perPage,
        query,
        category,
      });

      setHasMore(response.hasMore);

      if (reset) {
        setVideos(response.videos);
        setCurrentPage(2);
      } else {
        setVideos(prev => [...prev, ...response.videos]);
        setCurrentPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to load videos. Please try again.');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, query, category, loading, perPage]);

  useEffect(() => {
    loadVideos(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category]);

  // Load more when bottom is reached
  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadVideos(false);
    }
  }, [inView, loading, hasMore, loadVideos]);

  return {
    videos,
    loading,
    error,
    hasMore,
    resetVideos: () => loadVideos(true),
    loadMoreVideos: () => loadVideos(false),
    ref 
  };
};


interface Video {
    id: any;
    link: string;
    label: string;
      preview: string;
  }
  
  interface UseVideosParams {
    query: string;
    category: string;
    perPage?: number;
  }
  
  interface UseVideosReturn {
    videos: Video[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    resetVideos: () => Promise<void>;
    loadMoreVideos: () => Promise<void>;
    ref:any
  }