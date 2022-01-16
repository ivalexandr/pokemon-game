import s from './style.module.css'

const Layout = ({ title, descr, colorBg, urlBg }) => {
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
          <div className={`${s.desc} ${s.full}`}>
            <p>{descr}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export { Layout }
