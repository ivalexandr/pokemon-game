import { useSelector } from 'react-redux'
import { isLoginForm } from '../../redux/reducers/modalReducer'
import { Header } from '../../components/Header'
import { Layout } from '../../components/Layout'
import { Footer } from '../../components/Footer'
import { Modal } from '../../components/Modal'
import { LoginForm } from '../../components/LoginForm'
import bg from '../../assets/img/bg.jpg'

const HomePage = () => {

  const isLoginFormType = useSelector(isLoginForm)

  return (
    <>
      <Header title='Pokemon Game' descr='This is Description!' />
      <Layout title='Rules' urlBg={bg}>
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
      <Modal title={!isLoginFormType ? 'SIGN IN': 'SIGN UP'} children={<LoginForm />}/>
    </>
  )
}

export { HomePage }