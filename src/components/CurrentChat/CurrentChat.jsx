import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/';
import classes from './CurrentChat.module.css'
import Message from '../Message/Message';
import InputMessage from '../InputMessage/InputMessage';
export default function CurrentChat({ activeChat, setActiveChat, ...props }) {
  const [messages, setMessages] = useState([]);

  function handlerClose() {
    setActiveChat(null)
  }

  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}messages/get_chat?chat_id=${activeChat}`, { withCredentials: true });
      const result = response.data;

      if (result.status !== 'error') {
        setMessages(result.data.messages);
      } else {
        console.error('Error fetching messages:', result);
      }
    } catch (error) {
      console.error('Error in fetchChats:', error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Polling every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchMessages]);

  return (
    <>
    
    <ul className={classes.messages}>
    <section className={`${classes.container}`}>
    <p className={classes.header}>Current chat</p>
    <button onClick={handlerClose} className={classes.close}>Close</button>
    </section>
    <section className={classes.content}>
      {messages.map((message) => (
        <Message key={message.id} data={message}/>
      ))}
      </section>
      <InputMessage activeChat={activeChat}/>
    </ul>
    </>
  );
}
