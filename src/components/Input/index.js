import cn from 'classnames'
import s from './style.module.css'

const Input = ({ label, type, name, isRequired, value, onChangeHandler }) => {

  return (
    <div className={s.root}>
      <input 
        type={type}
        className={cn(s.input, {[s.valid]: value})}
        required={isRequired}
        value={value}
        onChange={onChangeHandler}
        name={name} 
      />
      <span className={s.highlight} />
      <span className={s.bar} />
      <label className={s.label}>{label}</label>
    </div>
  )
}

export { Input }