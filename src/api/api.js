import { initializeApp } from 'firebase/app'
import { getDatabase, set, get, child, ref, push } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "pokemon-game-793c9.firebaseapp.com",
  projectId: "pokemon-game-793c9",
  storageBucket: "pokemon-game-793c9.appspot.com",
  messagingSenderId: "498121446672",
  appId: "1:498121446672:web:6efe413884709e31a10195"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

//---------firebase api---------

const getDataFromDatabase = async () => {
  try {
    const refDb = ref(database)
    const res = await get(child(refDb, 'pokemons/'))
    return await res.val()
  } catch (error) {
    console.error(error)
  }
}

const updateDataFromDatabase = async (data, key) => {
  try {
    await set(ref(database, 'pokemons/' + key), data)
  } catch (error) {
    console.error(error)
  }
}

const pushDataFromDatabase = async data => {
  const refDb = ref(database)
  try {
    const newKey = push(child(refDb, 'pokemons/')).key
    await updateDataFromDatabase(data, newKey)
  } catch (error) {
    console.error(error)
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
    return await res.json()
  } catch (error) {
    return Promise.reject('Ошибка при регистрации')
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
    return Promise.reject('Ошибка при авторизации')
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

export { 
  getDataFromDatabase,
  updateDataFromDatabase,
  pushDataFromDatabase,
  registerUser,
  authUser,
  getBoard,
  getPlayerTwoCard,
  setCardOnBoard
}