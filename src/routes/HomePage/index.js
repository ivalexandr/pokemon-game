import { Header } from '../../components/Header'
import { Layout } from '../../components/Layout'
import { Footer } from '../../components/Footer'
import { PokemonCard } from '../../components/PokemonCard'
import { pokemonDB } from '../../database/db'
import bg from '../../assets/img/bg.jpg'

import s from './style.module.css'

const HomePage = ({ onClickHandler }) => {

  const clickHandler = page => {
    onClickHandler && onClickHandler(page)
  }

  return (
    <>
      <Header title='This is title' descr='This is Description!' onClickHandler={clickHandler}/>
      <Layout title='This is title layout 1' urlBg={bg}>
        <p>
          In the game two players face off against one another, one side playing
          as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
      </Layout>
      <Layout
        title='This is title layout 2'
        descr='This is descr layout 2'
        colorBg='#e2e2e2'>
        <div className={s.flex}>
          {pokemonDB.map(item => (
            <PokemonCard
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              values={item.values}
              type={item.type}
            />
          ))}
        </div>
      </Layout>
      <Layout title='This is title layout 3' urlBg={bg}>
        <p>
          To win, a majority of the total ten cards played (including the one
          card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card
          adjacent to an opponent's card whereupon the 'ranks' of the sides
          where the two cards touch will be compared. If the rank of the
          opponent's card is higher than the player's card, the player's card
          will be captured and turned into the opponent's color. If the player's
          rank is higher, the opponent's card will be captured and changed into
          the player's color instead.
        </p>
      </Layout>
      <Footer />
    </>
  )
}

export { HomePage }