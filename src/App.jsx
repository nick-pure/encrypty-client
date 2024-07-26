import { useState, useEffect } from 'react'
import './index.css'
import LoginForm from './components/LoginForm/LoginForm'
import HtmlHeader from './components/HtmlHeader'
import Chats from './components/Chats'
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function onIsAuthenticatedChange(new_result) {
    setIsAuthenticated(new_result)
  }
  console.log(isAuthenticated)
  return (
    <>
      <HtmlHeader />
      {!isAuthenticated && <LoginForm onIsAuthenticatedChange={onIsAuthenticatedChange}/>}
      {isAuthenticated && 
      <>
        <Chats isAuthenticated={isAuthenticated}/>
      </>
      }
    </>
  )
}


