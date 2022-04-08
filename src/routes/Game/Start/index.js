import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { StartContext } from '../../../context/Start'
import { getDataFromDatabase } from '../../../api/api'
import { Layout } from '../../../components/Layout'
import { PokemonCard } from '../../../components/PokemonCard'
import s from './style.module.css'

const Start = () => {
  const [ pokemons, setPokemons ] = useState({})
  const startPokemons = useContext(StartContext)
  const navigate = useNavigate()
  useEffect(() => {
    getDataFromDatabase()
    .then(data => setPokemons(data))
    .catch(error => {throw new Error(error)})
  }, [])

  const clickHandler = id => {
    setPokemons(prev => {
      return Object.entries(prev).reduce((acc, item) => {
        const pokemon = {...item[1]}
        if (pokemon.id === id) {
          pokemon.isSelected = true
        }
        acc[item[0]] = pokemon
        return acc
      }, {})
    })
    startPokemons.addPlayer1Pokemons(
      Object.values(pokemons).filter(item => item.id === id)[0]
    )
  }

  const clickStartHandler = () => {
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
          <button onClick={clickStartHandler}>Start game</button>
        </div>
    </Layout>
  )
}

export { Start }