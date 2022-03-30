import { useEffect, useState } from 'react';
import {firebase, db} from '../firebase/config-firebase'
import { v4 as uuidv4 } from 'uuid';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import Carousel from './Carousel'
import icoResumen from "../assets/resumen.png";
import icoCamping from "../assets/camping.png";
import icoCombustible from "../assets/combustible.png";
import icoRuta from "../assets/ruta.png";
import AgregaCardAlbum from './AgregaCardAlbum';

const CardAlbum = (props) => {
    
    const {handleEditar, log} = props

    const [datos, setDatos] = useState({
        id: "",
        titulo:"",
        texto:"",
        fecha:"",
        url_1:"",
        dia:"",
        kms:"",
        lugar:"",
        
       })

  
   const emailAdmin = 'prueba@email.com'
  
   const currentUser =  firebase.auth().currentUser
  
   const [datosCardAlbum, setDatosCardAlbum] = useState([{}])
   const [datosCardAlbumOrdenada, setDatosCardAlbumOrdenada] = useState([{}])
  
  //guardo en matrix todos las entradas
   const auxdatosCardAlbum = []


   
  
  


   useEffect(() => {
    const actualiza =()=>{
       db.collection(emailAdmin).doc('entradas').collection('cardAlbum').get().then((querySnapshot)=>{
         querySnapshot.forEach((doc) => {
       
             if (doc.exists) {
                const data = doc.data()

                auxdatosCardAlbum.push(data.datos)
                  console.log(data.datos.uid);
              }
        }) 
   
           setDatosCardAlbum(auxdatosCardAlbum)
 
           console.log(auxdatosCardAlbum);
           console.log(datosCardAlbum);
        
       }).catch((error) => {
            console.log("Error getting document:", error);
       });


       
       
    }
   

    actualiza()

  }, [])

  useEffect(() => {
   
   
   const ordenar = ()=>{
  

     if(datosCardAlbum.length !== 0 ){

        const cardOrdenados = datosCardAlbum.map(item => item )

        cardOrdenados.sort((a, b) => (a.dia > b.dia ? 1 : a.dia < b.dia ? -1 : 0));
        
    
       (cardOrdenados[0].length !== 0) &&  setDatosCardAlbumOrdenada(cardOrdenados)
        
     }
       
   
   }
   
    ordenar()


  }, [datosCardAlbum])

  


  const handleEliminar =(id, titulo)=>{
    confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
              <h1>Seguro?</h1>
              `<p>Quieres que elimine el titulo {titulo}</p>`
              <button className='btn btn-info' onClick={onClose}>No</button>
              
              <button className='btn btn-danger m-3'
                onClick={() => {
                 
                     db.collection(currentUser.email).doc('entradas').collection('cardAlbum').doc(id).delete().then(() => {
        
                        alert({titulo}+' eliminado correctamente')
                         //refresca pagina 
                         window.location.href = window.location.href;
         

                    }).catch((error) => {
                        alert('El titulo no ha podido ser eliminado : '+ {error})  
                    }); 

                    onClose();
                }}
              >
                Si, eliminalo!
              </button>
            </div>
          );
        }
      });

}



 
  return (
     
    <>
     {
        // uso reverse para invertir la lista de las card empezando con el primer elemento card que se añade
      datosCardAlbumOrdenada.map((item, key) =>{
      
        if(Object.keys(item).length !== 0) {
      
        return <div  key={key} className='container'>
                <br />
                <br />
                {log && <button onClick={()=>handleEliminar(item.id, item.titulo)} className='btn btn-danger'>Elimar publicacion</button>}
                {log && <button onClick={()=>handleEditar(item)} className='btn btn-success m-2'>Editar publicacion</button>}
                <hr />
                    <div className='row'>
        
                        <div className="row-md-6">
                    
                            <div>
                    
                                <h5>{item.titulo}</h5>
                                <p className="text-justify">{item.texto}</p>
                    
                            </div>
                        </div>
            
                    <div className="col-md-9">
                        <div>
                    
                            {
                                //TODO: pasar tambien formato de la card
                                <Carousel urlFoto={
                                    {
                                    idCarousel: uuidv4(),
                                    url:  item.url_1,
                                    url2:  item.url_2,
                                    url3:  item.url_3,
                                   
                                    }
                                }/>
                            }
                
                        </div>
                    </div>


                    <div className="container col-md-3 " style={{background:''}}>
                
                        <div className='row' >
                                <div className='col-2' >
                                    <img src={icoResumen} width='25' alt='resumen.png' />
                                </div>

                                <div className='col-10'>
                                    <h5 className='brown bold'>Día {item.dia}</h5>
                                </div>
                        </div>
                        <div className='row '>
                                <div className='col-2'>
                                    <img src={icoRuta} width='25' alt='ruta.png' />
                                </div>

                                <div className='col-10'>
                                    <h5 className='brown bold'>{item.kms} Kms</h5>
                                </div>
                        </div>
                        <div className='row'>
                                <div className='col-2'>
                                    <img src={icoCamping} width='25' alt='camping.png' />
                                </div>

                                <div className='col-10'>
                                    <h5 className='brown bold'>{item.lugar}</h5>
                                </div>
                        </div>
                        <div className='row ' >
                                <div className='col-2'>
                                    <img src={icoCombustible} width='25' alt='combustible.png' />
                                </div>

                                <div className='col-10'>
                                    <h5 className='brown bold'>{item.combustible} €</h5>
                        </div>
                
                </div> 

                </div>


            
            </div>
            <br />
            <hr />   
        
                            
            </div> 


        }
 
              
            })
            
          
        }
    

      
   
    
    

    </>
  )
}

export default CardAlbum



/* <div className='container'>

       
    <br />
    <hr />
    <div className='row'>
  
     <div className="row-md-6">
            
        <div>
               
            <h5>{titulo}</h5>
            <p className="text-justify">{texto}</p>
   
        </div>
        </div>
       
        <div className="col-md-9">
            <div>
             
                {
                    /* pasarle url de las imagenes 
                    <Carousel urlFoto={
                        {
                          url:  url_1,
                         // url2: url_2,
                         // url3: url_3,
                        }
                      }/>
                }
        
            </div>
        </div>


        <div className="container col-md-3 " style={{background:'beige'}}>
        
            <div className='row' >
                    <div className='col-2' >
                        <img src={icoResumen} width='25' alt='resumen.png' />
                    </div>

                    <div className='col-10'>
                        <h5 className='brown bold'>Día {datos.dia}</h5>
                    </div>
            </div>
            <div className='row '>
                    <div className='col-2'>
                        <img src={icoResumen} width='25' alt='resumen.png' />
                    </div>

                    <div className='col-10'>
                        <h5 className='brown bold'>Kms {datos.kms}</h5>
                    </div>
            </div>
            <div className='row'>
                    <div className='col-2'>
                        <img src={icoResumen} width='25' alt='resumen.png' />
                    </div>

                    <div className='col-10'>
                        <h5 className='brown bold'>{datos.lugar}</h5>
                    </div>
            </div>
            <div className='row ' >
                    <div className='col-2'>
                        <img src={icoResumen} width='25' alt='resumen.png' />
                    </div>

                    <div className='col-10'>
                        <h5 className='brown bold'>COMBUSTIBLE {datos.combustible} €</h5>
            </div>
        
           </div> 

        </div>


       
    </div>
    <br />
    <hr />   
    </div>
 */