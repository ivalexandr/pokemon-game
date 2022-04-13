import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { isOpen } from '../../redux/reducers/modalReducer'
import { Input } from '../Input'

const LoginForm = () => {
  const [ form, setForm ] = useState({})
  const isOpenModal = useSelector(isOpen)

  const changeHandler = event => {
    setForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  const submitHandler = event => {
    event.preventDefault()
    console.log(form)
    setForm({})
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
      />
      <button>Send</button>
    </form>
  )
}

export { LoginForm }