import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getPlayer2 } from '../../../redux/reducers/async/getPlayer2Pokemons'
import { getGameBoard } from '../../../redux/reducers/async/getBoard'
import { setCardOnGameBoard } from '../../../redux/reducers/async/setCardOnGameBoard'

import {
  player1Pokemons,
  player2Pokemons,
  setPlayerCard,
  setWin,
  board,
  playerStart,
  setPlayerStart,
  selectCard,
  selectedCard,
  steps,
  counterWin,
  counterPlayer1,
  counterPlayer2
  } from '../../../redux/reducers/pokemonsReducer'
import { PokemonCard } from '../../../components/PokemonCard'
import { BoardCard } from './components/BoardCard'
import { ArrowChoice } from '../../../components/ArrowChoice'
import s from './style.module.css'

const BoardPage = () => {

  const dispatch = useDispatch()
  const player1 = useSelector(player1Pokemons)
  const player2 = useSelector(player2Pokemons)
  const gameBoard = useSelector(board)
  const playerGameStart = useSelector(playerStart)
  const selectedGameCard = useSelector(selectedCard)
  const gameSteps = useSelector(steps)
  const countPlayer1 = useSelector(counterPlayer1)
  const countPLayer2 = useSelector(counterPlayer2)

  const navigate = useNavigate()

  useEffect(() => {
    if (player1.length === 0) {
      navigate('/game', {replace: true})
    }

    const timerId = setTimeout(() => {
      const player = (Math.floor(Math.random() * 10)) % 2 === 0 ? 2 : 1
      dispatch(setPlayerStart(player))
    }, 2000)

    dispatch(getPlayer2())
    dispatch(getGameBoard())

    return () => {
      clearInterval(timerId)
    }
  //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (gameSteps === 9) {
      dispatch(counterWin())
      if (countPlayer1 > countPLayer2) {
        dispatch(setWin('WIN'))
      }else if (countPlayer1 < countPLayer2) {
        dispatch(setWin('LOSE'))
      }else{
        dispatch(setWin('DRAW'))
      }
      navigate('../finish/')
    }
  //eslint-disable-next-line
  }, [gameSteps])

  const clickBoardHandler = position => {
    if (selectedGameCard) {
      const params = {
        position,
        card: selectedGameCard,
        board: gameBoard
      }
      dispatch(setCardOnGameBoard(params))
    }
    dispatch(setPlayerCard(selectedGameCard))

    if (playerGameStart === 1) {
      dispatch(setPlayerStart(2))
    } else {
      dispatch(setPlayerStart(1))
    }
  }

  const clickCardHandler = card => {
    dispatch(selectCard(card))
  }

  return (
    <div className={s.root}>
        <ArrowChoice 
          side={playerGameStart} 
          hidden={playerGameStart > 0} 
        />
      <div className={s.playerOne}>
        {
          <BoardCard
            choisePlayer = {playerGameStart}
            player = {1}
            cards={ player1 }
            onCLickCard = {clickCardHandler}
          />
        }
      </div>
      <div className={s.board}>
        {
          gameBoard.map((item, index) => {
            return <div key={index} className={s.boardPlate} onClick={() => clickBoardHandler(item.position)}> 
              {
                item.card && <PokemonCard {...item.card} minimize isActive />
              }
            </div>
          })
        }
      </div>
      <div className={s.playerTwo}>
        <BoardCard 
          choisePlayer = {playerGameStart}
          player = {2}
          cards={ player2 } 
          onCLickCard = {clickCardHandler}
        />
      </div>
    </div>
  )
}
export { BoardPage }
