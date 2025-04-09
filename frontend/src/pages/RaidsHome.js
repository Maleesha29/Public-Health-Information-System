import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../styles/Raids/RaidsHome.css';
import img1 from '../webImages/raid f.jpg';
import img2 from '../webImages/raid s.jpg';
import raidh2 from '../webImages/raidh2.jpg';

const RaidsHome = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const cards = [
    {
      id: 1,
      title: 'Raid Submit Form',
      description: 'Create and submit new raid operations for approval and planning.',
      image: img1,
      buttonText: 'Submit Raid',
      buttonLink: '/raidsubform',
      aosAnimation: 'fade-right',
      icon: '📝'
    },
    {
      id: 2,
      title: 'Add Raid Officers',
      description: 'Assign and manage officers for planned raid operations.',
      image: img2,
      buttonText: 'Manage Officers',
      buttonLink: '/RaidOfficerAssign',
      aosAnimation: 'fade-left',
      icon: '👮‍♂️'
    }
  ];

  const statistics = [
    { label: 'Operations Completed', value: '124', icon: '✓' },
    { label: 'Officers Assigned', value: '67', icon: '👮‍♂️' },
    { label: 'Success Rate', value: '94%', icon: '📊' },
    { label: 'Evidence Collected', value: '786', icon: '📦' }
  ];

  const features = [
    {
      title: 'Pre-raid Planning',
      description: 'Create detailed operation plans, risk assessments, and resource allocation strategies.',
      icon: '📋'
    },
    {
      title: 'Real-time Coordination',
      description: 'Monitor operations in progress with live updates and communication channels.',
      icon: '📡'
    },
    {
      title: 'Evidence Management',
      description: 'Document and catalog all evidence with proper chain of custody tracking.',
      icon: '🔍'
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Generate detailed post-operation reports and analytics for review.',
      icon: '📊'
    },
    {
      title: 'Resource Allocation',
      description: 'Efficiently assign personnel, vehicles, and equipment to operations.',
      icon: '🚓'
    },
    {
      title: 'Legal Compliance',
      description: 'Ensure all operations follow legal procedures and documentation requirements.',
      icon: '⚖️'
    }
  ];

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      <div className="rms-dashboard">
        <div className="rms-hero-section">
          <div className="rms-hero-content">
            <h1 className="rms-hero-title">Raids Management System</h1>
            <p className="rms-hero-subtitle">Streamline planning, execution, and documentation of law enforcement operations</p>
            <div className="rms-hero-actions">
              <a href="/raidsubform" className="rms-primary-btn">Create New Raid</a>
              <a href="/raidstatus" className="rms-secondary-btn">Check Status</a>
            </div>
          </div>
        </div>
        
        <div className="rms-stats-container" data-aos="fade-up">
          {statistics.map((stat, index) => (
            <div className="rms-stat-card" key={index} data-aos={`fade-up`} data-aos-delay={index * 100}>
              <div className="rms-stat-icon">{stat.icon}</div>
              <div className="rms-stat-value">{stat.value}</div>
              <div className="rms-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="rms-tab-navigation">
          <button 
            className={`rms-tab-btn ${activeTab === 'dashboard' ? 'rms-active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`rms-tab-btn ${activeTab === 'features' ? 'rms-active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            System Features
          </button>
          <button 
            className={`rms-tab-btn ${activeTab === 'about' ? 'rms-active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>
        
        {activeTab === 'dashboard' && (
          <div className="rms-action-cards">
            {cards.map((card) => (
              <div key={card.id} className="rms-card" data-aos={card.aosAnimation}>
                <div className="rms-card-header">
                  <span className="rms-card-icon">{card.icon}</span>
                  <h2 className="rms-card-title">{card.title}</h2>
                </div>
                <div className="rms-card-content">
                  <div className="rms-card-image-container">
                    <img src={card.image} alt={card.title} className="rms-card-image" />
                  </div>
                  <p className="rms-card-text">{card.description}</p>
                </div>
                <div className="rms-card-footer">
                  <a href={card.buttonLink} className="rms-card-button">
                    {card.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'features' && (
          <div className="rms-features-grid" data-aos="fade-up">
            {features.map((feature, index) => (
              <div className="rms-feature-item" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                <div className="rms-feature-icon">{feature.icon}</div>
                <h3 className="rms-feature-title">{feature.title}</h3>
                <p className="rms-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="rms-about-section" data-aos="fade-up">
            <div className="rms-about-content">
              <div className="rms-about-text">
                <h2 className="rms-section-title">About the Raid Management System</h2>
                <p>A Raid Management System is a software application designed to facilitate the 
                planning, execution, and documentation of raids conducted by law enforcement
                agencies, regulatory bodies, or other authorized entities.</p>
                
                <p>This system serves as a comprehensive tool for managing various aspects 
                of raid operations, including pre-raid planning, resource allocation,
                real-time coordination, evidence collection, and post-raid reporting.</p>
                
                <p>At its core, a Raid Management System streamlines the entire raid process,
                from initial planning to the final disposition of seized assets or individuals.
                It enables agencies to create detailed raid plans, allocate resources efficiently,
                and ensure the safety of personnel involved.</p>
                
                <p>During the execution phase, the system provides real-time tracking and 
                communication capabilities, allowing commanders to monitor progress, adjust 
                tactics as needed, and maintain situational awareness.</p>
              </div>
              <div className="rms-about-image">
                <img src={raidh2} alt="Raid operations" className="rms-feature-image" />
              </div>
            </div>
            
            <div className="rms-workflow">
              <h3 className="rms-workflow-title">Raid Operation Workflow</h3>
              <div className="rms-workflow-steps">
                <div className="rms-workflow-step">
                  <div className="rms-step-number">1</div>
                  <div className="rms-step-content">
                    <h4>Planning</h4>
                    <p>Create operation plan with objectives, risk assessment and resource needs</p>
                  </div>
                </div>
                <div className="rms-workflow-step">
                  <div className="rms-step-number">2</div>
                  <div className="rms-step-content">
                    <h4>Approval</h4>
                    <p>Submit plan for review and authorization by command staff</p>
                  </div>
                </div>
                <div className="rms-workflow-step">
                  <div className="rms-step-number">3</div>
                  <div className="rms-step-content">
                    <h4>Execution</h4>
                    <p>Conduct operation with real-time monitoring and coordination</p>
                  </div>
                </div>
                <div className="rms-workflow-step">
                  <div className="rms-step-number">4</div>
                  <div className="rms-step-content">
                    <h4>Documentation</h4>
                    <p>Record evidence, findings, and operation outcomes</p>
                  </div>
                </div>
                <div className="rms-workflow-step">
                  <div className="rms-step-number">5</div>
                  <div className="rms-step-content">
                    <h4>Analysis</h4>
                    <p>Generate reports and analyze operation effectiveness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RaidsHome;