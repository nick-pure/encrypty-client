import { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Message.module.css'
const API_URL = 'http://127.0.0.1:8000/api/';

export default function Message({ data, ...props }) {
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false)

  const [message, setMessage] = useState('')
  const [hasMessage, setHasMessage] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}profiles/get_user_by_id?arg=${data.sender}`, { withCredentials: true });
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

  function changeIsEdit() {
    setIsEditing(!isEditing)
  }
  const submit = async (enc_message) => {
      try {
          const headers = new Headers();
          headers.append("Content-Type", "multipart/form-data")
          const formdata = new FormData();
          formdata.append("message_id", data.id);
          formdata.append("new_message", enc_message);
          let resp = await axios({
            method: 'post',
            url: `${API_URL}messages/edit_text/`,
            data: formdata,
            withCredentials: true,
            headers: headers,
          }).then((response) => response['data'])
            .then((response) => {
              if (response['status'] == 'error') {
              } else {
                setMessage('')
                setIsEditing(false)
                data.encrypted_message = enc_message
              }
            })
            .catch((response) => {
              console.log(response)
            });
      
      } catch (error) {
        console.error('Error logging in', error);
        return false;
      } 
    };
  function handlerSubmit() {
      submit(message)
  }
  function handleChangeMessage(event) {
      setMessage(event.target.value)
      setHasMessage(event.target.value.trim   ().length != 0)
    }
  return (
    <>
    <section className={`${classes.container} ${data.amISender ? classes.sender : classes.receiver}`}>
      <section className={`${classes.message}  ${classes.content} ${classes.item}`}>
      <p> {data.encrypted_message}</p>
      </section>
      <section className={`${classes.item} ${classes.meta}`}>
      <section>
      <p className={`${classes.item} ${classes.metainfo}`}>{data.is_read ? null : 'not read' }</p>
      <p className={`${classes.item} ${classes.metainfo}`}>{data.created_at}</p>
      </section>
      <p className={`${classes.item} ${classes.metainfo}`}>{data.is_edited ? 'edited' : null} </p>
      <button className={classes.edit} onClick={changeIsEdit}>{isEditing ? 'cancel' : 'edit'}</button>
      </section>
      
      </section>
      {isEditing && 
      <section className={classes.container2}>   
      <input 
        type='text'
        value={message}
        onChange={handleChangeMessage}
        className={classes.control}
      />
      <button className={classes.submit} disabled={!hasMessage} onClick={handlerSubmit}>Send</button>
    </section>
      }
    </>
  );
}
