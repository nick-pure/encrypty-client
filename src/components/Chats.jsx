import { useState, useCallback, useEffect } from 'react'

export default function Chats({isAuthenticated, ...props}) {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)

    
  const fetchChats = useCallback(async () => {
    setLoading(true)
    const myHeaders = new Headers();
    const formdata = new FormData();

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      credentials: 'include',
      body: formdata,
      redirect: "follow"
    };

    let resp = await fetch("http://127.0.0.1:8000/api/messages/get_chats/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result['status'] == 'error') {
        } else {
            console.log(result)
          setChats(result['data'])
        }
      })
      .catch((error) => console.error(error));
    setLoading(false)
  }, [])

  
  let updates = setInterval(()=>fetchChats(), 1000)
  return (
    <>
    {loading && <p>Loading...</p>}
    {!loading &&
    <>
            <ul>
            {chats
              .map((chat) => (
                <li key={chat.id}>{chat.id}</li>
              ))}
          </ul>
    </>
    }
    </>
    )
}