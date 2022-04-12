import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StartContext } from '../../../context/Start'
import { getDataFromDatabase } from '../../../api/api'
import { Layout } from '../../../components/Layout'
import { PokemonCard } from '../../../components/PokemonCard'
import s from './style.module.css'

const Start = () => {
  const [ pokemons, setPokemons ] = useState({})
  const [ choisePokemons, setChoisePokemons ] = useState([])
  const startPokemons = useContext(StartContext)

  const navigate = useNavigate()

  useEffect(() => {
    getDataFromDatabase()
    .then(data => setPokemons(data))
    .catch(error => {throw new Error(error)})
    return () => setChoisePokemons([])
  }, [])

  const clickHandler = id => {
    const pokemon = Object.entries(pokemons).find(item => item[1].id === id)
    if (pokemon[1].isSelected) {
      pokemon[1].isSelected = false
    } else {
      pokemon[1].isSelected = true
    }
    setPokemons(prev => ({...prev, [pokemon[0]]: {...pokemon[1]}}))
    const choisePokemon = Object.values(pokemons).filter(item => item.isSelected)
    setChoisePokemons(choisePokemon);
  }

  const clickStartHandler = () => {
    startPokemons.addPlayer1Pokemons(choisePokemons)
    navigate('board/')
  }
  
  return (
    <Layout title="Pokemon's game">
        <div className={s.flex}>
          {
            Object.entries(pokemons).map(item => {
              return (
              <div className={s.flexItem} key={item[0]}>
                  <PokemonCard 
                    name={item[1].name}
                    img={item[1].img}
                    id={item[1].id}
                    values={item[1].values}
                    type={item[1].type}
                    isActive={true}
                    onCLickHandler = {clickHandler}
                    isSelected = {item[1].isSelected}
                />
              </div>
              )
            })
          }
        </div>
        <div className={s.button}>
          <button 
            disabled={choisePokemons.length < 5 || choisePokemons.length > 5} 
            onClick={clickStartHandler}>
              Start game
            </button>
        </div>
    </Layout>
  )
}

export { Start }