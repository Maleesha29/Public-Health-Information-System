import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../styles/Staff/Staff.css';

// Import images - assuming these imports stay the same
import image1 from '../webImages/den.png';
import image2 from '../webImages/va2.png';
import image3 from '../webImages/raids.png';

const Staff = () => {
  const navigate = useNavigate();
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);
  
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const navigateToLeave = () => {
    navigate('/Leave');
  };

  const scheduleCards = [
    {
      id: 1,
      title: 'Dengue Schedules',
      description: 'View and manage dengue prevention campaign schedules, including fogging operations, awareness programs, and community outreach activities.',
      buttonText: 'View Schedule',
      buttonLink: '/DengueSchedules',
      image: image1,
      aosAnimation: 'fade-right',
      cardClass: 'staff-card staff-card--dengue'
    },
    {
      id: 2,
      title: 'Vaccine Schedules',
      description: 'Access vaccination schedules for routine immunizations, special campaigns, and mobile vaccination units in different locations.',
      buttonText: 'View Schedule',
      buttonLink: '/Vaccineschedules',
      image: image2,
      aosAnimation: 'fade-up',
      cardClass: 'staff-card staff-card--vaccine'
    },
    {
      id: 3,
      title: 'Raids Schedules',
      description: 'Check upcoming inspection schedules for mosquito breeding sites, health code compliance, and public health enforcement activities.',
      buttonText: 'View Schedule',
      buttonLink: '/Raidsschedules',
      image: image3,
      aosAnimation: 'fade-left',
      cardClass: 'staff-card staff-card--raids'
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Vaccination Schedules',
      content: (
        <>
          <p>Dear Team,</p>
          <p>
            We are pleased to announce the release of our vaccination schedules for the upcoming period.
            These schedules detail essential vaccination campaigns, clinics, outreach programs, and training sessions.
            Ensuring adherence to these schedules is crucial to maintaining high vaccination coverage and safeguarding public health.
            We appreciate your dedication to this important endeavor.
            Thank you for your continued commitment.
          </p>
          <p>Best regards,</p>
          <p>Yethmi Liyanaarachchi</p>
        </>
      ),
      icon: '💉',
      color: '#40c463'
    },
    {
      id: 2,
      title: 'Leave Policy Update',
      content: (
        <>
          <p>Dear Team,</p>
          <p>We're updating our leave policy to better support your needs. Effective immediately:</p>
          <ul>
            <li>Annual Leave: Enjoy your well-deserved time off with our annual leave allowance.</li>
            <li>Sick Leave: Take care of yourself with sick leave when you're unwell.</li>
            <li>Family & Medical Leave: Support your loved ones or address personal medical needs with family and medical leave.</li>
            <li>Emergency Leave: For unforeseen emergencies, we're here to provide support with emergency leave.</li>
          </ul>
          <p>Best regards,</p>
          <p>Yethmi Liyanaarachchi</p>
        </>
      ),
      icon: '📝',
      color: '#ff6b6b'
    },
    {
      id: 3,
      title: 'Upcoming Events: Stay Informed!',
      content: (
        <>
          <p>Dear Team,</p>
          <p>Exciting events are on the horizon in our health sector! Stay tuned for:</p>
          <ul>
            <li>Health Workshops: Enhance your skills and knowledge with informative workshops covering various health topics.</li>
            <li>Community Health Camps: Join us in serving our community through health camps providing essential medical services.</li>
            <li>Awareness Campaigns: Participate in spreading awareness about important health issues through engaging campaigns.</li>
            <li>Training Sessions: Sharpen your expertise with specialized training sessions tailored to your professional development.</li>
          </ul>
          <p>Best regards,</p>
          <p>Yethmi Liyanaarachchi</p>
        </>
      ),
      icon: '🗓️',
      color: '#4dabf7'
    }
  ];

  const nextAnnouncement = () => {
    setActiveAnnouncement((prev) => (prev + 1) % announcements.length);
  };

  const prevAnnouncement = () => {
    setActiveAnnouncement((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const setAnnouncementIndex = (index) => {
    setActiveAnnouncement(index);
  };

  return (
    <Layout>
      <div className="staff-page">
        <header className="staff-header" data-aos="fade-down">
          <h1 className="staff-title">Staff Portal</h1>
          <p className="staff-subtitle">Access schedules, announcements, and administrative tools</p>
          <div className="staff-divider" data-aos="fade-up"></div>
        </header>

        {/* Redesigned Announcement Section */}
        <section className="announcements-section">
          <h2 className="section-title" data-aos="fade-up">Important Announcements</h2>
          
          <div className="announcements-modern" data-aos="fade-up">
            <div className="announcements-sidebar">
              {announcements.map((announcement, index) => (
                <div 
                  key={announcement.id} 
                  className={`announcement-tab ${activeAnnouncement === index ? 'active' : ''}`}
                  onClick={() => setAnnouncementIndex(index)}
                  style={{
                    borderColor: activeAnnouncement === index ? announcement.color : 'transparent'
                  }}
                >
                  <span className="announcement-tab-icon">{announcement.icon}</span>
                  <span className="announcement-tab-title">{announcement.title}</span>
                </div>
              ))}
            </div>
            
            <div className="announcement-content-wrapper">
              <div 
                className="announcement-content" 
                style={{
                  borderTop: `4px solid ${announcements[activeAnnouncement].color}`
                }}
              >
                <h3 className="announcement-content-title" style={{color: announcements[activeAnnouncement].color}}>
                  {announcements[activeAnnouncement].title}
                </h3>
                <div className="announcement-content-body">
                  {announcements[activeAnnouncement].content}
                </div>
              </div>
              
              <div className="announcement-navigation">
                <button 
                  className="announcement-nav-button prev"
                  onClick={prevAnnouncement}
                >
                  Previous
                </button>
                <div className="announcement-indicators">
                  {announcements.map((_, index) => (
                    <button
                      key={index}
                      className={`announcement-indicator ${activeAnnouncement === index ? 'active' : ''}`}
                      onClick={() => setAnnouncementIndex(index)}
                      style={{
                        backgroundColor: activeAnnouncement === index ? announcements[index].color : ''
                      }}
                    />
                  ))}
                </div>
                <button 
                  className="announcement-nav-button next"
                  onClick={nextAnnouncement}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Cards Section */}
        <section className="schedules-section">
          <h2 className="section-title" data-aos="fade-up">Manage Schedules</h2>
          
          <div className="staff-card-container">
            {scheduleCards.map((card) => (
              <div key={card.id} className={card.cardClass} data-aos={card.aosAnimation}>
                <div className="staff-card__image-container">
                  <img src={card.image} alt={card.title} className="staff-card__image" />
                </div>
                <div className="staff-card__content">
                  <h3 className="staff-card__title">{card.title}</h3>
                  <p className="staff-card__description">{card.description}</p>
                  <a href={card.buttonLink} className="staff-card__button">
                    {card.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leave Application Section */}
        <section className="leave-section" data-aos="fade-up">
          <div className="leave-application">
            <div className="leave-application__content">
              <h2 className="leave-application__title">Apply for Leave</h2>
              <p className="leave-application__text">
                Submit your leave requests through our streamlined online system. Track your applications 
                and view your leave history with just a few clicks.
              </p>
              <div className="leave-application__actions">
                <button 
                  onClick={navigateToLeave} 
                  className="leave-application__button leave-application__button--primary"
                >
                  Apply Now
                </button>
                <a 
                  href="/LeaveTable" 
                  className="leave-application__button leave-application__button--secondary"
                >
                  View Leave History
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Staff;