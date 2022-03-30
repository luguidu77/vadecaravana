import React from 'react'
import CardCamping from '../componentes/CardCamping';
import CardCombustible from '../componentes/CardCombustible';
import CardResumen from '../componentes/CardResumen';
import CardTrayecto from '../componentes/CardTrayecto';
import HeaderResumen from '../componentes/HeaderResumen';
import TextHeader from '../componentes/TextHeader';
import { AuthContext } from '../context/AuthContext';

const ResumenScreen = ({log, correo}) => {
  

  return (
    <div>
        
        <HeaderResumen log={log} correo={correo}/>
       
        <div className='container'>
        <TextHeader log={log}/>
        </div>
        <br/><br/>
        <div className='container'>
          <div className='row'>
            <div className="col-md-6">
              <CardResumen/>
            </div>
            <div className="col-md-6">
              <CardTrayecto />
            </div>
            <div className="col-md-6">
              <CardCamping/>
            </div>
            <div className="col-md-6">
              <CardCombustible/>
            </div>
          </div>
         </div>
  
   </div>
  )
}

export default ResumenScreen