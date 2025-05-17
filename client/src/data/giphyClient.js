const giphyUrl = 'https://api.giphy.com'
const giphyApiKey = import.meta.env.VITE_GIPHY_API_KEY

export async function getFirstGifySearchResult(searchQuery) {
  console.log('GIPHY URL', giphyUrl)
  const searchUrl = new URL('/v1/gifs/search', giphyUrl)
  searchUrl.searchParams.set('q', searchQuery)
  searchUrl.searchParams.set('api_key', giphyApiKey)
  searchUrl.searchParams.set('limit', 1)
  searchUrl.searchParams.set('offset', 0)
  searchUrl.searchParams.set('rating', 'g')
  searchUrl.searchParams.set('lang', 'en')
  searchUrl.searchParams.set('bundle', 'messaging_non_clips')

  const response = await fetch(searchUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const results = await response.json()
  return results.data[0].images.original.url
}
