import React from "react";
import Layout from '../components/Layout'
import '../styles/Raids.css'
import { useNavigate } from "react-router-dom";



/*import image1 from '../webImages/vac1.jpg'*/
/*import image2 from '../webImages/vac2.jpg'*/


const Raids = () => {
    
    
    const navigate = useNavigate();
    
    const cards = [
      {
        id: 1,
        title: 'Raid Form',
        buttonText: 'Add',
        buttonLink: '/RaidForm',
        className: 'Form-card',
        /*image: image1*/
      },
  
      {
        id: 2,
        title: 'Raid Submission',
        buttonText: 'Add',
        buttonLink: '/RaidSubForm',
        className: 'Submission-card',
        /*image:image2*/
        
        
        
      },
  
    
    ];


    return(
      
        <Layout>
                <div className="home-page">
        <h3>Raids Management</h3>
        <div className="card-container">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <img src={card.image} alt={card.title} className="card-image" />
              <div className="card-body">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.description}</p>
                <a href={card.buttonLink} className="btnview">
                  {card.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

    </div>
        </Layout>  



    )
}

export default Raids