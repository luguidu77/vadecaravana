import React, { useState } from 'react'
import {useDispatch} from 'react-redux'

/* import GoogleButton from 'react-google-button' */
import { googleLogin, emailAndPasswordLogin } from '../actions/auth'
import { useNavigate } from 'react-router-dom'

const LoginScreen = ({log}) => {
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setdata] = useState({
      email:'',
      password:'',
  })   

  const {email, password} = data

  const handleChange = (e) =>{
    const value = e.target.value

    setdata({
        ...data,
        [e.target.name]:value
    })

   
  }

  const handleEmailLogin=(e)=>{
       e.preventDefault()

      if(email.trim() === '' || !email.trim().includes('@')){
          return;
      }

      if (password.trim().length < 6) {
         return;
      }
      console.log('enviado');

    dispatch(emailAndPasswordLogin(email, password))
    
   

  }

  
   
 /*  const handleGoogleLogin =()=>{
     dispatch(googleLogin())
  } */

  return (
   !log? <div className='container'>
       <h1>Login</h1> 
       <hr/>
       <div className='row'>

       <form onSubmit={handleEmailLogin} className='col-6' >
            <div>
              <div className="form-floating mb-3">
                <input 
                name='email'
                value={email}
                onChange={handleChange}
                type="email" 
                className="form-control" 
                id="floatingInput" 
                placeholder="name@example.com" />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input 
                name='password'
                value={password}
                onChange={handleChange}
                type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password" />
                <label htmlFor="floatingPassword">Password</label>
              </div>
            </div>
            <br />
            <button 
            
            type='submit' 
            className='btn btn-info'>
                Enviar</button>
          <hr />

         
       {/*  <GoogleButton onClick={handleGoogleLogin}/>  
         */}

        </form>
       
        
       </div>
       
    </div>

    :<div className='container text-center pt-5'>
      
     
         Estas loguead@ 
      
      
       
    </div>
  )
}

export default LoginScreen