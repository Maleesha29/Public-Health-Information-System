import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../../styles/Fine And Court/FineAndCourt.css';
import { FileText, BarChart2, FilePlus, ListFilter, Activity } from 'lucide-react';




const FineAndCourt = () => {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      id: 1,
      title: 'Report Violations',
      description: 'Submit detailed reports of any violations for processing by authorized officers.',
      icon: <FilePlus size={32} />,
      buttonText: 'Submit Report',
      buttonLink: '/Fine-And-court-Report',
      aosAnimation: 'fade-up'
    },
    {
      id: 2,
      title: 'Analyse Reports',
      description: 'Review and analyze submitted violation reports with advanced filtering and sorting.',
      icon: <BarChart2 size={32} />,
      buttonText: 'Analyse Now',
      buttonLink: '/Fine-And-court-Analyse',
      aosAnimation: 'fade-up'
    },
    {
      id: 3,
      title: 'Manage Documents',
      description: 'Organize, store, and access all case-related documents securely in one place.',
      icon: <FileText size={32} />,
      buttonText: 'Manage Documents',
      buttonLink: '/Fine-And-court-Document-Management',
      aosAnimation: 'fade-up'
    }
  ];

  const quickAccess = [
    {
      id: 1,
      title: 'Violation Reports',
      icon: <ListFilter size={20} />,
      link: '/Fine-And-Court-Violation-Reports',
      aosAnimation: 'fade-right'
    },
    {
      id: 2,
      title: 'Report Status',
      icon: <Activity size={20} />,
      link: '/Fine-and-Court-Report-Status',
      aosAnimation: 'fade-up'
    },
    {
      id: 3,
      title: 'Documents',
      icon: <FileText size={20} />,
      link: '/Fine-An-Court-Document-Management',
      aosAnimation: 'fade-left'
    }
  ];

  return (
    <Layout>
      <div className="fnc-container">
        {/* Hero section */}
        <section className="fnc-hero" data-aos="fade-up">
          <div className="fnc-hero-content">
            <h1>Fine and Court Management System</h1>
            <p>A comprehensive platform for managing violations, analyzing reports, and handling case documents efficiently</p>
            <div className="fnc-hero-buttons">
              <Link to="/Fine-And-court-Report" className="fnc-button fnc-button-primary">
                Report Violation
              </Link>
              <Link to="/Fine-and-Court-Report-Status" className="fnc-button fnc-button-secondary">
                View Reports
              </Link>
            </div>
          </div>
          <div className="fnc-hero-graphic">
            <div className="fnc-hero-image-container">
              <div className="fnc-hero-shape"></div>
              <div className="fnc-hero-image"></div>
            </div>
          </div>
        </section>

        {/* About section */}
        <section className="fnc-about" data-aos="fade-up">
          <div className="fnc-section-header">
            <h2>About Our System</h2>
            <div className="fnc-divider"></div>
          </div>
          <div className="fnc-about-content">
            <div className="fnc-about-text">
              <p>
                The Fine and Court system is designed to maintain a fair and just community through efficient violation management. Our platform provides a streamlined process for reporting and analyzing violations of terms and conditions.
              </p>
              <p>
                Authorized Raid Officers can submit comprehensive violation reports while Fine and Court officers can review and analyze these reports to identify trends and patterns for informed decision-making.
              </p>
              <p>
                Our document management system ensures all case-related materials are organized and accessible, supporting a transparent and accountable process essential for a safe and thriving community.
              </p>
            </div>
            <div className="fnc-about-stats">
              <div className="fnc-stat-item">
                <div className="fnc-stat-number">98%</div>
                <div className="fnc-stat-label">Resolution Rate</div>
              </div>
              <div className="fnc-stat-item">
                <div className="fnc-stat-number">24h</div>
                <div className="fnc-stat-label">Response Time</div>
              </div>
              <div className="fnc-stat-item">
                <div className="fnc-stat-number">5k+</div>
                <div className="fnc-stat-label">Cases Handled</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="fnc-features">
          <div className="fnc-section-header" data-aos="fade-up">
            <h2>Key Features</h2>
            <div className="fnc-divider"></div>
          </div>
          <div className="fnc-features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className="fnc-feature-card"
                data-aos={feature.aosAnimation}
                data-aos-delay={index * 100}
              >
                <div className="fnc-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.buttonLink} className="fnc-button fnc-button-outline">
                  {feature.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Quick access section */}
        <section className="fnc-quick-access" data-aos="fade-up">
          <div className="fnc-section-header">
            <h2>Quick Access</h2>
            <div className="fnc-divider"></div>
          </div>
          <div className="fnc-quick-links">
            {quickAccess.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="fnc-quick-link-card"
                data-aos={item.aosAnimation}
              >
                <div className="fnc-quick-link-icon">{item.icon}</div>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="fnc-cta" data-aos="fade-up">
          <div className="fnc-cta-content">
            <h2>Ready to Maintain Justice?</h2>
            <p>Start using our comprehensive violation management system today</p>
            <Link to="/Fine-And-court-Report" className="fnc-button fnc-button-large">
              Get Started
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FineAndCourt;