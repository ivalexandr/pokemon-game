// import s from './style.module.css'

const GamePage = ({onClickHandler}) => {

  const clickhandler = () => {
    onClickHandler && onClickHandler('home');
  }

  return (
    <>
      <h1>This ihs Game Page!</h1>
      <button onClick={clickhandler}>Back Home</button>
    </>
    
  )
}

export { GamePage }