import React from 'react'

import icoResumen from "../assets/resumen.png";

const CardResumen = () => {
  return (
    <div className='card  mb-3 p-3'>
      <div className='pt-4 text-center'>
         <img src={icoResumen} width='55' alt='resumen.png' />
      </div>
       
        <br/>
     <h5 className='brown bold'>DIAS 20</h5>
     <h5 className='pink bold' >KMS 2000</h5>
     <h5 className='greenClear bold'>COMBUSTIBLE 600</h5>
     <h5 className='purple bold'>ENTRADAS 20</h5>
     <h5 className='orange bold'>OTROS GASTOS 20</h5>
     <br/>
     <h5 className='red bold'>TOTAL GASTOS 20</h5>
    </div>
  )
}

export default CardResumen