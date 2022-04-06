import { useState,useEffect } from 'react'
import { getDataFromDatabase, updateDataFromDatabase, pushDataFromDatabase } from '../../../api/api'
import { Layout } from '../../../components/Layout'
import { PokemonCard } from '../../../components/PokemonCard'
import s from './style.module.css'

const Start = () => {
  const [pokemons, setPokemons] = useState({})

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
          pokemon.active = !pokemon.active
          updateDataFromDatabase(pokemon, item[0])
        }
        acc[item[0]] = pokemon
        return acc
      }, {})
    })
  }

  const clickAddHandler = async () => {
    const pokemon =  {
      "abilities": [
        "keen-eye",
        "tangled-feet",
        "big-pecks"
      ],
      "base_experience": 122,
      "height": 11,
      "weight": 300,
      "id": 17,
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
      "name": "pidgeotto",
      "stats": {
        "hp": 63,
        "attack": 60,
        "defense": 55,
        "special-attack": 50,
        "special-defense": 50,
        "speed": 71
      },
      "type": "normal",
      "values": {
        "top": 7,
        "right": 5,
        "bottom": 1,
        "left": 2
      }
    }
    await pushDataFromDatabase(pokemon)
    await getDataFromDatabase()
    .then(data => setPokemons(data))
    .catch(error => {throw new Error(error)})
  }

  return (
      <Layout
        title="Pokemon's game!"
        colorBg="#e2e2e2"
      >
        <button onClick={clickAddHandler}>Added pokemon</button>
        <div className={s.flex}>
          {
            Object.entries(pokemons).map(item => {
              return <PokemonCard 
                key={item[0]}
                name={item[1].name}
                img={item[1].img}
                id={item[1].id}
                values={item[1].values}
                type={item[1].type}
                onClickHandler={clickHandler}
                isActive={item[1].active}
              />
            })
          }
        </div>
      </Layout>
  )
}

export { Start }