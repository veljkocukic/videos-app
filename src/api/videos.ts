import videos from '../data/videos.json'

export const fetchVideos = async ({
    page = 1,
    limit = 12,
    query = '',
    category = 'All',
  }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredVideos = videos.filter(video => {
      const matchesQuery = !query || video.label.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category==='All' || video.category === category;
      return matchesQuery && matchesCategory 
    });
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const hasMore = endIndex < filteredVideos.length;
    
    const paginatedVideos = filteredVideos.slice(startIndex, endIndex);
  
    return {
      videos: paginatedVideos,
      hasMore,
      total: filteredVideos.length,
      currentPage: page
    };
  };