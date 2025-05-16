const apiUrl = import.meta.env.VITE_API_URL

const boardsUrl = new URL('/boards', apiUrl)

export async function getBoards() {
  const data = await fetch(boardsUrl, {
    method: 'GET',
  })

  if (data.status === 200) {
    return data.json()
  }

  return {}
}

export async function deleteBoard(id) {
  const deleteBoardsUrl = `${boardsUrl}/${id}`

  const data = await fetch(deleteBoardsUrl, {
    method: 'DELETE',
  })

  if (data.status === 200) {
    return data.json()
  } else {
    return data.error()
  }
}

export async function createBoard(title, author, category) {
  const data = await fetch(boardsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      category,
      author,
    }),
  })

  if (data.status === 204) {
    return data.json()
  }
}
