import { useState } from 'react'

export default function User({data, ...props}) {
 
    const [name, setName] = useState('')

    const fetchUser = async () => {

        let resp = await axios.get(`${API_URL}profiles/get_user_by_id?arg=${data.id}`, { withCredentials: true })
          .then((response) => response.data)
          .then((result) => {
            if (result['status'] == 'error') {
            } else {
                setName(result['name'])
            }
          })  
          .catch((error) => console.error(error));
      }
  
  return (
    <>
      <button></button>
    </>
    )
}