import { useNavigate } from 'react-router-dom'
import s from './style.module.css'

const Header = ({title, descr }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/game')
  }

  return (
    <header className={s.root}>
      <div className={s.forest} />
      <div className={s.silhouette} />
      <div className={s.moon} />
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={clickHandler}>Start Game</button>
      </div>
    </header>
  )
}

export { Header }
