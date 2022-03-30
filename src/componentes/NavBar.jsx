import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Route, Navigate, useNavigate} from 'react-router-dom'
import { logout } from '../actions/auth'
import { AuthContext } from '../context/AuthContext'
import LoginScreen from '../pages/LoginScreen'
import { authTypes } from '../types/authTypes'

const NavBar = ({log, correo}) => {
 const Navigate = useNavigate()
 const dispatch = useDispatch()
 
  const handleLogin =()=>{
    Navigate('/admin')
  }

  const handleLogout =()=>{
    dispatch(logout())
  }

  return (
    
     <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid">
          <h2 className="navbar-brand" href="#">VaDeCaravana</h2>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink 
                
                className={({isActive})=>`nav-link ${isActive ? 'active text-white' : ''}` }
                aria-current="page" 
                to="/resumen">
                  Resumen
                </NavLink>
              </li>
              <li className="nav-item">
              <NavLink 
                
                className={({isActive})=>`nav-link ${isActive ? 'active text-white' : ''}` }
                aria-current="page" 
                to="/album">
                  Álbum
                </NavLink>
              </li>
      
            </ul>

          {log &&   
              <span className="d-flex m-1" >{correo} </span>}

            <div className='d-flex'>
             {
                log? 
               <button className='btn btn-danger' onClick={handleLogout}>
                  Logout</button>
              : <button className='btn btn-primary' onClick={handleLogin}>
                  Admin</button> 
             }  
            </div>
          </div>
        </div>
      </nav>
   
  )
}

export default NavBar