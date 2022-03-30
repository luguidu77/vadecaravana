import React from 'react'

import icoCamping from "../assets/camping.png";

const CardCamping = () => {
  
  
    const campingprueba =([
  
           {  
                
              'id': 1,
              'camping': 'du lac de Saint-Cyr',
              'precioDia' : 25,
              'dias': 2,
              
            },
            {
              'id': 2,
              'camping': 'CampPoutier',
              'precioDia' : 45,
              'dias': 4,
            },
            {
              'id': 3,
              'camping': 'camping Paris',
              'precioDia' : 25,
              'dias': 5,
            }
       
    ] )

  return (
    
    <div className='card mb-3' >
      <div className='pt-4 text-center'>
        <img src={icoCamping} width='55' alt='camping.png'/>
      </div>
    
    <br/>
        <div>
            <table className='table table-striped '>
                <thead>
                    <tr>
                        <td>CAMPING</td>
                        <td>PRECIO/DIA</td>
                        <td>DÍAS</td>
                        <td>TOTAL</td>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                         campingprueba.map((item)=>
                            <tr  key={item.id}>
                                <td >{item.camping}</td>
                                <td >{item.precioDia}</td>
                                <td >{item.dias}</td>
                                <td >{item.precioDia * item.dias}</td>
                               
                           </tr>
                          )
                      
                    }
                   
                   
                </tbody>

            </table>

        </div>
    </div>
  )
}

export default CardCamping