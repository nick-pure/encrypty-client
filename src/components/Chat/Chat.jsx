import { useState, useEffect } from 'react';
import axios from 'axios';
import MessageById from '../MessageById/MessageById';
import classes from './Chat.module.css'
const API_URL = 'http://127.0.0.1:8000/api/';

export default function Chat({ data, setActiveChat, ...props }) {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}profiles/get_user_by_id?arg=${data.participant}`, { withCredentials: true });
        const result = response.data;
        
        if (result.status !== 'error') {
          setName(result.data.user.name);
        } else {
          console.error('Error fetching user data:', result);
        }
      } catch (error) {
        console.error('Error in fetchUser:', error);
      }
    };

    fetchUser();
  }, [data.participant]); 

  const handleSetActiveChat = (id) => {
    setActiveChat(id);
  };

  return (
    <button className={classes.chat} onClick={() => handleSetActiveChat(data.id)}>
      <p className={classes.participant}>{name}</p>
      <MessageById data={{ message_id: data.last_message }} />
    </button>
  );
}
