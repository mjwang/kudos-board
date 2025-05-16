const apiUrl = import.meta.env.VITE_API_URL

export async function getBoards() {
  const getBoardsUrl = new URL('/boards', apiUrl)

  const data = await fetch(getBoardsUrl, {
    method: 'GET',
  })

  if (data.status === 200) {
    return data.json()
  }

  return {}
}
