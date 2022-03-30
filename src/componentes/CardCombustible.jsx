import React, { useEffect, useState } from 'react'

import icoCamping from "../assets/combustible.png";

const CardCombustible = () => {

  const [totaleuros, setTotaleuros] = useState(0)
  const [totalkms, setTotalkms] = useState(0)

  const conCaravana =([
  
    {  
         
       'id': 1,
       'litroscien': 10.5,
       'precio' : 1.25,
       'kms': 5880,
     
       
     },
] )
  const sinCaravana =([
    
    {  
        
      'id': 1,
      'litroscien': 8.5,
      'precio' : 1.25,
      'kms': 880,
    
      
    },
  ] )

   useEffect(() => {

     const sumaTotaleuros = () =>{

     const totalConCarav = parseFloat(conCaravana.map((item)=> (((item.kms/100) * item.litroscien)* item.precio)) )
     const totalsinCarav = parseFloat(sinCaravana.map((item)=> (((item.kms/100) * item.litroscien)* item.precio)) )
      
    
      setTotaleuros((totalsinCarav + totalConCarav).toFixed(0))
      
    }

  sumaTotaleuros()
    
  }, [])
  
  useEffect(() => {

    const sumaTotalKms = () =>{

    const totalConCarav = parseInt(conCaravana.map((item)=> (item.kms) ))
    const totalsinCarav = parseInt(sinCaravana.map((item)=> (item.kms) ))
     
   
     setTotalkms((totalsinCarav + totalConCarav))
     
   }

 sumaTotalKms()
   
 }, [])

 


  return (
    <div className='card  mb-3'>
      <div className='pt-4 text-center'>
        <img src={icoCamping} width='55' alt='combustible.png' />
      </div>
     
     <br/>
        <div >
          <h5 className='red bold text-center'>TOTALES </h5>
          <h5 className='red bold text-center'>{totaleuros} €  </h5>
          <h5 className='red bold text-center'>{totalkms} kms</h5>
            <table className='table table-striped'>
                <thead>
                <tr>
                      <td><p>Circulando con caravana</p></td>
                    </tr>
                    <tr>
                        <td>L/100</td>
                        <td>PRECIO/L</td>
                        <td>KMS</td>
                        <td>TOTAL €</td>
                        
                    </tr>
                </thead>
                <tbody>
                  {
                        conCaravana.map((item)=>
                            <tr  key={item.id}>
                                <td >{item.litroscien}</td>
                                <td >{item.precio}</td>
                                <td >{item.kms}</td>
                                <td >{(((item.kms/100) * item.litroscien)* item.precio).toFixed(2)}</td>
                               
                           </tr>
                           
                          )
                       /* rutaprueba.ruta[1].FECHA */
                    }
          
                </tbody>

            </table>
            <table className='table table-striped'>
                <thead>
                    <tr>
                      <td><p>Circulando sin caravana</p></td>
                    </tr>
                    <tr>
                        <td>L/100</td>
                        <td>PRECIO/L</td>
                        <td>KMS</td>
                        <td>TOTAL €</td>
                        
                    </tr>
                </thead>
                <tbody>
                {
                         sinCaravana.map((item)=>
                            <tr  key={item.id}>
                                <td >{item.litroscien}</td>
                                <td >{item.precio}</td>
                                <td >{item.kms}</td>
                                <td >{(((item.kms/100) * item.litroscien)* item.precio).toFixed(2)}</td>
                               
                           </tr>
                          )
                       /* rutaprueba.ruta[1].FECHA */
                    }
          
                </tbody>

            </table>

        </div>
    </div>
  )
}

export default CardCombustible