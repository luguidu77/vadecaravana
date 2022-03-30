import React, { useEffect, useState } from 'react'

import { v4 as uuidv4 } from 'uuid';

import {firebase, db} from '../firebase/config-firebase'



const AgregaCardAlbum = ({log, publicacion}) => {
 
 // la props publicacion me sirve para saber si se esta editando una publicacion

  const idEntrada = uuidv4()

  const currentUser =  firebase.auth().currentUser

  const [deshabilitaBoton, setdeshabilitaBoton] = useState(false)

  const [uploadvalue, setuploadvalue] = useState(0)
  const [message, setmessage] = useState('')
  const [controlSubida, setcontrolSubida] = useState(false)
  const [cardSubida, setCardSubida] = useState('añadir')
  const [url_1, setUrl_1] = useState('')

  const [editandoTextBoton, setEditandoTextBoton] = useState(false)

  
  const [idDoc, setIdDoc] = useState('')
 
  const [datos, setDatos] = useState({
   id: idDoc,
   titulo:"",
   texto:"",
   fecha:"",
   url_1:"",
   dia:"",
   kms:"",
   lugar:"",
   
  })

 // (publicacion) lo traigo de los props del AlbumScreen(padre)
 //si publicacion es diferente de indefinido es que se esta editando la publicacion 
  useEffect(() => {
    if (publicacion){
      //setea los datos de la publicacion selecionada a editar
      setDatos(publicacion)

      //cambia texto boton formulario
      setEditandoTextBoton(true)

      
    }
  }, [publicacion])
  

   // alerta boostrap para poner mensajes debajo del boton seleccionar archivo
   // lo dispara, ej: alert('Nice, you triggered this alert message!', 'success')
  var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)
  }
 
 


  //captura datos del formulario
  const handleChange = e =>{
    setDatos({
      ...datos,
      [e.target.name] : e.target.value,
      fecha: Date.now()
    })
   
    console.log(datos);
  }

  //agrega en Firestore, datos capturados del formulario en Firestore(email usuario-entrada_idEntrada-...)
  const handleAgregar = e =>{
    e.preventDefault()
     
     guardar( datos )
     

   
  }

  
    const guardar = (datos)=>{
      setCardSubida('guardando')

      db.collection(currentUser.email).doc('entradas').collection('cardAlbum').doc(idDoc).set({ datos })
        .then(() => {
          setCardSubida('listo')
         
          alert('Publicación guardada correctamente')
          //refresca pagina 
          window.location.href = window.location.href;
         
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }

//guarda URL en Firestore de la imagen subida a Store
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

    // maneja subir imagen en store
  const handleOnChange = e =>{
      const file = e.target.files[0]
      var stRef = firebase.storage().ref();
      const storageRef = stRef.child(`pictures/${currentUser.email}/${file.name}`)
      const task = storageRef.put(file)
  
      task.on('state_changed', (snapshot)=>{
        let porcentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setuploadvalue(porcentage)
      },(error) =>{
        setmessage(`Ha ocurrido un error: ${error.message}`)
        alert('Vaya, no se ha podido guardar!', 'danger')
      },() =>{
        setcontrolSubida(true)
        
       
        const storage = firebase.storage()
        const pathReference= storage.ref(`pictures/${currentUser.email}/${file.name}`)

        
          pathReference.getDownloadURL().then(url => {
            setUrl_1(url)
            if(!publicacion){
              setIdDoc(idEntrada)
                setDatos(
              {...datos,
               id:idEntrada,
               url_1:url,
              }
            )
            } else{
              setIdDoc(publicacion.id) 
              setDatos(
                {...datos,
                 id:idDoc,
                 url_1:url,
                }
              )
            }
          
            guardarImagen('UNO', url)
          })
        
         alert(`Perfecto, imagen ${file.name} lista!`, 'secondary')
      })
    
  }

 
  return (
    
    <>
      

      {
          log ? 
          
          <div className='container mt-3'  >
            <label htmlFor="formFile" className="form-label">Sube tres imagenes de cabecera (formato jpg 000px X 000px)</label>
            <br />
            <progress value={uploadvalue} max='100'></progress>
            <br />
            <input className='btn btn-info form-control' type='file' onChange={handleOnChange}></input>
            <br />
            <br />
            <div id="liveAlertPlaceholder"></div>
            <br />
            <img src={url_1} style={{width:150}} alt="" />
          </div>
            
          : <div></div>

     }    
         <br />
     {
       
          log ? 
            <div className='container'>
              
              <form>
              <div className="form-group mb-3">
                <input 
                value={datos.titulo}
                name='titulo'
                onChange={handleChange}
                type="text" 
                className="form-control" id="tituloHeader"  
                placeholder="Viaje Selva Negra 13 jul - 13 sep 2021" />
                <small id="tituloHelp" className="form-text text-muted">coloca el títitulo del viaje y las fechas.</small>
              </div>

             
              <div className="form-group">
                <textarea 
                  value={datos.texto}
                  name='texto'
                  onChange={handleChange}
                  className="form-control" 
                  id="textoHeader" />
                </div>
                <br />
                <input 
                  value={datos.dia}
                  name='dia'
                  onChange={handleChange}
                  type="number" 
                  className="form-control" 
                  d="dia"  
                  placeholder="Día (ej: 1,2,3...)" />
                <br />
                <input 
                value={datos.kms}
                  name='kms'
                  onChange={handleChange}
                  type="text" 
                  className="form-control" 
                  id="kms"  
                  placeholder="Kms recorridos (ej: 250 )" />
                <br />
                <input 
                value={datos.lugar}
                  name='lugar'
                  onChange={handleChange}
                  type="text" 
                  className="form-control" 
                  id="lugar"  
                  placeholder="Camping o lugar (ej: Camping Vivir, paraje ... )" />
                <br />
                <input 
                  value={datos.combustible}
                  name='combustible'
                  onChange={handleChange}
                  type="text" 
                  className="form-control" 
                  id="combustible"  
                  placeholder="Combustible consumido en euros (ej: 40, 60 ... )" />
                <br />
                <select 
                  value={datos.formatoEntrada}
                  name='formatoEntrada'
                  onChange={handleChange}
                  className="form-select" 
                  aria-label="Default select example">
                        <option defaultValue={1}>Formato de la publicación</option>
                        <option value={1}>Texto superior, foto izquierda y datos a derecha</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                </select>
                <br />
             
            {
             ( ()=>{
                switch (cardSubida) {
                  case 'añadir':
                    return(
                      <button 
                        onClick={handleAgregar}
                        type="submit"
                        className="btn btn-primary" 
                        disabled={!controlSubida}>
                          {(editandoTextBoton) ? 'Editar' : 'Añadir publicación'}
                      </button>
                    )

                  case 'guardanto':
                     return(
                        <button 
                          class="btn btn-primary" 
                          type="button" disabled>
                          <span class="spinner-grow spinner-grow-sm" ></span>
                           Guardando...
                       </button>
                     )
                  case 'listo':
                    return(

                      <button 
                        class="btn btn-success" 
                        type="button" disabled>
                           Guardado
                      </button>
                    )
                        }
              })()
              
            }

                           
                           
              
            </form>
            </div> 
            
          : <div></div>
         }


    
     
    
    
    </>
    
  )
}

export default AgregaCardAlbum