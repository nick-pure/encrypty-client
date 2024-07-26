import { useState } from 'react'
import './index.css'
import LoginForm from './components/LoginForm/LoginForm'
import Header from './components/Header/Header'
import HtmlHeader from './components/HtmlHeader'

export default function App() {
  let isLoggedin = false
  const [count, setCount] = useState(0)


  return (
    <>
      <HtmlHeader />
      {!isLoggedin && <LoginForm />}
    </>
  )
}


