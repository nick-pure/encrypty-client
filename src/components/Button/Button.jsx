import { useState } from 'react'

export default function LoginButton() {
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
      { !isShown && <button onClick={handleChangeIsShown}>Log in</button> }
      { isShown &&
        <form>
          <input type='text' value={phone} onChange={handleChangeFormPhone} placeholder='Phone' style={{border : hasPhone ? '1px solid red': null}}></input>
          <input type='password' value={password} onChange={handleChangeFormPassword} placeholder='Password' style={{border : hasPassword ? '1px solid red': null}}></input>
          <button disabled={phone.trim().length != 0 && password.trim().length != 0}> Log in </button>
        </form>
      }
    </>
  )
}


