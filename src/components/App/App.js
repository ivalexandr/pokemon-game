import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LayoutPage } from "../LayoutPage"
import { HomePage } from "../../routes/HomePage"
import { AboutPage } from "../../routes/AboutPage"
import { ContactPage } from '../../routes/ContactPage'
import { Start } from "../../routes/Game/Start"
import { BoardPage } from "../../routes/Game/Board"
import { FinishPage } from "../../routes/Game/Finish"
import { Page404 } from "../../routes/404"

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="game">
              <Route path="/game" element={<Start />} />
              <Route path="/game/board" element={<BoardPage />} />
              <Route path="/game/finish" element={<FinishPage />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App
