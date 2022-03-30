import React, { useEffect, useReducer } from 'react'
import {Provider} from 'react-redux'



import LoginRouter from "./routes/LoginRouter";


import { store } from './store/store';



const App = () => {

 

  return (
    
    <Provider store={store }>
      <LoginRouter />
    </Provider>

  
  )
}

export default App