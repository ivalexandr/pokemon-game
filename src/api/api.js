import { initializeApp } from 'firebase/app'
import { getDatabase, set, get, child, ref, push } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCjYEDnImrYPVhHPIUY261m3l5ZgTi6qtc",
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

//-------game api-------
const BASE_URL = 'https://reactmarathon-api.netlify.app';

const getBoard = async () => {
  try {
    const url = new URL('api/board', BASE_URL)
    const res = await fetch(url)
    if(!res.ok) throw new Error('Запрос не удался')
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

const getPlayerTwoCard = async () => {
  try {
    const url = new URL('api/create-player', BASE_URL)
    const res = await fetch(url)
    if(!res.ok) throw new Error('Запрос не удался')
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

const setCardOnBoard = async data => {
  try {
    const url = new URL('api/players-turn', BASE_URL)
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
  getBoard,
  getPlayerTwoCard,
  setCardOnBoard
}