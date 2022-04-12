import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBoard, getPlayerTwoCard, setCardOnBoard } from '../../../api/api'
import { PokemonCard } from '../../../components/PokemonCard'
import { StartContext } from '../../../context/Start'
import { BoardCard } from './components/BoardCard'
import { ArrowChoice } from '../../../components/ArrowChoice'
import s from './style.module.css'

const counterWin = (board, player1, player2) => {

  let player1Count = player1.length
  let player2Count = player2.length

  board.forEach(item => {
    if (item.card.possession === 'red') {
      player2Count++
    }
    if (item.card.possession === 'blue') {
      player1Count++
    }
  })
  return [player1Count, player2Count]
}

const BoardPage = () => {
  const startPokemons = useContext(StartContext)
  const [board, setBoard] = useState([])
  const [onePlayerCards, setOnePlayerCards] = useState(() => {
    return startPokemons.player1Pokemons.map(item => ({
      ...item,
      possession: 'blue'
    }))
  })
  const [twoPlayerCards, setTwoPlayerCards] = useState([])
  const [choiseCard, setChoiseCard] = useState(null)
  const [steps, setSteps] = useState(0)
  const [playerStart, setPlayerStart] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (startPokemons.player1Pokemons.length === 0) {
      navigate('/game', {replace: true})
    }

    const timerId = setTimeout(() => {
      const player = (Math.floor(Math.random() * 10)) % 2 === 0 ? 2 : 1
      setPlayerStart(player)
    }, 2000)

    const fetchData = async () => {
      const board = await getBoard()
      const twoPlayer = await getPlayerTwoCard()
      setBoard(board.data)
      setTwoPlayerCards(() => {
        return twoPlayer.data.map(item => ({
          ...item,
          possession: 'red'
        }))
      })
      startPokemons.addPlayer2Pokemons(twoPlayer.data)
    }
    
    fetchData()
    return () => {
      setBoard([])
      setTwoPlayerCards([])
      clearInterval(timerId)
    }
  //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, onePlayerCards, twoPlayerCards)
      if (count1 > count2) {
        startPokemons.win = 'WIN'
      }else if (count1 < count2) {
        startPokemons.win = 'LOSE'
      }else{
        startPokemons.win = 'DRAW'
      }
      navigate('../finish/')
    }
  //eslint-disable-next-line
  }, [steps])

  const clickBoardHandler = async position => {
    if (choiseCard) {
      const params = {
        position,
        card: choiseCard,
        board
      }
      const res = await setCardOnBoard(params)
      setBoard(res.data)
    }
    if (choiseCard.player === 1) {
      setOnePlayerCards(prev => {
        return prev.filter(item => item.id !== choiseCard.id)
      })
    }
    if (choiseCard.player === 2) {
      setTwoPlayerCards(prev => {
        return prev.filter(item => item.id !== choiseCard.id)
      })
    }
    setSteps(prev => prev + 1)
  }

  const clickCardHandler = card => {
    setChoiseCard(card)
    if (playerStart === 1) {
      setPlayerStart(2)
    } else {
      setPlayerStart(1)
    }
  }

  return (
    <div className={s.root}>
        <ArrowChoice 
          side={playerStart} 
          hidden={playerStart > 0} 
        />
      <div className={s.playerOne}>
        {
          <BoardCard
            choisePlayer = {playerStart}
            player = {1}
            cards={ onePlayerCards }
            onCLickCard = {clickCardHandler}
          />
        }
      </div>
      <div className={s.board}>
        {
          board.map((item, index) => {
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
          choisePlayer = {playerStart}
          player = {2}
          cards={ twoPlayerCards } 
          onCLickCard = {clickCardHandler}
        />
      </div>
    </div>
  )
}
export { BoardPage }
