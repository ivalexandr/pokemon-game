import s from './style.module.css'

const Header = ({title, descr, onClickHandler}) => {

  const clickHandler = () => {
    onClickHandler && onClickHandler('game')
  }

  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={clickHandler}>Start Game</button>
      </div>
    </header>
  )
}

export { Header }
