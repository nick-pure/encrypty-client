import { useState, useCallback, useEffect } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import classes from './LoginForm.module.css'
import Header from '../Header/Header'
import axios from 'axios'
import Cookies from 'js-cookie';
// import {generateKeys, getPublicKey} from '../openssl/index'
const API_URL = 'http://127.0.0.1:8000/api/';

export const checkAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}profiles/check_auth/`, { withCredentials: true });
    return response.data.isAuthenticated;
} catch (error) { 
    return false;
}
}; 

export default function LoginForm({onIsAuthenticatedChange}) {
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

  const register = async (name, phone, password) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "multipart/form-data")
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("phone", phone);
        formdata.append("password", password);
        let resp = await axios({
          method: 'post',
          url: `${API_URL}profiles/register/`,
          data: formdata,
          withCredentials: true,
          headers: headers,
        }).then((response) => response.response['data'])
          .then((response) => {
            console.log(response)
            if (response['status'] == 'error') {
              setErrorHandler(response['info']['error'])
            } else {
              setErrorHandler('')
              setType(2)
            }
          })
          .catch((response) => {
            setErrorHandler(response.response['data']['info']['error'])
          });
    
    } catch (error) {
      console.error('Error logging in', error);
      return false;
    } 
};

const login = async (phone, password) => {
  try {
      const headers = new Headers();
      headers.append("Content-Type", "multipart/form-data")
      const formdata = new FormData();
      formdata.append("phone", phone);
      formdata.append("password", password);
      let resp = await axios({
        method: 'post',
        url: `${API_URL}profiles/login/`,
        data: formdata,
        withCredentials: true,
        headers: headers,
      }).then((response) => response['data'])
        .then((response) => {
          if (response['status'] == 'error') {
            setErrorHandler(response['info']['error'])
          } else {
            setErrorHandler('')
            setType(0)
            onIsAuthenticatedChange(true)
          }
        })
        .catch((response) => {
          console.log(response)
          setErrorHandler(response['data']['info']['error'])
        });
  
  } catch (error) {
    console.error('Error logging in', error);
    return false;
  } 
};

  
  useEffect(() => {
    const verifyAuth = async () => {
        const isAuthenticated = await checkAuth();
        onIsAuthenticatedChange(isAuthenticated);
    };
      verifyAuth();
  }, []);

  function loginHandler(event) {
    event.preventDefault();
    setErrorHandler("");
    setLoading(true);
    login(phone, password);
    setLoading(false)
  }
  function registerHandler(event) {
    event.preventDefault();
    if (password != repeated_password) {
      setErrorHandler("Passwords are not the same")
      return
    }
    setErrorHandler("")
    setLoading(true);
    register(name, phone, password)
    setLoading(false)
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


  let permittedRegister = phone.trim().length == 0 || password.trim().length == 0 || repeated_password.trim().length == 0 || name.trim().length == 0;
  let permittedLogin = phone.trim().length == 0 || password.trim().length == 0;
  return (
    <>
      <section className={`${classes.loginForm} ${classes.container}`}>
        <Header />
            { type != 2 && <Button className={classes.container} onClick={()=>handleChangeType(2)} isActive={true}> Log in </Button> }
      { type == 2 &&
        <>
          {errorHandler && <p className={classes.error}>{errorHandler}</p>}
          {loading && <p>Loading...</p>}
          <form className={classes.container}>
            <Input type='text' value={phone} onChange={handleChangeFormPhone} placeholder='Phone' style={{border : hasPhone ? '1px solid red': null}}/>
            <Input type='password' value={password} onChange={handleChangeFormPassword} placeholder='Password' style={{border : hasPassword ? '1px solid red': null}}/>
            <Button disabled={permittedLogin} isActive={!permittedLogin ? 2 : 0} onClick={loginHandler}> Log in </Button>
          </form>
        </>
      }
      { type != 1 && <Button onClick={()=>handleChangeType(1)} isActive={true}> Register </Button> }
      { type == 1 &&
        <>
          {errorHandler && <p className={classes.error}>{errorHandler}</p>}
          {loading && <p>Loading...</p>}  
          <form className={classes.container}>
            <Input type='text' value={name} onChange={handleChangeFormName} placeholder='Your name' style={{border : hasName ? '1px solid red': null}}/>
            <Input type='text' value={phone} onChange={handleChangeFormPhone} placeholder='Phone' style={{border : hasPhone ? '1px solid red': null}}/>
            <Input type='password' value={password} onChange={handleChangeFormPassword} placeholder='Password' style={{border : hasPassword ? '1px solid red': null}}/>
            <Input type='password' value={repeated_password} onChange={handleChangeFormRepeatedPassword} placeholder='Repeat password' style={{border : hasRepeatedPassword ? '1px solid red': null}}/>
            <Button disabled={permittedRegister} isActive={!permittedRegister ? 2 : 0} onClick={registerHandler}> Register </Button>
          </form>
          
        </>
      }
      </section>
    </>
  )
}


