import { useState } from 'react';
import { Filter } from './components/Filter';
import { Search } from './components/Search';
import { VideoCard } from './components/VideoCard';
import { useDebounce } from './hooks/useDebounce';
import { Loader } from './components/Loader';
import { useVideos } from './hooks/useVideos';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState('All');
  const debouncedQuery = useDebounce(searchInput, 500);

  const {
    videos,
    loading,
    error,
    hasMore,
    ref
  } = useVideos({
    query: debouncedQuery,
    category,
    perPage: 12
  });

  return (
    <div className="wrapper">
      <div className="top-container">
        <Search onSearch={setSearchInput} value={searchInput} />
        <Filter category={category} setCategory={setCategory} />
      </div>

      <div className="videos-container">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            link={video.link}
            label={video.label}
            preview={video.preview}
          />
        ))}

        {loading && (
          <Loader />
        )}

        {error && (
          <div className="error">{error}</div>
        )}

        {hasMore && !loading && (
          <div ref={ref} className="load-more-trigger" />
        )}
      </div>
    </div>
  );
}

export default App;