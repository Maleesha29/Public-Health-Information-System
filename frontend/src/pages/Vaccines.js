import React, { useState, useEffect } from "react";
import Layout from '../components/Layout'
import '../styles/Vaccines/Vaccines.css'
import { useNavigate } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';
import image1 from '../webImages/vac1.jpg'
import image2 from '../webImages/vac2.jpg'
import image3 from '../webImages/vac3.jpg'
import vaccmain from '../webImages/vaccmain.png';
import vac6 from '../webImages/vac6.jpg';

const Vaccines = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const cards = [
    {
      id: 1,
      title: 'Vaccine Registration',
      description: 'Complete your profile and register for available vaccines in your area. Track your vaccination status and receive notifications.',
      buttonText: 'Register Now',
      buttonLink: '/VaccineReg',
      className: 'vaccine__reg__card',
      image: image1,
      aosAnimation: 'fade-right',
      icon: '💉'
    },
    {
      id: 2,
      title: 'Vaccine Appointments',
      description: 'Schedule, reschedule or cancel your vaccination appointments. View upcoming appointments and get reminders.',
      buttonText: 'Manage Appointments',
      buttonLink: '/VaccineApp',
      className: 'vaccine__app__card',
      image: image2,
      aosAnimation: 'fade-up',
      icon: '📅'
    },
    {
      id: 3,
      title: 'Vaccine Requests',
      description: 'Request special vaccines or submit inquiries about specific vaccine availability. Track the status of your requests.',
      buttonText: 'Submit Request',
      buttonLink: '/VaccineRequest',
      className: 'vaccine__req__card',
      image: image3,
      aosAnimation: 'fade-left',
      icon: '📋'
    },
  ];

  const vaccineTypes = [
    { id: 1, name: 'COVID-19', availability: 'Available', recommendation: 'All adults', status: 'High priority' },
    { id: 2, name: 'Influenza', availability: 'Available', recommendation: 'Annual for everyone', status: 'Recommended' },
    { id: 3, name: 'Hepatitis B', availability: 'Limited', recommendation: 'High-risk groups', status: 'Available on request' },
    { id: 4, name: 'HPV', availability: 'Available', recommendation: 'Ages 11-26', status: 'Recommended' },
    { id: 5, name: 'Tdap', availability: 'Available', recommendation: 'Every 10 years', status: 'Standard' }
  ];



  const upcomingClinics = [
    { id: 1, location: "Central Hospital", date: "May 15, 2025", vaccines: ["COVID-19", "Influenza"], slots: "Limited" },
    { id: 2, location: "Westside Clinic", date: "May 18, 2025", vaccines: ["HPV", "Hepatitis B"], slots: "Available" },
    { id: 3, location: "Community Center", date: "May 22, 2025", vaccines: ["COVID-19", "Tdap"], slots: "Available" }
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <div className="vaccine__container">
        {/* Hero section with animated background */}
        <div className="vaccine__hero">
          <div className="vaccine__hero__content">
            <div className="vaccine__hero__text" data-aos="fade-right">
              <h1 className="vaccine__hero__title">Protecting Communities Through Vaccination</h1>
              <p className="vaccine__hero__subtitle">
                Your health is our priority. Manage your vaccinations, appointments, 
                and stay informed about the latest health recommendations.
              </p>
              <div className="vaccine__hero__buttons">
                <button 
                  onClick={() => navigate('/VaccineReg')} 
                  className="vaccine__hero__button vaccine__hero__button--primary"
                >
                  Get Vaccinated
                </button>
              </div>
            </div>
            <div className="vaccine__hero__image" data-aos="fade-left">
              <img src={vaccmain} alt="Vaccination" />
              <div className="vaccine__hero__shape vaccine__hero__shape--1"></div>
              <div className="vaccine__hero__shape vaccine__hero__shape--2"></div>
            </div>
          </div>
          <div className="vaccine__hero__wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        {/* Services Cards with hover effect and animation */}
        <section className="vaccine__services">
          <div className="vaccine__section__header" data-aos="fade-up">
            <h2 className="vaccine__section__title">Our Services</h2>
            <div className="vaccine__section__underline"></div>
            <p className="vaccine__section__description">
              Comprehensive vaccination services tailored to meet your health needs
            </p>
          </div>
          
          <div className="vaccine__card__grid">
            {cards.map((card) => (
              <div key={card.id} className={`vaccine__card ${card.className}`} data-aos={card.aosAnimation}>
                <div className="vaccine__card__content">
                  <div className="vaccine__card__icon">
                    <span>{card.icon}</span>
                  </div>
                  <h3 className="vaccine__card__title">{card.title}</h3>
                  <p className="vaccine__card__description">{card.description}</p>
                  <a href={card.buttonLink} className="vaccine__card__button">
                    {card.buttonText}
                    <span className="vaccine__card__button__arrow">→</span>
                  </a>
                </div>
                <div className="vaccine__card__image__container">
                  <img src={card.image} alt={card.title} className="vaccine__card__image" />
                  <div className="vaccine__card__overlay"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tabbed content section */}
        <section className="vaccine__tabbed__section" data-aos="fade-up">
          <div className="vaccine__section__header">
            <h2 className="vaccine__section__title">Vaccination Information</h2>
            <div className="vaccine__section__underline"></div>
            <p className="vaccine__section__description">
              Everything you need to know about our vaccination programs and services
            </p>
          </div>
          
          <div className="vaccine__tabs">
            <button 
              className={`vaccine__tab ${activeTab === 'overview' ? 'vaccine__tab--active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`vaccine__tab ${activeTab === 'availability' ? 'vaccine__tab--active' : ''}`}
              onClick={() => setActiveTab('availability')}
            >
              Vaccine Types
            </button>
            <button 
              className={`vaccine__tab ${activeTab === 'clinics' ? 'vaccine__tab--active' : ''}`}
              onClick={() => setActiveTab('clinics')}
            >
              Upcoming Clinics
            </button>
          </div>
          
          <div className="vaccine__tab__content">
            {activeTab === 'overview' && (
              <div className="vaccine__tab__panel vaccine__overview__panel">
                <div className="vaccine__overview__content">
                  <h3>Vaccination Details</h3>
                  <p>
                    Vaccination distribution and management encompass a complex framework of planning,
                    coordination, and execution to ensure the effective delivery of vaccines to target populations.
                    This involves meticulous supply chain management to maintain vaccine integrity,
                    allocation strategies to prioritize high-risk groups, and the establishment of distribution networks spanning diverse healthcare settings.
                  </p>
                  <p>
                    Additionally, robust monitoring, surveillance, and community engagement efforts are essential to track vaccine uptake,
                    address concerns, and adapt strategies as needed, ultimately fostering widespread vaccine acceptance and protecting public health.
                  </p>
                  <ul className="vaccine__overview__list">
                    <li>✓ Safe and effective vaccines</li>
                    <li>✓ Administered by qualified healthcare professionals</li>
                    <li>✓ Digital vaccination certificates provided</li>
                    <li>✓ Follow-up care and monitoring</li>
                  </ul>
                  <button onClick={() => navigate('/VaccineRegTab')} className="vaccine__details__button">
                    View All Details <span className="vaccine__button__arrow">→</span>
                  </button>
                </div>
                <div className="vaccine__overview__image">
                  <img src={vaccmain} alt="Vaccination management" />
                </div>
              </div>
            )}
            
            {activeTab === 'availability' && (
              <div className="vaccine__tab__panel">
                <div className="vaccine__table__container">
                  <table className="vaccine__table">
                    <thead>
                      <tr>
                        <th>Vaccine Type</th>
                        <th>Availability</th>
                        <th>Recommendation</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vaccineTypes.map(vaccine => (
                        <tr key={vaccine.id}>
                          <td><strong>{vaccine.name}</strong></td>
                          <td>
                            <span className={`vaccine__status ${
                              vaccine.availability === 'Available' ? 'vaccine__status--available' : 
                              vaccine.availability === 'Limited' ? 'vaccine__status--limited' : 
                              'vaccine__status--unavailable'
                            }`}>
                              {vaccine.availability}
                            </span>
                          </td>
                          <td>{vaccine.recommendation}</td>
                          <td>{vaccine.status}</td>
                          <td>
                            <button 
                              className="vaccine__table__button"
                              onClick={() => navigate('/VaccineReg')}
                            >
                              Request
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'clinics' && (
              <div className="vaccine__tab__panel">
                <div className="vaccine__clinics__grid">
                  {upcomingClinics.map(clinic => (
                    <div key={clinic.id} className="vaccine__clinic__card">
                      <div className="vaccine__clinic__header">
                        <h3>{clinic.location}</h3>
                        <span className={`vaccine__clinic__status ${
                          clinic.slots === 'Available' ? 'vaccine__clinic__status--available' : 
                          'vaccine__clinic__status--limited'
                        }`}>
                          {clinic.slots} Slots
                        </span>
                      </div>
                      <div className="vaccine__clinic__details">
                        <p><strong>Date:</strong> {clinic.date}</p>
                        <p><strong>Vaccines:</strong> {clinic.vaccines.join(', ')}</p>
                      </div>
                      <button 
                        className="vaccine__clinic__button"
                        onClick={() => navigate('/VaccineApp')}
                      >
                        Book Appointment
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Request section with gradient background */}
        <section className="vaccine__request__section" data-aos="fade-up">
          <div className="vaccine__request__grid">
            <div className="vaccine__request__image">
              <img src={vac6} alt="Vaccination requests" />
              <div className="vaccine__request__pattern"></div>
            </div>
            <div className="vaccine__request__content">
              <h2 className="vaccine__section__title vaccine__section__title--light">Vaccination Requests</h2>
              <div className="vaccine__section__underline vaccine__section__underline--light"></div>
              <h3 className="vaccine__request__subtitle">Check all vaccination requests and information</h3>
              <p>
                Medical health professionals play a pivotal role in vaccine administration,
                starting with the assessment of individuals' eligibility based on various factors.
                They educate individuals about the vaccine, address concerns, and obtain informed consent before administering it.
              </p>
              <p>
                Precise documentation of vaccine details is maintained for monitoring purposes and to ensure proper follow-up care.
              </p>
              <div className="vaccine__request__features">
                <div className="vaccine__request__feature">
                  <div className="vaccine__request__feature__icon">✓</div>
                  <div className="vaccine__request__feature__text">Request special vaccines</div>
                </div>
                <div className="vaccine__request__feature">
                  <div className="vaccine__request__feature__icon">✓</div>
                  <div className="vaccine__request__feature__text">Check request status</div>
                </div>
                <div className="vaccine__request__feature">
                  <div className="vaccine__request__feature__icon">✓</div>
                  <div className="vaccine__request__feature__text">Receive notifications</div>
                </div>
                <div className="vaccine__request__feature">
                  <div className="vaccine__request__feature__icon">✓</div>
                  <div className="vaccine__request__feature__text">Priority processing</div>
                </div>
              </div>
              <button onClick={() => navigate('/VaccineRequestTab')} className="vaccine__request__button">
                Submit a Request <span className="vaccine__button__arrow">→</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Vaccines;