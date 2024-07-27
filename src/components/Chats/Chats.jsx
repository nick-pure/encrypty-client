import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Chat from '../Chat/Chat';
import classes from './Chats.module.css'
const API_URL = 'http://127.0.0.1:8000/api/';

export default function Chats({ setActiveChat, ...props }) {
  const [chats, setChats] = useState([]);

  const fetchChats = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}messages/get_chats/`, { withCredentials: true });
      const result = response.data;

      if (result.status !== 'error') {
        setChats(result.data);
      } else {
        console.error('Error fetching chats:', result);
      }
    } catch (error) {
      console.error('Error in fetchChats:', error);
    }
  }, []);

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 5000); // Polling every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [fetchChats]);

  return (
    <>
    
    <ul className={classes.chats}>
    <p className={classes.header}>Your chats</p>
      {chats.map((chat) => (
        <Chat key={chat.id} data={chat} setActiveChat={setActiveChat} />
      ))}
    </ul>
    </>
  );
}
