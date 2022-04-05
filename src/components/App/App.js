import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LayoutPage } from "../LayoutPage"
import { HomePage } from "../../routes/HomePage"
import { GamePage } from '../../routes/GamePage'

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<HomePage />}/>
          <Route path="game" element={<GamePage />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
