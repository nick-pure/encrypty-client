import { useState } from 'react'
import classes from './InputMessage.module.css'
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000/api/';
export default function InputMessage({activeChat, ...props}) {
    const [message, setMessage] = useState('')
    const [hasMessage, setHasMessage] = useState(false)
    const submit = async (enc_message) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "multipart/form-data")
            const formdata = new FormData();
            formdata.append("chat_id", activeChat);
            formdata.append("message", enc_message);
            let resp = await axios({
              method: 'post',
              url: `${API_URL}messages/send_text/`,
              data: formdata,
              withCredentials: true,
              headers: headers,
            }).then((response) => response['data'])
              .then((response) => {
                if (response['status'] == 'error') {
                } else {
                  setMessage('')
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
        <section className={classes.container}>   
          <input 
            type='text'
            value={message}
            onChange={handleChangeMessage}
            className={classes.control}
          />
          <button className={classes.submit} disabled={!hasMessage} onClick={handlerSubmit}>Send</button>
        </section>
    </>
  )
}


