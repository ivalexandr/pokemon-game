import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../../components/Layout'
import { PokemonCard } from '../../../components/PokemonCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../../../redux/reducers/gameReducer/async/getPokemons'
import { pokemons, setCard, choiseCard, player1Pokemons } from '../../../redux/reducers/gameReducer'
import s from './style.module.css'

const Start = () => {
  const dispatch = useDispatch()
  const pokemonsCard = useSelector(pokemons) 
  const player1 = useSelector(player1Pokemons)
  
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPokemons())
  //eslint-disable-next-line
  }, [])

  const clickHandler = id => {
    dispatch(setCard(id))
    dispatch(choiseCard())
  }

  const clickStartHandler = () => {
    navigate('board/')
  }
  
  return (
    <Layout title="Pokemon's game">
        <div className={s.flex}>
          {
            Object.entries(pokemonsCard).map(item => {
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
            disabled={player1.length < 5 || player1.length > 5} 
            onClick={clickStartHandler}>
              Start game
            </button>
        </div>
    </Layout>
  )
}

export { Start }