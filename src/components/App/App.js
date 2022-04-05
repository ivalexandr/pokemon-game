import { useState } from "react"
import { HomePage } from "../../routes/HomePage"
import { GamePage } from '../../routes/GamePage'

const App = () => {
  const [page, setPage] = useState('home')

  const clickHandler = pageName => {
    setPage(pageName)
  }

  switch(page) {
    case 'home': {
      return <HomePage onClickHandler = {clickHandler} />
    }
    case 'game': {
      return <GamePage onClickHandler={clickHandler}/>
    }
    default: {
      return <GamePage onClickHandler = {clickHandler} />
    }
  }
}

export default App
