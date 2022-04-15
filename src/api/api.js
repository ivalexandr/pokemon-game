//---------firebase api---------

const getDataFromDatabase = async (uid, idToken) => {
  try {
    const url = `https://pokemon-game-793c9-default-rtdb.firebaseio.com/${uid}/pokemons.json?auth=${idToken}`
    const res = await fetch(url)
    if (!res.ok) return Promise.reject('Загрузка покемонов не удалась')
    return await res.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

const pushDataFromDatabase = async (item, localId, idToken) => {
  try {
    const res = await fetch(`https://pokemon-game-793c9-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${idToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
  })
  if (!res.ok) return Promise.reject('Добавление карточки не удалось')
  } catch (error) {
    return Promise.reject(error)
  }
}

const registerUser = async data => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) return Promise.reject('Ошибка при регистрации')

    const userData = await res.json()
    const resPokemons = await getStartPackPokemons()

    resPokemons.data.forEach(async item => {
      await fetch(`https://pokemon-game-793c9-default-rtdb.firebaseio.com/${userData.localId}/pokemons.json?auth=${userData.idToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })
    })
    return userData
  } catch (error) {
    return Promise.reject(error)
  }
}

const authUser = async data => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) return Promise.reject('Ошибка при авторизации')
    return await res.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

const refreshUser = async () => {
  const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_API_KEY}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refreshToken: localStorage.getItem('refreshToken')
      })
    })
    if (!res.ok) return Promise.reject('Ошибка обновления пользователя')
    return await res.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

const getUser = async () => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({idToken: localStorage.getItem('idToken')})
    })
    if (!res.ok) return Promise.reject('Получение пользователя не удалось')
    return await res.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

//-------game api-------

const getBoard = async () => {
  try {
    const url = new URL('api/board', process.env.REACT_APP_BASE_BACKEND_URL)
    const res = await fetch(url)
    if(!res.ok) throw new Error('Запрос не удался')
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

const getPlayerTwoCard = async () => {
  try {
    const url = new URL('api/create-player', process.env.REACT_APP_BASE_BACKEND_URL)
    const res = await fetch(url)
    if(!res.ok) throw new Error('Запрос не удался')
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

const setCardOnBoard = async data => {
  try {
    const url = new URL('api/players-turn', process.env.REACT_APP_BASE_BACKEND_URL)
    const res = await fetch(url, {
      method:'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if(!res.ok) throw new Error('Запрос не удался')
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

const getStartPackPokemons = async () => {
  const url = 'https://reactmarathon-api.herokuapp.com/api/pokemons/starter'
  try {
    const res = await fetch(url)
    if (!res.ok) return Promise.reject('Ошибка запроса покемонов') 
    return await res.json()

  } catch (error) {
    return Promise.reject(error) 
  }
}

export { 
  getDataFromDatabase,
  pushDataFromDatabase,
  registerUser,
  authUser,
  refreshUser,
  getUser,
  getBoard,
  getPlayerTwoCard,
  setCardOnBoard,
}