import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../styles/mainmidwife.css'
import image1 from '../webImages/babyy1.png';
import image2 from '../webImages/babyy2.png';
import image3 from '../webImages/babyy3.png';
import midimg5 from '../webImages/midd.jpg';

const MainMidwife = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: 'Baby Details',
      description: 'Register and manage infant information and health records',
      buttonText: 'Add Records',
      buttonLink: '/babyDetails',
      image: image1,
      aosAnimation: 'fade-right',
      icon: '👶'
    },
    {
      id: 2,
      title: 'Baby Vaccination',
      description: 'Schedule and track immunization records for infants',
      buttonText: 'Manage Vaccines',
      buttonLink: '/babyVaccination',
      image: image2,
      aosAnimation: 'fade-up',
      icon: '💉'
    },
    {
      id: 3,
      title: 'Thriposha Distribution',
      description: 'Track nutritional supplement distribution to mothers and children',
      buttonText: 'Manage Distribution',
      buttonLink: '/thriposha',
      image: image3,
      aosAnimation: 'fade-left',
      icon: '🥣'
    },
  ];

  const benefits = [
    { title: 'Comprehensive Care', description: 'Complete mother and child health tracking system', icon: '🏥' },
    { title: 'Efficient Record-Keeping', description: 'Digital documentation of all health services', icon: '📋' },
    { title: 'Vaccine Management', description: 'Timely immunization scheduling and alerts', icon: '⏰' },
    { title: 'Nutrition Monitoring', description: 'Track supplement distribution and nutrition status', icon: '🍎' }
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <div className="mw-dashboard">
        <div className="mw-hero-section">
          <div className="mw-hero-content" data-aos="fade-right">
            <h1 className="mw-hero-title">Midwife Management System</h1>
            <div className="mw-hero-tagline">
              <span>Empowering Care, Nurturing Lives</span>
            </div>
            <p className="mw-hero-description">
              A comprehensive platform for midwives to manage maternal care, 
              baby health records, immunization schedules, and nutritional supplement distribution.
            </p>
          </div>
          <div className="mw-hero-image" data-aos="fade-left">
            <img src={midimg5} alt="Midwife caring for mother and child" />
          </div>
        </div>

        <div className="mw-services-heading" data-aos="fade-up">
          <h2>Maternal & Child Health Services</h2>
          <p>Manage all aspects of mother and child healthcare with our integrated tools</p>
        </div>

        <div className="mw-services-grid">
          {services.map((service) => (
            <div key={service.id} className="mw-service-card" data-aos={service.aosAnimation}>
              <div className="mw-service-icon">{service.icon}</div>
              <div className="mw-service-image-container">
                <img src={service.image} alt={service.title} className="mw-service-image" />
              </div>
              <div className="mw-service-content">
                <h3 className="mw-service-title">{service.title}</h3>
                <p className="mw-service-description">{service.description}</p>
              </div>
              <Link to={service.buttonLink} className="mw-service-btn">
                {service.buttonText}
              </Link>
            </div>
          ))}
        </div>

        <div className="mw-benefits-section" data-aos="fade-up">
          <div className="mw-benefits-heading">
            <h2>Why Use Our Midwife Management System?</h2>
            <p>Designed to streamline your workflow and improve maternal and child healthcare</p>
          </div>
          <div className="mw-benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="mw-benefit-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="mw-benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mw-quote-section" data-aos="fade-up">
          <blockquote>
            "Empowering Care, Nurturing Lives: Midwife Management for Healthy Beginnings encapsulates the essence of a comprehensive midwife management system focused on providing compassionate and empowering care to expectant mothers and their families."
          </blockquote>
          <p className="mw-quote-author">— Midwife Health Initiative</p>
        </div>

      </div>
    </Layout>
  );
};

export default MainMidwife;