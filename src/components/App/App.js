import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LayoutPage } from "../LayoutPage"
import { HomePage } from "../../routes/HomePage"
import { GamePage } from '../../routes/GamePage'
import { AboutPage } from "../../routes/AboutPage"
import { ContactPage } from '../../routes/ContactPage'
import { Page404 } from "../../routes/404"

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="game" element={<GamePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  )
}

export default App
