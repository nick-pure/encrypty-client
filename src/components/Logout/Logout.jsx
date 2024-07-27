import { useState, useCallback, useEffect } from 'react'
import classes from './Logout.module.css'
import axios from 'axios'
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000/api/';

export default function Logout({onIsAuthenticatedChange}) {

  function handleLogout() {

const logout = async () => {
  try {
      const headers = new Headers();
      headers.append("Content-Type", "multipart/form-data")
      const formdata = new FormData();
      let resp = await axios({
        method: 'post',
        url: `${API_URL}profiles/logout/`,
        data: formdata,
        withCredentials: true,
        headers: headers,
      }).then((response) => response['data'])
        .then((response) => {
          if (response['status'] == 'error') {
            setErrorHandler(response['info']['error'])
          } else {
            onIsAuthenticatedChange(false)
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
    logout()
  }
  return (
    <>
      <button className={classes.button} onClick={handleLogout}>
        Log out
      </button>
    </>
  )
}


