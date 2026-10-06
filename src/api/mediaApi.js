import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY

/* ==========================================================================
   1. PHOTOS SEARCH (Unsplash -> Pixabay Fallback)
   ========================================================================== */
export async function fetchPhotos(query, page = 1, per_page = 20) {
  // Primary: Unsplash API
  try {
    const res = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query, page, per_page },
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    })
    if (res.data?.results?.length > 0) {
      return res.data.results.map((item) => ({
        id: `unsplash-${item.id}`,
        type: 'photo',
        title: item.alt_description || item.description || `${query} Photo`,
        thumbnail: item.urls.small,
        src: item.urls.regular || item.urls.full,
        url: item.links.html
      }))
    }
  } catch (err) {
    console.warn('Unsplash API notice:', err.message)
  }

  // Backup: Pixabay Photo API
  try {
    const res = await axios.get('https://pixabay.com/api/', {
      params: { key: PIXABAY_KEY, q: query, image_type: 'photo', per_page }
    })
    if (res.data?.hits?.length > 0) {
      return res.data.hits.map((item) => ({
        id: `pixabay-photo-${item.id}`,
        type: 'photo',
        title: item.tags || `${query} Photo`,
        thumbnail: item.webformatURL,
        src: item.largeImageURL || item.webformatURL,
        url: item.pageURL
      }))
    }
  } catch (err) {
    console.warn('Pixabay photo API notice:', err.message)
  }

  return Array.from({ length: 10 }).map((_, i) => ({
    id: `photo-fallback-${query}-${i}`,
    type: 'photo',
    title: `${query} Photo #${i + 1}`,
    thumbnail: `https://picsum.photos/seed/${query}${i}/500/350`,
    src: `https://picsum.photos/seed/${query}${i}/1200/800`,
    url: 'https://unsplash.com'
  }))
}

/* ==========================================================================
   2. VIDEOS SEARCH (Pexels -> Pixabay Video Fallback)
   ========================================================================== */
export async function fetchVideos(query, per_page = 15) {
  try {
    const res = await axios.get('https://api.pexels.com/videos/search', {
      params: { query, per_page },
      headers: { Authorization: PEXELS_KEY }
    })
    if (res.data?.videos?.length > 0) {
      return res.data.videos.map((item) => ({
        id: `pexels-${item.id}`,
        type: 'video',
        title: item.user?.name ? `Video by ${item.user.name}` : `${query} Video`,
        thumbnail: item.image,
        src: item.video_files?.[0]?.link,
        url: item.url
      }))
    }
  } catch (err) {
    console.warn('Pexels API notice:', err.message)
  }

  try {
    const res = await axios.get('https://pixabay.com/api/videos/', {
      params: { key: PIXABAY_KEY, q: query, per_page }
    })
    if (res.data?.hits?.length > 0) {
      return res.data.hits.map((item) => {
        const videoObj = item.videos?.medium || item.videos?.small || item.videos?.large
        return {
          id: `pixabay-video-${item.id}`,
          type: 'video',
          title: item.tags || `${query} Video`,
          thumbnail: item.userImageURL || `https://images.pexels.com/videos/854671/free-video-854671.jpg?w=500`,
          src: videoObj?.url,
          url: item.pageURL
        }
      })
    }
  } catch (err) {
    console.warn('Pixabay video API notice:', err.message)
  }

  return Array.from({ length: 6 }).map((_, i) => ({
    id: `video-fallback-${query}-${i}`,
    type: 'video',
    title: `${query} Video #${i + 1}`,
    thumbnail: 'https://images.pexels.com/videos/854671/free-video-854671.jpg?w=500',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    url: 'https://pexels.com'
  }))
}

/* ==========================================================================
   3. GIFS SEARCH (Tenor API Primary -> Pixabay API Backup)
   ========================================================================== */
export async function fetchGIF(query, limit = 25) {
  const cleanQuery = query.toLowerCase().trim()

  // 1. Tenor API v2 using VITE_TENOR_KEY
  const keysToTry = [TENOR_KEY, 'LIVDSRZULELA'].filter(Boolean)
  for (const key of keysToTry) {
    try {
      const res = await axios.get('https://tenor.googleapis.com/v2/search', {
        params: { q: cleanQuery, key: key, client_key: 'media_search_app', limit }
      })
      if (res.data?.results?.length > 0) {
        return res.data.results.map((item) => {
          const media = item.media_formats
          const gifUrl = media?.gif?.url || media?.mediumgif?.url || media?.tinygif?.url
          const thumbUrl = media?.tinygif?.url || media?.gif?.url
          return {
            id: `tenor-${item.id}`,
            type: 'gif',
            title: item.title || item.content_description || `${query} GIF`,
            thumbnail: thumbUrl,
            src: gifUrl,
            url: item.itemurl || item.url || 'https://tenor.com'
          }
        })
      }
    } catch (err) {
      console.warn(`Tenor key notice (${key}):`, err.message)
    }
  }

  // 2. Pixabay API Search Backup
  try {
    const res = await axios.get('https://pixabay.com/api/', {
      params: { key: PIXABAY_KEY, q: cleanQuery, image_type: 'all', per_page: limit }
    })
    if (res.data?.hits?.length > 0) {
      return res.data.hits.map((item) => ({
        id: `pixabay-gif-${item.id}`,
        type: 'gif',
        title: item.tags || `${query} GIF`,
        thumbnail: item.webformatURL,
        src: item.largeImageURL || item.webformatURL,
        url: item.pageURL
      }))
    }
  } catch (err) {
    console.warn('Pixabay GIF search notice:', err.message)
  }

  return []
}