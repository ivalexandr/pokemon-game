import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isOpen, isLoginForm, toggleForm, closeModal } from '../../redux/reducers/modalReducer'
import { auth } from '../../redux/reducers/modalReducer/async/authUser'
import { register } from '../../redux/reducers/modalReducer/async/registerUser'
import { Input } from '../Input'
import s from './style.module.css'

const LoginForm = () => {
  const dispatch = useDispatch()
  const isOpenModal = useSelector(isOpen)
  const isLoginFormType = useSelector(isLoginForm)

  const [ form, setForm ] = useState({})

  const changeHandler = event => {
    setForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const submitHandler = event => {
    event.preventDefault()

    const registerData = {
      ...form,
      returnSecureToken: true,
    }

    isLoginFormType 
    ? dispatch(register(registerData))
    : dispatch(auth(registerData))

    dispatch(closeModal())
    setForm({})
  }

  const clickToggleHandler = event => {
    event.preventDefault()
    dispatch(toggleForm())
  }

  useEffect(() => {
    if (!isOpenModal) {
      setForm({})
    }
  }, [isOpenModal])

  return (
    <form onSubmit={submitHandler}> 
      <Input 
        type={'text'}
        label={'Email'}
        name={'email'}
        isRequired={true}
        onChangeHandler={changeHandler}
        value={form.email || ''}
      />
      <Input 
        type={'password'}
        label={'Password'}
        name={'password'}
        isRequired={true}
        onChangeHandler={changeHandler}
        value={form.password || ''}
        autoComplete="currentPassword"
      />
      <div className={s.flex}>
        <button>Send</button> 
        <a href="/" onClick={clickToggleHandler}>{isLoginFormType ? 'Register' : 'Login'}</a>
      </div>
    </form>
  )
}

export { LoginForm }