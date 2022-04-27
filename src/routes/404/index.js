import s from './style.module.css'

const Page404 = () => {
  return (
    <div className={s.wrapper}>
        <div className={s.error}>Упс, кажется произошла ошибка: 404</div>
        <h1 className={s.title}>Страница не найдена!</h1>
        <div className={s.smile}> :( </div>
    </div>
  )
}

export { Page404 }