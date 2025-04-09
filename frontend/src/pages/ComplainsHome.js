import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/Complains/ComplainsHome.css';

// Import images
import img1 from '../webImages/Reportimg.jpg';
import img2 from '../webImages/documentImg.jpg';

// Animation library
import Aos from 'aos';
import 'aos/dist/aos.css';

const ComplainsHome = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  const actionCards = [
    {
      id: 1,
      title: 'Submit Complaint',
      description: 'Fill out our user-friendly form to report food safety issues or dengue concerns.',
      image: img1,
      buttonText: 'Submit Now',
      buttonLink: '/Complains',
      aosAnimation: 'fade-right',
      icon: '📝'
    }, 
    {
      id: 2,
      title: 'View Reports',
      description: 'Track the status of submitted complaints and view resolution progress.',
      image: img2,
      buttonText: 'View Reports',
      buttonLink: '/Complainstable',
      aosAnimation: 'fade-left',
      icon: '📊'
    }
  ];

  const stats = [
    { value: '24h', label: 'Response Time' },
    { value: '97%', label: 'Resolution Rate' },
    { value: '5k+', label: 'Complaints Processed' }
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>  
      <div className="phcm-container">
        <div className="phcm-hero" data-aos="fade-down">
          <div className="phcm-hero-content">
            <h1 className="phcm-main-title">Complaints Management</h1>
            <p className="phcm-tagline">Your voice matters in building a healthier community</p>
            <div className="phcm-divider"></div>
          </div>
        </div>
        
        <div className="phcm-nav-tabs" data-aos="fade-up">
          <button 
            className={`phcm-tab-button ${activeTab === 'about' ? 'phcm-active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button 
            className={`phcm-tab-button ${activeTab === 'services' ? 'phcm-active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Services
          </button>
          <button 
            className={`phcm-tab-button ${activeTab === 'process' ? 'phcm-active' : ''}`}
            onClick={() => setActiveTab('process')}
          >
            Process
          </button>
        </div>
        
        {activeTab === 'about' && (
          <div className="phcm-tab-content" data-aos="fade-up">
            <div className="phcm-intro-card">
              <h3 className="phcm-subtitle">Welcome to the Complaints Management Section</h3>
              <p className="phcm-description">
                Our dedicated team responds promptly to all concerns about food safety and dengue prevention. 
                With our streamlined process, you can expect efficient resolution and continuous support.
              </p>
              
              <div className="phcm-stats-container">
                {stats.map((stat, index) => (
                  <div className="phcm-stat-item" key={index}>
                    <div className="phcm-stat-value">{stat.value}</div>
                    <div className="phcm-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'services' && (
          <div className="phcm-tab-content" data-aos="fade-up">
            <div className="phcm-services-grid">
              <div className="phcm-service-item">
                <div className="phcm-service-icon">🍽️</div>
                <h4>Food Safety Complaints</h4>
                <p>Report restaurants, food vendors, or contaminated products</p>
              </div>
              <div className="phcm-service-item">
                <div className="phcm-service-icon">🦟</div>
                <h4>Dengue Prevention</h4>
                <p>Report potential breeding grounds or dengue outbreaks</p>
              </div>
              <div className="phcm-service-item">
                <div className="phcm-service-icon">📱</div>
                <h4>Status Updates</h4>
                <p>Receive notifications about your complaint progress</p>
              </div>
              <div className="phcm-service-item">
                <div className="phcm-service-icon">📈</div>
                <h4>Community Insights</h4>
                <p>Access public health trends and statistics</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'process' && (
          <div className="phcm-tab-content" data-aos="fade-up">
            <div className="phcm-process-container">
              <div className="phcm-process-timeline">
                <div className="phcm-timeline-item">
                  <div className="phcm-timeline-number">1</div>
                  <h4>Submit</h4>
                  <p>Complete our easy-to-use complaint form with relevant details</p>
                </div>
                <div className="phcm-timeline-item">
                  <div className="phcm-timeline-number">2</div>
                  <h4>Verify</h4>
                  <p>Our team reviews your information and may contact you for details</p>
                </div>
                <div className="phcm-timeline-item">
                  <div className="phcm-timeline-number">3</div>
                  <h4>Investigate</h4>
                  <p>Health officers assess the situation and collect evidence</p>
                </div>
                <div className="phcm-timeline-item">
                  <div className="phcm-timeline-number">4</div>
                  <h4>Resolve</h4>
                  <p>Appropriate actions are taken to address your complaint</p>
                </div>
                <div className="phcm-timeline-item">
                  <div className="phcm-timeline-number">5</div>
                  <h4>Follow-up</h4>
                  <p>You receive notification of resolution and preventive measures</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="phcm-action-section">
          <h2 className="phcm-section-title" data-aos="fade-up">Take Action</h2>
          <p className="phcm-section-subtitle" data-aos="fade-up">Choose an option below to submit or track your complaints</p>
          
          <div className="phcm-action-cards">
            {actionCards.map((card) => (
              <div key={card.id} className="phcm-action-card" data-aos={card.aosAnimation}>
                <div className="phcm-action-card-header">
                  <div className="phcm-action-icon">{card.icon}</div>
                  <h3 className="phcm-action-title">{card.title}</h3>
                </div>
                
                <div className="phcm-action-image-container">
                  <img src={card.image} alt={card.title} className="phcm-action-image" />
                </div>
                
                <div className="phcm-action-content">
                  <p className="phcm-action-description">{card.description}</p>
                  <div className="phcm-action-features">
                    {card.id === 1 ? (
                      <>
                        <div className="phcm-feature">
                          <span className="phcm-feature-icon">✓</span>
                          <span>Food safety issues</span>
                        </div>
                        <div className="phcm-feature">
                          <span className="phcm-feature-icon">✓</span>
                          <span>Dengue breeding sites</span>
                        </div>
                        <div className="phcm-feature">
                          <span className="phcm-feature-icon">✓</span>
                          <span>Public health concerns</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="phcm-feature">
                          <span className="phcm-feature-icon">✓</span>
                          <span>Track complaint status</span>
                        </div>
                        <div className="phcm-feature">
                          <span className="phcm-feature-icon">✓</span>
                          <span>View resolution details</span>
                        </div>
                        <div className="phcm-feature">
                          <span className="phcm-feature-icon">✓</span>
                          <span>Access historical data</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="phcm-action-footer">
                  <a href={card.buttonLink} className="phcm-action-button">
                    {card.buttonText}
                    <span className="phcm-button-arrow">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="phcm-testimonials" data-aos="fade-up">
          <h3 className="phcm-section-title">Community Feedback</h3>
          <div className="phcm-testimonial-container">
            <div className="phcm-testimonial">
              <div className="phcm-testimonial-quote">"I reported a potential dengue breeding site and a health officer responded within 24 hours. Excellent service!"</div>
              <div className="phcm-testimonial-author">- Maria S.</div>
            </div>
            <div className="phcm-testimonial">
              <div className="phcm-testimonial-quote">"The food safety complaint process was straightforward and the issue was resolved quickly. Thank you!"</div>
              <div className="phcm-testimonial-author">- John D.</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComplainsHome;