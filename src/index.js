import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import { StartContext, startPokemons } from './context/Start'

ReactDOM.render(
  <React.StrictMode>
    <StartContext.Provider value={startPokemons} >
      <App />
    </StartContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)