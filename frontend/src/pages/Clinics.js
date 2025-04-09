import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import '../styles/Clinics.css';
import imageDgC from '../webImages/dentalC.png';
import imageDtC from '../webImages/dngC.png';
import AddClinic from './AddClinic';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaHeartbeat, FaTooth, FaInfoCircle } from 'react-icons/fa';

const Clinics = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const clinicOptions = [
    {
      id: 1,
      title: 'Dengue Clinics',
      description: 'Find specialized dengue fever treatment centers with experienced medical professionals',
      buttonText: 'View Dengue Clinics',
      buttonLink: '/dengueCli',
      className: 'clinic-dengue',
      image: imageDtC,
      icon: <FaHeartbeat className="clinic-card-icon" />,
      aosAnimation: 'fade-right',
      category: 'dengue',
      stats: {
        available: 12,
        topRated: 8,
        specialists: 15
      }
    },
    {
      id: 2,
      title: 'Dental Clinics',
      description: 'Discover dental care facilities offering comprehensive oral health services',
      buttonText: 'View Dental Clinics',
      buttonLink: '/dentalCli',
      className: 'clinic-dental',
      image: imageDgC,
      icon: <FaTooth className="clinic-card-icon" />,
      aosAnimation: 'fade-left',
      category: 'dental',
      stats: {
        available: 18,
        topRated: 12,
        specialists: 24
      }
    }
  ];

  const user = localStorage.getItem('token');

  // Filter clinics based on active tab only
  const filteredClinics = clinicOptions.filter(clinic => {
    return activeTab === 'all' || clinic.category === activeTab;
  });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <section className="clinic-selection-section">
        <div className="clinic-selection-container">
          {/* Hero section with parallax effect */}
          <div className="clinic-hero-parallax" data-aos="fade">
            <div className="clinic-hero-content">
              <h1 className="clinic-main-heading">Healthcare Directory</h1>
              <p className="clinic-subtitle">Find specialized medical care tailored to your needs</p>
            </div>
          </div>
          
          {/* Category tabs */}
          <div className="clinic-category-tabs" data-aos="fade-up">
            <button 
              className={`clinic-tab ${activeTab === 'all' ? 'clinic-tab-active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Clinics
            </button>
            <button 
              className={`clinic-tab ${activeTab === 'dengue' ? 'clinic-tab-active' : ''}`}
              onClick={() => setActiveTab('dengue')}
            >
              Dengue Clinics
            </button>
            <button 
              className={`clinic-tab ${activeTab === 'dental' ? 'clinic-tab-active' : ''}`}
              onClick={() => setActiveTab('dental')}
            >
              Dental Clinics
            </button>
          </div>
          
          {/* Clinic cards */}
          <div className="clinic-options-grid">
            {filteredClinics.length > 0 ? filteredClinics.map((clinic) => (
              <div 
                key={clinic.id} 
                className={`clinic-card ${clinic.className}`} 
                data-aos={clinic.aosAnimation}
              >
                <div className="clinic-card-inner">
                  <div className="clinic-ribbon">Popular Choice</div>
                  <div className="clinic-image-wrapper">
                    <img src={clinic.image} alt={clinic.title} className="clinic-image" />
                    <div className="clinic-icon-badge">
                      {clinic.icon}
                    </div>
                  </div>
                  <div className="clinic-content">
                    <div className="clinic-header">
                      <h2 className="clinic-title">{clinic.title}</h2>
                      <div className="clinic-rating">
                        <span className="clinic-rating-stars">★★★★☆</span>
                        <span className="clinic-rating-count">4.2/5</span>
                      </div>
                    </div>
                    <p className="clinic-description">{clinic.description}</p>
                    
                    <div className="clinic-stats">
                      <div className="clinic-stat">
                        <span className="clinic-stat-value">{clinic.stats.available}</span>
                        <span className="clinic-stat-label">Available</span>
                      </div>
                      <div className="clinic-stat">
                        <span className="clinic-stat-value">{clinic.stats.topRated}</span>
                        <span className="clinic-stat-label">Top Rated</span>
                      </div>
                      <div className="clinic-stat">
                        <span className="clinic-stat-value">{clinic.stats.specialists}</span>
                        <span className="clinic-stat-label">Specialists</span>
                      </div>
                    </div>
                    
                    <a href={clinic.buttonLink} className="clinic-button">
                      {clinic.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            )) : (
              <div className="clinic-no-results" data-aos="fade">
                <FaInfoCircle size={48} />
                <h3>No clinics found</h3>
                <p>Try adjusting your filter criteria</p>
              </div>
            )}
          </div>
          
          {/* Admin section */}
          {user && (
            <div className="clinic-admin-actions" data-aos="fade-up">
              <h3 className="clinic-admin-heading">Administrator Actions</h3>
              <AddClinic />
            </div>
          )}
          
          {/* Information section */}
          <div className="clinic-info-section" data-aos="fade-up">
            <div className="clinic-info-container">
              <div className="clinic-info-item">
                <div className="clinic-info-number">24/7</div>
                <div className="clinic-info-text">Emergency Support</div>
              </div>
              <div className="clinic-info-item">
                <div className="clinic-info-number">100+</div>
                <div className="clinic-info-text">Medical Professionals</div>
              </div>
              <div className="clinic-info-item">
                <div className="clinic-info-number">30+</div>
                <div className="clinic-info-text">Clinic Locations</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Clinics;