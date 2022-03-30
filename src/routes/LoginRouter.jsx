import React, { useContext, useEffect, useState } from 'react'

import { BrowserRouter as Router, Routes , Route, Navigate, useNavigate, NavLink} from "react-router-dom";
import {firebase} from '../firebase/config-firebase'

import NavBar from '../componentes/NavBar';
import { AuthContext } from '../context/AuthContext';
import AlbumScreen from '../pages/AlbumScreen';
import LoginScreen from '../pages/LoginScreen';
import ResumenScreen from '../pages/ResumenScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';




const LoginRouter = () => {
 

  const dispatch = useDispatch()

  const [log, setLog] = useState(false)
  const [correo, setCorreo] = useState('')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          dispatch(login(user.uid, user.displayName, user.email))

          setLog(true)
          setCorreo(user.email)
                  
        }else{
          setLog(false)
        }
       
    }
   )
  
    
  }, [dispatch])
  
  

 
  return (
      
   
      <>
      <Router>
        <NavBar log={log} correo={correo}/>
        <Routes>
              <Route end path="*"        element={ <Navigate to="/resumen"/>    }/>
              <Route end path="/admin"   element={ <LoginScreen  log={log}  /> }/>
              <Route end path="/resumen"  element={ <ResumenScreen log={log} correo={correo}/>  }/>
              <Route end path="/album"   element={ <AlbumScreen log={log}  /> }/>  
              
            
        </Routes>
 
      </Router>
       
      </>
        
    
  )
}

export default LoginRouter