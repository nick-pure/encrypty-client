import { useState, useCallback } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import classes from './LoginForm.module.css'
import Header from '../Header/Header'
export default function LoginForm() {
  const [type, setType] = useState(0)
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
    formdata.append("phone", phone);
    formdata.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    let resp = await fetch("http://127.0.0.1:8000/api/profiles/login/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result['status'] == 'error') {
          setErrorHandler(result['info']['error'])
        } else {
          setErrorHandler('')
          setType(0)
        }
      })
      .catch((error) => console.error(error));
    setLoading(false)
  }, [phone, password])

  const register = useCallback(async () => {
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
          setType(2)
        }
      })
      .catch((error) => console.error(error));
    setLoading(false)
  }, [name, phone, password])

  function loginHandler(event) {
    event.preventDefault();
    setErrorHandler("")
    login()
  }
  function registerHandler(event) {
    event.preventDefault();
    if (password != repeated_password) {
      setErrorHandler("Passwords are not the same")
      return
    }
    setErrorHandler("")
    register()
  }
  function handleChangeType(x) {
    setType(x)
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
      <section className={`${classes.loginForm} ${classes.container}`}>
        <Header />
            { type != 2 && <Button className={classes.container} onClick={()=>handleChangeType(2)} isActive={true}> Log in </Button> }
      { type == 2 &&
        <>
          {errorHandler && <p style={{color : '#be0000'}}>{errorHandler}</p>}
          {loading && <p>Loading...</p>}
          <form className={classes.container}>
            <Input type='text' value={phone} onChange={handleChangeFormPhone} placeholder='Phone' style={{border : hasPhone ? '1px solid red': null}}/>
            <Input type='password' value={password} onChange={handleChangeFormPassword} placeholder='Password' style={{border : hasPassword ? '1px solid red': null}}/>
            <Button disabled={permitted} isActive={!permitted ? 2 : 0} onClick={loginHandler}> Log in </Button>
          </form>
        </>
      }
      { type != 1 && <Button onClick={()=>handleChangeType(1)} isActive={true}> Register </Button> }
      { type == 1 &&
        <>
          {errorHandler && <p style={{color : '#be0000'}}>{errorHandler}</p>}
          {loading && <p>Loading...</p>}  
          <form className={classes.container}>
            <Input type='text' value={name} onChange={handleChangeFormName} placeholder='Your name' style={{border : hasName ? '1px solid red': null}}/>
            <Input type='text' value={phone} onChange={handleChangeFormPhone} placeholder='Phone' style={{border : hasPhone ? '1px solid red': null}}/>
            <Input type='password' value={password} onChange={handleChangeFormPassword} placeholder='Password' style={{border : hasPassword ? '1px solid red': null}}/>
            <Input type='password' value={repeated_password} onChange={handleChangeFormRepeatedPassword} placeholder='Repeat password' style={{border : hasRepeatedPassword ? '1px solid red': null}}/>
            <Button disabled={permitted} isActive={!permitted ? 2 : 0} onClick={registerHandler}> Register </Button>
          </form>
          
        </>
      }
      </section>
    </>
  )
}


