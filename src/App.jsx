import { useState, useEffect } from 'react'
import './index.css'
import classes from './App.module.css'
import LoginForm from './components/LoginForm/LoginForm'
import HtmlHeader from './components/HtmlHeader'
import Chats from './components/Chats/Chats'
import Search from './components/Search/Search'
import CurrentChat from './components/CurrentChat/CurrentChat'
import Logout from './components/Logout/Logout'
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeChat, setActiveChat] = useState(null)
  function onIsAuthenticatedChange(new_result) {
    setIsAuthenticated(new_result)
  }
  return (
    <>
      <HtmlHeader />
      {!isAuthenticated && <LoginForm onIsAuthenticatedChange={onIsAuthenticatedChange}/>}
      {isAuthenticated && 
      <>
        <section className={classes.bar}>
          <Logout onIsAuthenticatedChange={onIsAuthenticatedChange}/>
        <Search/>
        </section>
        <section className={classes.container}>
        <Chats setActiveChat={setActiveChat}/>
        {activeChat && <CurrentChat activeChat={activeChat} setActiveChat={setActiveChat}/>}
        </section>
      </>
      }
    </>
  )
}


