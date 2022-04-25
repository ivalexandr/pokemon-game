import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Layout } from "../../../components/Layout"
import { PokemonCard } from "../../../components/PokemonCard"
import { pushCard } from '../../../redux/reducers/gameReducer/async/pushCard'
import { 
  player1PokemonsGame,
  player2PokemonsGame,
  cleanState,
  result,
  setWinCard,
  choiseWinCard
  } from '../../../redux/reducers/gameReducer'
import s from './style.module.css'

const FinishPage = () => {

  const player1 = useSelector(player1PokemonsGame)
  const player2 = useSelector(player2PokemonsGame)
  const resultGame = useSelector(result)
  const choiseCard = useSelector(choiseWinCard)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    if(!player1.length || !player2.length) {
      console.log(player1, player2)
      navigate('../../game', {replace: true})
    }
    return () => dispatch(cleanState())
  // eslint-disable-next-line
  }, [])

  const clickHandler = async () => {
    if (choiseCard) {
      dispatch(pushCard(choiseCard))
    }
    navigate('../../game')
  }

  const clickCardHandler = id => {
    if (resultGame !== 'WIN') return
    dispatch(setWinCard(id))
  }

  return (
    <Layout title={resultGame}>
      <div className={s.player}>
        {
          player1.map(item => {
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
        <button onClick={clickHandler} disabled={!choiseCard && resultGame === 'WIN'} >End game</button>
      </div>
      <div className={s.player}>
      {
          player2.map(item => {
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