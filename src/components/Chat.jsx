import { useState } from 'react'

export default function HtmlHeader({...props}) {
  const login = useCallback(async () => {
    setLoading(true)
    const myHeaders = new Headers();
    const formdata = new FormData();
    formdata.append("phone", phone);
    formdata.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      credentials: 'include',
      body: formdata,
      redirect: "follow"
    };

    let resp = await fetch("http://127.0.0.1:8000/api/profiles/login/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result['status'] == 'error') {
          setErrorHandler(result['info']['error'])
        } else {
          setErrorHandler('')
          onIsAuthenticatedChange(true)
          setType(0)
        }
      })
      .catch((error) => console.error(error));
    setLoading(false)
  }, [phone, password])

  return (
    <>
    </>
    )
}