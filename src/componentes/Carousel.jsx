
const Carousel = ({urlFoto}) => {

  const {idCarousel, url, url2, url3} = urlFoto

 

  const id =`#${idCarousel}`
  
  return (
      <>
       <div id={idCarousel} className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target={id}  data-slide-to={0} className="active" />
          <li data-target={id} data-slide-to={1} />
          <li data-target={id} data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={url} alt="First slide" />
          </div>
          {
           url2 && <div className="carousel-item">
            <img className="d-block w-100" src={url2} alt="Second slide" />
          </div>
          }
         
          {
             url3 &&  <div className="carousel-item">
            <img className="d-block w-100" src={url3} alt="Third slide" />
          </div>
          }
        
        </div>
        <a className="carousel-control-prev" href={id} role="button" data-slide="prev">
          {
            url2 && <span className="carousel-control-prev-icon" aria-hidden="true" />
          }
          
          
        </a>
        <a className="carousel-control-next" href={id} role="button" data-slide="next">
         
          {
            url2 &&  <span className="carousel-control-next-icon" aria-hidden="true" />
          }
        </a>
      </div>
      
      
      </>
  )
}

export default Carousel