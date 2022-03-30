import React, { useEffect, useState } from 'react'
import AgregaCardAlbum from '../componentes/AgregaCardAlbum'

import CardAlbum from '../componentes/CardAlbum'

const AlbumScreen = ({log}) => {
 // const log = auth.log
  
 const [publicacion, setPublicacion] = useState('')
 //editar publicacion
 const handleEditar = (e)=>{
  setPublicacion(e)
  console.log(e);
}



  return (
    <div>
        
        <AgregaCardAlbum log={log} publicacion={publicacion} />

      {/*handleEditar lo traigo de CardAlbum (hijo) para pasarselo al AgregarCardAlbum(hijo) en la variable publicacion
        
       TODO: pintar mapa de cardAlbum , pasandole parametros para segun que tipo */} 
        <CardAlbum log={log} handleEditar={handleEditar}/>
     
       </div>
  )
}

export default AlbumScreen


