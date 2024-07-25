import { useState, useCallback } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'

export default function LoginForm() {
  const [isShown, setIsShown] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [repeated_password, setRepeatedPassword] = useState('')
  const [name, setName] = useState('')

  const [hasName, setHasName] = useState(false)
  const [hasPhone, setHasPhone] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)
  const [hasRepeatedPassword, setHasRepeatedPassword] = useState(false)

  const [loading, setLoading] = useState(false)
  const [errorHandler, setErrorHandler] = useState(null)

  const login = useCallback(async () => {
    setLoading(true)
    const myHeaders = new Headers();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    let resp = await fetch("http://127.0.0.1:8000/api/profiles/register/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result['status'] == 'error') {
          setErrorHandler(result['info']['error'])
        } else {
          setErrorHandler('')
          console.log('success')
        }
      })
      .catch((error) => console.error(error));
    setLoading(false)
  }, [])
  function loginHandler(event) {
    event.preventDefault();
    if (password != repeated_password) {
      setErrorHandler("Password are not the same")
      return
    }
    setErrorHandler("")
    login()
  }

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
  function handleChangeFormRepeatedPassword(event) {
    setRepeatedPassword(event.target.value)
    setHasRepeatedPassword(event.target.value.trim().length == 0)
  }
  function handleChangeFormName(event) {
    setName(event.target.value)
    setHasName(event.target.value.trim().length == 0)
  }


  let permitted = phone.trim().length == 0 || password.trim().length == 0 || repeated_password.trim().length == 0 || name.trim().length == 0;
  return (
    <>
      { !isShown && <Button onClick={handleChangeIsShown} isActive={true}> Register </Button> }
      { isShown &&
        <>
          {errorHandler && <p style={{color : '#be0000'}}>{errorHandler}</p>}
          {loading && <p>Loading...</p>}
          <form>
            <Input type='text' value={name} onChange={handleChangeFormName} placeholder='Your name' style={{border : hasName ? '1px solid red': null}}/>
            <Input type='text' value={phone} onChange={handleChangeFormPhone} placeholder='Phone' style={{border : hasPhone ? '1px solid red': null}}/>
            <Input type='password' value={password} onChange={handleChangeFormPassword} placeholder='Password' style={{border : hasPassword ? '1px solid red': null}}/>
            <Input type='password' value={repeated_password} onChange={handleChangeFormRepeatedPassword} placeholder='Repeat password' style={{border : hasRepeatedPassword ? '1px solid red': null}}/>
            <Button disabled={permitted} isActive={!permitted} onClick={loginHandler}> Register </Button>
          </form>
        </>
      }
    </>
  )
}


