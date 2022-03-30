import React, { useEffect, useState } from 'react'

import Carousel from './Carousel'
import {firebase, db} from '../firebase/config-firebase'
import 'firebase/compat/storage';
import 'firebase/compat/auth';


const HeaderResumen = ({log, correo}) => {

  const emailAdmin = 'prueba@email.com'



  const currentUser =  firebase.auth().currentUser
 
  const [uploadvalue1, setuploadvalue1] = useState(0)
  const [message1, setmessage1] = useState('Listo')
  const [uploadvalue2, setuploadvalue2] = useState(0)
  const [message2, setmessage2] = useState('Listo')
  const [uploadvalue3, setuploadvalue3] = useState(0)
  const [message3, setmessage3] = useState('Listo')
  const [url_1, setUrl_1] = useState('')
  const [url_2, setUrl_2] = useState('')
  const [url_3, setUrl_3] = useState('')


  
// pinta las fotos del header si existen en Firestore
  useEffect(() => {
    
         

           db.collection(emailAdmin).doc('fotoHeaderUNO').get().then((doc)=>{
              if (doc.exists || doc.data.length!==1) {
                const data = doc.data()
                setUrl_1(data.url)

                console.log(doc.data.length);
              
              }else{
                const url='https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                setUrl_1(url)
              }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            db.collection(emailAdmin).doc('fotoHeaderDOS').get().then((doc)=>{
              if (doc.exists || doc.data.length!==1) {
                const data = doc.data()
                setUrl_2(data.url)
              
              }else{
                const url='https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                setUrl_2(url)
              }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            db.collection(emailAdmin ).doc('fotoHeaderTRES').get().then((doc)=>{
              if (doc.exists || doc.data.length!==1) {
                const data = doc.data()
                setUrl_3(data.url)
              
              }else{
                const url='https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                setUrl_3(url)
              }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
 
    
  }, [url_1,url_2,url_3])
   
//GUARDAR URL DE IMAGENES EN FIRESTORE
  const guardarImagen = (num, url)=>{

    // Add a new document in collection "cities"
      db.collection(currentUser.email).doc(`fotoHeader${num}`).set({
      url: url,
    })
    .then(() => {
      
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }


  const handleOnChange1 = e =>{
    const file = e.target.files[0]
    var stRef = firebase.storage().ref();
    const storageRef = stRef.child(`pictures/${currentUser.email}/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot)=>{
      let porcentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setuploadvalue1(porcentage)
    },(error) =>{
      setmessage1(`Ha ocurrido un error: ${error.message}`)
    },() =>{
      setmessage1(`Archivo subido !`)
     
      const storage = firebase.storage()
      const pathReference= storage.ref(`pictures/${currentUser.email}/${file.name}`)
        pathReference.getDownloadURL().then(url => {
          setUrl_1(url)
          guardarImagen('UNO', url)
        })
      
       
    })
  
  }

  const handleOnChange2 = e =>{
    const file = e.target.files[0]
    var stRef = firebase.storage().ref();
    const storageRef = stRef.child(`pictures/${currentUser.email}/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot)=>{
      let porcentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setuploadvalue2(porcentage)
    },(error) =>{
      setmessage2(`Ha ocurrido un error: ${error.message}`)
    },() =>{
      setmessage2(`Archivo subido !`)
     
      const storage = firebase.storage()
      const pathReference= storage.ref(`pictures/${currentUser.email}/${file.name}`)
        pathReference.getDownloadURL().then(url => {
          setUrl_2(url)
          guardarImagen('DOS', url)
        })
     
    })
  
  }

  const handleOnChange3 = e =>{
    const file = e.target.files[0]
    var stRef = firebase.storage().ref();
    const storageRef = stRef.child(`pictures/${currentUser.email}/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot)=>{
      let porcentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      setuploadvalue3(porcentage)
    },(error) =>{
      setmessage3(`Ha ocurrido un error: ${error.message}`)
    },() =>{
      setmessage3(`Archivo subido !`)
     
      const storage = firebase.storage()
      const pathReference= storage.ref(`pictures/${currentUser.email}/${file.name}`)
      pathReference.getDownloadURL().then(url => {
        setUrl_3(url)
        guardarImagen('TRES', url)
      })
     
    })
  
  }
  
  
  
  return (


    <div>
        {
           <Carousel urlFoto={
             {
               url: url_1,
               url2: url_2,
               url3: url_3,
             }
           }/>
        }
         <br />
        {
          log ? 
          <div className='container row'>

            <div className='col-sm-4 mt-3'  >
              <label htmlFor="formFile" className="form-label">Sube tres imagenes de cabecera (formato jpg 000px X 000px)</label>
              <br />
              <progress value={uploadvalue1} max='100'></progress>
              <br />
              <input  type='file' onChange={handleOnChange1}></input>
              <br />
              {message1}
              <br />
              <img src={url_1} style={{width:150}} alt="" />
            </div>

            <div className='col-sm-4 mt-3'  >
              <label htmlFor="formFile" className="form-label">Sube tres imagenes de cabecera (formato jpg 000px X 000px)</label>
              <br />
              <progress value={uploadvalue2} max='100'></progress>
              <br />
              <input  type='file' onChange={handleOnChange2}></input>
              <br />
              {message2}
              <br />
              <img src={url_2} style={{width:150}} alt="" />
            </div>

            <div className='col-sm-4 mt-3'  >
              <label htmlFor="formFile" className="form-label">Sube tres imagenes de cabecera (formato jpg 000px X 000px)</label>
              <br />
              <progress value={uploadvalue3} max='100'></progress>
              <br />
              <input  type='file' onChange={handleOnChange3}></input>
              <br />
              {message3}
              <br />
              <img src={url_3} style={{width:150}} alt="" />
            </div>
         
          </div>
         
          : <div></div>
        }
        <br />
    </div>
  )
}

export default HeaderResumen