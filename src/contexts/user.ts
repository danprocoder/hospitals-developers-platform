import * as React from 'react'

export const UserContext = React.createContext({
  firstname: '',
  lastname: '',
  isLoggedIn: false
})
