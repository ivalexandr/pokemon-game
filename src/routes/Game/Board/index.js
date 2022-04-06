import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBoard } from '../../../api/api'
import { PokemonCard } from '../../../components/PokemonCard'
import { StartContext } from '../../../context/Start'
import s from './style.module.css'

const BoardPage = () => {
  const { startPokemons } = useContext(StartContext)
  const [board, setBoard] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (startPokemons.length === 0) {
      navigate('/game', {replace: true})
    }
    const fetchData= async () => {
      const board = await getBoard()
      setBoard(board.data)
    }
    fetchData()
  }, [])

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {
          startPokemons.map(item => {
            return (
                <PokemonCard 
                    key={item.id}
                    name={item.name}
                    img={item.img}
                    id={item.id}
                    values={item.values}
                    type={item.type}
                    minimize={true}
                    className={s.card}
                    isActive={true}
                />
            )
          })
        }
      </div>
      <div className={s.board}>
        {
          board.map((_, index) => {
            return <div key={index} className={s.boardPlate} />
          })
        }
      </div>
    </div>
  )
}
export { BoardPage }
