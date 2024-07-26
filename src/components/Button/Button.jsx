import { useState } from 'react'
import classes from './Button.module.css'
export default function Button({children, isActive, ...props}) {
  return (
    <>
          <button 
            {...props}
            className={isActive == 1 ? `${classes.active} ${classes.button}` : isActive == 2 ? `${classes.veryactive} ${classes.button}` : `${classes.button}`}
          >
            {children}
          </button>
    </>
  )
}


