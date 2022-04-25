import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getPlayer2 } from '../../../redux/reducers/gameReducer/async/getPlayer2Pokemons'
import { getGameBoard } from '../../../redux/reducers/gameReducer/async/getBoard'
import { setCardOnGameBoard } from '../../../redux/reducers/gameReducer/async/setCardOnGameBoard'

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
  counterPlayer2,
  selectServerBoard,
  setBord,
  selectGame,
  setServerBoard,
  setGameBoard,
  setSteps,
  removeSelectedCard
  } from '../../../redux/reducers/gameReducer'
import { PokemonCard } from '../../../components/PokemonCard'
import { BoardCard } from './components/BoardCard'
import { ArrowChoice } from '../../../components/ArrowChoice'
import s from './style.module.css'

const returnBoard = board => {
  if (!board) return 
  return board.map((item, index) => {
    let card = null
    if (typeof item === 'object') {
      card = {
        ...item.poke,
        possession: item.holder === 'p1' ? 'blue' : 'red'
      }
    }
    return {
      position: index + 1,
      card,
    }
  })
}

const stepingPlayer = async (playerGameStart, p1, p2, move = null, board , dispatch) => {
  const currentPlayer = playerGameStart === 1 ? 'p1' : 'p2'
  const params = {
    currentPlayer,
    hands: {
      p1,
      p2
    },
    move,
    board
  }
  await dispatch(setCardOnGameBoard(params))
}

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
  const serverBoard = useSelector(selectServerBoard)
  const game = useSelector(selectGame)
  const [ isSelected, setSelected ] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (player1.length === 0) {
      navigate('/game', {replace: true})
    }

    const timerId = setTimeout(() => {
      const player = (Math.floor(Math.random() * 10)) % 2 === 0 ? 2 : 1
      dispatch(setPlayerStart(player))
    }, 2000)

    dispatch(getPlayer2(player1))
    dispatch(getGameBoard())

    return () => {
      clearInterval(timerId)
    }
  //eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(counterWin())
    if (gameSteps === 9) {
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

  useEffect(() => {
    if (playerGameStart === 2 && gameSteps === 0) {
      console.log('sdfdsfds')
      stepingPlayer(playerGameStart, player1, player2, null, serverBoard, dispatch)
    }
  //eslint-disable-next-line
  }, [playerGameStart])

  useEffect(() => {
      if (!game && playerGameStart !== 2) return
      const idAI = game?.move.poke.id
      const selectPlayer2Card = player2.find(item => item.id === idAI)
      
      dispatch(setGameBoard(returnBoard(game?.oldBoard)))
      const timerIdSelected = setTimeout(() => setSelected(idAI), 1000)
      const timerIdSetPlayer = setTimeout(() => {
        dispatch(setPlayerCard({ ...selectPlayer2Card, player: 2 }))
        dispatch(setServerBoard(game?.board))
        dispatch(setGameBoard(returnBoard(game?.board)))
        dispatch(setPlayerStart(1))
        dispatch(setSteps())
      }, 1500)
      return () => {
        clearInterval(timerIdSelected)
        clearInterval(timerIdSetPlayer)
      }
  //eslint-disable-next-line
  }, [game])

  const clickBoardHandler = position => {
    if (!selectedGameCard) return
    const cardOnBoard = gameBoard.find(item => item.position === position)
    if (cardOnBoard.card) return
    if (selectedGameCard) {
      stepingPlayer(
        playerGameStart,
        player1,
        player2,
        {
          poke:selectedGameCard,
          position
        },
        serverBoard,
        dispatch
        )
    }
    dispatch(setBord(position))
    dispatch(setPlayerCard(selectedGameCard))
    dispatch(setPlayerStart(2))
    // dispatch(removeSelectedCard())
    dispatch(setSteps())
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
            choisePlayer = { playerGameStart }
            player = { 1 }
            cards={ player1 }
            onCLickCard = { clickCardHandler }
            isSelected = { isSelected }
            setSelected = { setSelected } 
          />
        }
      </div>
      <div className={s.board}>
        {
          gameBoard?.map((item, index) => {
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
          choisePlayer = { playerGameStart }
          player = { 2 }
          cards={ player2 } 
          isSelected = { isSelected }
          setSelected = { setSelected } 
        />
      </div>
    </div>
  )
}
export { BoardPage }
