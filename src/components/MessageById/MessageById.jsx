import { useState, useEffect } from 'react'
import axios from 'axios'
import classes from './MessageById.module.css'
const API_URL = 'http://127.0.0.1:8000/api/';
export default function MessageById({data, ...props}) {
  const [sender, setSender] = useState('')
  const [isEdited, setIsEdited] = useState(null)
  const [isRead, setIsRead] = useState(null)
  const [encrypted, setEncrypted] = useState(null)
  const [created, setCreated] = useState(null)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const messageResponse = await axios.get(`${API_URL}messages/get_message?message_id=${data.message_id}`, { withCredentials: true });
        const messageResult = messageResponse.data;

        if (messageResult.status !== 'error') {
          const message = messageResult.data.message;
          setIsEdited(message.is_edited);
          setIsRead(message.is_read);
          setEncrypted(message.encrypted_message);
          setCreated(message.created_at);

          const senderResponse = await axios.get(`${API_URL}profiles/get_user_by_id?arg=${message.sender}`, { withCredentials: true });
          const senderResult = senderResponse.data;

          if (senderResult.status !== 'error') {
            setSender(senderResult.data.user.name);
          } else {
            console.error('Error fetching sender data:', senderResult);
          }
        } else {
          console.error('Error fetching message data:', messageResult);
        }
      } catch (error) {
        console.error('Error in fetchMessage:', error);
      }
    };

    fetchMessage();
  }, [data.message_id]);

  return (
    <>
    <section className={classes.container}>
      <section className={`${classes.message}  ${classes.content} ${classes.item}`}>
      <p className={`${classes.sender}`}>{sender}</p>
      <p className={`${classes.text}`}> {encrypted}</p>
      </section>
      <section className={`${classes.item}`}>
      <section>
      <p className={`${classes.item} ${classes.metainfo}`}>{isRead ? null : 'not read' }</p>
      <p className={`${classes.item} ${classes.metainfo}`}>{created}</p>
      </section>
      <p className={`${classes.item} ${classes.metainfo}`}>{isEdited ? 'edited' : null} </p>
      </section>
      </section>
    </>
    )
}