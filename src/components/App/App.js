import { Header } from '../Header/Header'
import { Layout } from '../Layout/Layout'
import { Footer } from '../Footer/Footer'
import bg from '../../assets/img/bg.jpg'


const App = () => {
  return (
    <>
      <Header 
      title = "This is title"
      descr = "This is Description!"
      />
      <Layout
      title = "This is title layout 1"
      descr = "This is descr layout 1"
      urlBg = {bg}
      />
      <Layout 
      title = "This is title layout 2"
      descr = "This is descr layout 2"
      colorBg = "#e2e2e2"
      />
      <Layout
      title = "This is title layout 3"
      descr = "This is descr layout 3"
      urlBg = {bg}
      />
      <Footer />
    </>
  )
}

export default App
