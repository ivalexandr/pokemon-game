import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { refresh } from "../../redux/reducers/modalReducer/async/refreshUser"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { PrivateRoute } from "../PrivateRoute"
import { LayoutPage } from "../LayoutPage"
import { HomePage } from "../../routes/HomePage"
import { AboutPage } from "../../routes/AboutPage"
import { ContactPage } from '../../routes/ContactPage'
import { Start } from "../../routes/Game/Start"
import { BoardPage } from "../../routes/Game/Board"
import { FinishPage } from "../../routes/Game/Finish"
import { Page404 } from "../../routes/404"
import { NotificationContainer } from 'react-notifications'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.getItem('refreshToken') && dispatch(refresh())
  //eslint-disable-next-line
  }, [])

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="game">
              <Route path="/game" element={<><PrivateRoute /><Start /></>} />
              <Route path="/game/board" element={<><PrivateRoute /><BoardPage /></>} />
              <Route path="/game/finish" element={<><PrivateRoute /><FinishPage /></>} />
          </Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
    <NotificationContainer />
    </>
  )
}

export default App
