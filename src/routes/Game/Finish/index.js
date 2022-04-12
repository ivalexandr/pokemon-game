import { useContext, useEffect, useState } from 'react'
import { StartContext } from '../../../context/Start'
import { useNavigate } from 'react-router-dom'
import { pushDataFromDatabase } from '../../../api/api'
import { Layout } from "../../../components/Layout"
import { PokemonCard } from "../../../components/PokemonCard"
import s from './style.module.css'


const FinishPage = () => {
  const startPokemons = useContext(StartContext)
  const [ player2Cards, setPlayaer2Cards ] = useState(startPokemons.player2Pokemons)
  const [ choiseeCard, setChoiseCard ] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(!startPokemons.player1Pokemons.length 
      || !startPokemons.player2Pokemons.length) {
      navigate('../../game', {replace: true})
    }
    return () => {
      startPokemons.player1Pokemons = []
      startPokemons.player2Pokemons = []
      startPokemons.win = ''
    }
  // eslint-disable-next-line
  }, [])

  const clickHandler = async () => {
    if (choiseeCard) {
      await pushDataFromDatabase(choiseeCard)
    }
    navigate('../../game')
  }

  const clickCardHandler = id => {
    if (startPokemons.win !== 'WIN') return
    setPlayaer2Cards(prev => {
      return prev.map(item => {
        item.selected = false
        if (item.id === id) {
          item.selected = true
          setChoiseCard(item)
        }
        return item
      })
    }) 
  }

  return (
    <Layout title={startPokemons.win}>
      <div className={s.player}>
        {
          startPokemons.player1Pokemons.map(item => {
            return (
              <div className={s.wrapperCard} key={item.id}>
                <PokemonCard 
                  name={item.name}
                  img={item.img}
                  id={item.id}
                  values={item.values}
                  type={item.type}
                  isActive={true}
                />
              </div>
            )
          })
        }
      </div>
      <div className={s.wrapperButton}>
        <button onClick={clickHandler} disabled={choiseeCard && startPokemons.win !== 'WIN'} >End game</button>
      </div>
      <div className={s.player}>
      {
          player2Cards.map(item => {
            return (
              <div className={s.wrapperCard} key={item.id}>
                <PokemonCard 
                  key={item.id}
                  name={item.name}
                  img={item.img}
                  id={item.id}
                  values={item.values}
                  type={item.type}
                  isActive={true}
                  onCLickHandler = {clickCardHandler}
                  isSelected={item.selected}
                />
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

export { FinishPage }