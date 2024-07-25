import { useState } from 'react'
import Button from './Button/Button'
import Input from './Input/Input'

export default function LoginForm() {
  const [isShown, setIsShown] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [hasPhone, setHasPhone] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)

  function handleChangeIsShown() {
    setIsShown(!isShown)
  }

  function handleChangeFormPhone(event) {
    setPhone(event.target.value)
    setHasPhone(event.target.value.trim().length == 0)
  }

  function handleChangeFormPassword(event) {
    setPassword(event.target.value)
    setHasPassword(event.target.value.trim().length == 0)
  }

  return (
    <>
      { !isShown && <Button onClick={handleChangeIsShown} isActive={true}>Log in</Button> }
      { isShown &&
        <form>
          <Input type='text' value={phone} onChange={handleChangeFormPhone} placeholder='Phone' style={{border : hasPhone ? '1px solid red': null}}/>
          <Input type='password' value={password} onChange={handleChangeFormPassword} placeholder='Password' style={{border : hasPassword ? '1px solid red': null}}/>
          <Button disabled={phone.trim().length == 0 || password.trim().length == 0} isActive={!(phone.trim().length == 0 || password.trim().length == 0)}> Log in </Button>
        </form>
      }
    </>
  )
}


