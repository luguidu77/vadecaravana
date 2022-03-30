import React, { useEffect, useState } from 'react'

import {firebase, db} from '../firebase/config-firebase'

const TextHeader = ({log}) => {
  const emailAdmin = 'prueba@email.com'

  const [visible, setvisible] = useState(false)

  const [titulo, settitulo] = useState('')
  const [texto, settexto] = useState('')

  const currentUser =  firebase.auth().currentUser
  const [datos, setDatos] = useState({
    titulo: '',
    texto: ''
})
  const handleModificar = e =>{
    e.preventDefault()
    
    abreFormulario()
    
  }

  const abreFormulario =() =>{
     (!visible) ? setvisible(true) : setvisible(false)

     datos.titulo = titulo
     datos.texto  = texto
  }

  const handleChange = e =>{
    setDatos({
      ...datos,
      [e.target.name] : e.target.value
    })
  }
 
  const handleAgregar = e =>{
    e.preventDefault()
      guardar(datos.titulo, datos.texto)
    
  }
  
      const guardar = (titulo, texto)=>{
        settitulo(titulo)
        settexto(texto)
        // Add a new document in collection "cities"
          db.collection(currentUser.email).doc('textoHeader').set({
          titulo,
          texto,
        })
        .then(() => {
          
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      }



  useEffect(() => {
    const actualiza =()=>{
       db.collection(emailAdmin).doc('textoHeader').get().then((doc)=>{
      if (doc.exists) {
        const data = doc.data()
        settitulo(data.titulo)
        settexto(data.texto)

      
      }else{
        const tituloModelo='Titulo del viaje y su fecha'
        const textoModelo='Resumen de tu viaje'
        settitulo(tituloModelo)
        settexto(textoModelo)
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    }
   

    actualiza()

  }, [])
  

  return (
    <div>
        <h2>{titulo}</h2>
        <p className="text-justify">{texto}</p>

       {
          log ?  <button 
                    onClick={handleModificar}
                    className={!visible ? "btn btn-danger" : "btn btn-success"}>
                      {
                        (!visible)    ? 'Modificar': 'Cerrar'
                      }  
                 </button>
          :null

       } 
       
        {
          log && visible ? 
          
            <div className='container card p-3 mt-3'>
              <br />
              <form>
              <div className="form-group mb-3" >
                <small id="tituloHelp" className="form-text text-muted">Título del viaje y las fechas.</small>
                <input 
                value={datos.titulo}              
                onChange={handleChange}
                name='titulo'
                type="text" 
                className="form-control" 
                id="tituloHeader"  
                placeholder="Viaje Selva Negra 13 jul - 13 sep 2021" />
                
              </div>
             
              <div className="form-group">
              <small id="tituloHelp" className="form-text text-muted">Resumen de tu viaje.</small>
                <textarea 
                value={datos.texto}    
                onChange={handleChange}
                name='texto'
                className="form-control" 
                id="textoHeader" />
              </div>
              <br />
              <button 
                  onClick={handleAgregar}
                  type="submit" 
                  className="btn btn-info">
                 Aceptar
              </button>
              
             
             
            </form>
            </div> 
            
          : <div></div>
         }
    </div>
  )
}

export default TextHeader