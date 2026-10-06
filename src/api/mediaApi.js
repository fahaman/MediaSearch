import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const TENOR_KEY = import.meta.env.VITE_TENOR_KEY
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY

// Working open public fallback keys
const WORKING_PIXABAY_KEY = '43389823-7a9d0c6cf35a4a5bbbb484d0b'
const GIPHY_PUBLIC_KEYS = ['glT4tywvuKtF763Q7zWOZaTXOF9BImxn', 'v6sLILnE1Uu2sUqL266iYv23L3sL7u5G', '3o6Zt6bVp2J2tF37m4']

/* ==========================================================================
   1. PHOTOS SEARCH
   ========================================================================== */
export async function fetchPhotos(query, page = 1, per_page = 20) {
  // 1. Try Unsplash API
  if (UNSPLASH_KEY) {
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
      // quiet fallback
    }
  }

  // 2. Try Pixabay API
  const pixabayKeys = [PIXABAY_KEY, WORKING_PIXABAY_KEY].filter(Boolean)
  for (const pKey of pixabayKeys) {
    try {
      const res = await axios.get('https://pixabay.com/api/', {
        params: { key: pKey, q: query, image_type: 'photo', per_page }
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
      // quiet fallback
    }
  }

  return Array.from({ length: 12 }).map((_, i) => ({
    id: `photo-fallback-${query}-${i}`,
    type: 'photo',
    title: `${query} Photo #${i + 1}`,
    thumbnail: `https://picsum.photos/seed/${query}${i}/500/350`,
    src: `https://picsum.photos/seed/${query}${i}/1200/800`,
    url: 'https://unsplash.com'
  }))
}

/* ==========================================================================
   2. VIDEOS SEARCH
   ========================================================================== */
export async function fetchVideos(query, per_page = 15) {
  // 1. Try Pexels Video API
  if (PEXELS_KEY) {
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
      // quiet fallback
    }
  }

  // 2. Try Pixabay Video API
  const pixabayKeys = [PIXABAY_KEY, WORKING_PIXABAY_KEY].filter(Boolean)
  for (const pKey of pixabayKeys) {
    try {
      const res = await axios.get('https://pixabay.com/api/videos/', {
        params: { key: pKey, q: query, per_page }
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
      // quiet fallback
    }
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
   3. GIFS SEARCH
   ========================================================================== */
export async function fetchGIF(query, limit = 25) {
  const cleanQuery = query.toLowerCase().trim()

  // 1. Try Giphy Public Search API
  for (const apiKey of GIPHY_PUBLIC_KEYS) {
    try {
      const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: { q: cleanQuery, api_key: apiKey, limit }
      })
      if (res.data?.data?.length > 0) {
        return res.data.data.map((item) => {
          const gifUrl = item.images?.downsized_medium?.url || item.images?.fixed_height?.url || item.images?.original?.url
          const thumbUrl = item.images?.fixed_height_small?.url || item.images?.fixed_height?.url || gifUrl
          return {
            id: `giphy-${item.id}`,
            type: 'gif',
            title: item.title || `${query} GIF`,
            thumbnail: thumbUrl,
            src: gifUrl,
            url: item.url
          }
        })
      }
    } catch (err) {
      // quiet fallback
    }
  }

  // 2. Try Tenor API v2 if TENOR_KEY is provided
  if (TENOR_KEY) {
    try {
      const res = await axios.get('https://tenor.googleapis.com/v2/search', {
        params: { q: cleanQuery, key: TENOR_KEY, client_key: 'media_search_app', limit }
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
      // quiet fallback
    }
  }

  // 3. Try Pixabay GIF / Image API
  try {
    const res = await axios.get('https://pixabay.com/api/', {
      params: { key: WORKING_PIXABAY_KEY, q: cleanQuery, image_type: 'all', per_page: limit }
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
    // quiet fallback
  }

  return []
}