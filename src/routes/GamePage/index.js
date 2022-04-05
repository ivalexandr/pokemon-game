import { useState } from 'react'
import { pokemonDB } from '../../database/db'
import { Layout } from '../../components/Layout'
import { PokemonCard } from '../../components/PokemonCard'
import s from './style.module.css'

const GamePage = () => {
  const [pokemons, setPokemons] = useState(pokemonDB)

  const clickHandler = id => {
    setPokemons(prev => {
      const newArr = [...prev]
      const index = newArr.findIndex(item => item.id === id)
      newArr[index].active = true
      
      return newArr
    })
  }

  return (
      <Layout
        title="Pokemon's game!"
        colorBg="#e2e2e2"
      >
        <div className={s.flex}>
          {
            pokemons.map(item => {
              return <PokemonCard 
                key={item.id}
                name={item.name}
                img={item.img}
                id={item.id}
                values={item.values}
                type={item.type}
                onClickHandler={clickHandler}
                isActive={item.active}
              />
            })
          }
        </div>
      </Layout>
  )
}

export { GamePage }