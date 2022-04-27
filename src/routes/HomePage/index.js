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
      <Header title='Pokemon Game' />
      <Layout title='Правила игры' urlBg={bg}>
        <p>
          Для победы необходимо, чтобы большинство карт (включая одну карту, которая не кладется на доску)
          были захвачены игроком. Для захвата карт, необходимо поместить карту рядом с картой противника, после чего
          "ряды" сторон, где карты касаются будут сравниваться. Если значение карты противника выше чем у игрока, карта игрока
          будет захвачена и перекрашена в цвет противника. Если же значение карты игрока выше чем у противника, тогда произойдет
          захват карты противнка игроком.
        </p>
      </Layout>
      <Footer />
      <Modal title={!isLoginFormType ? 'Авторизация': 'Регистрация'} children={<LoginForm />}/>
    </>
  )
}

export { HomePage }