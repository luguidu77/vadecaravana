import React from 'react'

import icoRuta from "../assets/ruta.png";

const CardTrayecto = () => {
 // const log = auth.log

  const rutaprueba =([

         {  
              
            'id': 1,
            'FECHA': '13 jun',
            'TRAYECTO' : 'Sevilla-Valladolid',
            'KMSconCaravana': '500',
            'KMSsinCaravana': '10',
          },
          {
            'id': 2,
            'FECHA': '14 jun',
            'TRAYECTO' : 'Valladolid-Irun',
            'KMSconCaravana': '880',
            'KMSsinCaravana': '0',
          },
          {
            'id': 3,
            'FECHA': '15 jun',
            'TRAYECTO' : 'Irun-Poutier',
            'KMSconCaravana': '580',
            'KMSsinCaravana': '50',
          },
          {
            'id': 4,
            'FECHA': '15 jun',
            'TRAYECTO' : 'Irun-Poutier',
            'KMSconCaravana': '580',
            'KMSsinCaravana': '50',
          }
       
    


  ] )



  return (
    <div className='card  mb-3'>
    <div className='pt-4 text-center'>
     <img  src={icoRuta} width='55' alt='ruta.png' />
    </div>  
    
    <br/>
        <div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <td>FECHA</td>
                        <td>TRAYECTO</td>
                        <td>KMS C/C</td>
                        <td>KMS S/C</td>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                         rutaprueba.map((item)=>
                           
                            <tr key={item.id}>
                                <td>{item.FECHA}</td>
                                <td>{item.TRAYECTO}</td>
                                <td>{item.KMSconCaravana}</td>
                                <td>{item.KMSsinCaravana}</td>
                               
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

export default CardTrayecto