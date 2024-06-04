

export function useWriteIPFS(gameName: string, description: string, gameURL: string) {

  let body = {
    name: gameName,
    description: description,
    gameUrl: gameURL
  }

  let url = `/api`


  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body)
  })

}