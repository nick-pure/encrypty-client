import { useState } from 'react'
import './index.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/Registration/RegisterForm'

export default function App() {
  let isLoggedin = false
  const [count, setCount] = useState(0)


  return (
    <>
      {!isLoggedin && <LoginForm />}
      {!isLoggedin && <RegisterForm />}
    </>
  )
}


