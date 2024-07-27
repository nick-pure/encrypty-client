import { useState } from 'react'
import classes from './Header.module.css'
export default function Header({...props}) {
  return (
    <>
          <h1 className={classes.header}> Encrypty</h1>
          <p className={classes.p}>Messenger with encryption.</p>
    </>
  )
}


