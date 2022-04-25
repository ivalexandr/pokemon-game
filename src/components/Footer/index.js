import s from './style.module.css'

const Footer = () => {
  return (
    <footer>
      <div className={s.wrapper}>
        <h3>THANKS FOR VISITING</h3>
        <p>© { new Date().getFullYear() } #ReactMarathon.</p>
      </div>
    </footer>
  )
}
export { Footer }
