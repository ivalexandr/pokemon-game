import cn from 'classnames'
import s from './style.module.css'

const Layout = ({ title, descr, colorBg, urlBg, children }) => {
  const style = {
    background:`url(${urlBg})`,
    backgroundColor:colorBg,
  }

  return (
    <section className={s.root} style = {style}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{title}</h3>
            <span className={s.separator}></span>
          </div>
          <div className={cn(s.desc, s.full)}>
            {children}
          </div>
        </article>
      </div>
    </section>
  )
}

export { Layout }
