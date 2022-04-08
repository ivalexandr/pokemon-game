import { useState } from "react"
import { PokemonCard } from "../../../../../components/PokemonCard"
import cn from 'classnames'
import s from './style.module.css'

const BoardCard = ({player, cards, onCLickCard }) => {
  const [ isSelected, setSelected ] = useState(null)
  return (
    <>
      {
        cards.map(item => {
          return (
            <div className={cn(s.cardBoard, {[s.selected]: isSelected === item.id})}
              key={item.id}
              onClick = {() => {
                setSelected(item.id)
                onCLickCard && onCLickCard(() => ({...item, player}))
              }}
              >
              <PokemonCard 
                key={item.id}
                name={item.name}
                img={item.img}
                id={item.id}
                values={item.values}
                type={item.type}
                minimize={true}
                isActive={true}
              />
            </div>
          )
        })
      }
    </>
  )
}

export { BoardCard }