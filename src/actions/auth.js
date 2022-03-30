import { authTypes } from "../types/authTypes"

import {firebase, googleAuthProvider} from '../firebase/config-firebase'





export const googleLogin = () =>{
    return (dispatch) =>{
     firebase
        .auth()
        .signInWithPopup(googleAuthProvider)
        .then(({user})=>{
            dispatch(login(user.uid, user.displayName))
        })
    }
}

export const emailAndPasswordLogin =(email, password )=>{
    return (dispatch) =>{
        firebase
           .auth()
           .signInWithEmailAndPassword(email, password)
           .then(({user})=>{

              dispatch(login(user.uid, user.email))
           }).catch(e=> {
               if(e.code==='auth/user-not-found') alert('Los credenciales no son correctos')
           })
       }

}

export const login =(uid, displayName, email) =>{
    return {
        type: authTypes.login,
        payload:{
            uid,
            displayName,
            email
        }
      
    }
}


export const logout =() =>{
    return async (dispatch)=>{
        await firebase.auth().signOut()

        dispatch({
            type: authTypes.logout
        })
    }
}