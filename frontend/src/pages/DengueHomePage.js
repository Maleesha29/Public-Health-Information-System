import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../styles/Dengue Campaings/denguehomepage.css';

// Import images - assuming these imports stay the same
import denimg1 from '../webImages/dengueimg1.jpeg';
import denimg2 from '../webImages/dengueimg2.jpeg';
import denimg3 from '../webImages/dengueimg3.jpeg';
import denimg4 from '../webImages/dengueimg4.jpeg';
import denimg5 from '../webImages/dcamp2.jpg';
import denimg6 from '../webImages/denmap.jpg';
import denimg7 from '../webImages/dcamp8.jpg';

const DengueHomePage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="dengue-hero" data-aos="fade-up">
        <div className="dengue-hero__content">
          <h1 className="dengue-hero__title">Together Against Dengue</h1>
          <h2 className="dengue-hero__subtitle">Let's raise awareness and take preventive measures</h2>
          <p className="dengue-hero__text">
            Dengue fever is a viral infection transmitted by mosquitoes, primarily the Aedes aegypti species. 
            It is widespread in tropical and subtropical regions around the world, particularly in urban areas.
            Public awareness campaigns aim to educate the public about the signs and symptoms of dengue fever, 
            the importance of seeking medical care promptly, and the role of individual and community action 
            in preventing the spread of the disease.
          </p>
          <Link to="/DengCampTab" className="dengue-hero__cta">
            Learn More
          </Link>
        </div>
        <div className="dengue-hero__image-container">
          <img src={denimg5} alt="Dengue awareness campaign" className="dengue-hero__image" />
        </div>
      </section>

      {/* Events Section */}
      <section className="dengue-events">
        <h2 className="dengue-events__heading">Upcoming Events</h2>
        <div className="dengue-events__container">
          <div className="dengue-event-card" data-aos="fade-up" data-aos-delay="100">
            <div className="dengue-event-card__image-wrapper">
              <img src={denimg1} className="dengue-event-card__image" alt="Dengue Awareness Day" />
            </div>
            <div className="dengue-event-card__content">
              <h3 className="dengue-event-card__title">Dengue Awareness Day</h3>
              <p className="dengue-event-card__text">
                Join us as we unite to combat dengue fever. On this special day, we aim to raise awareness about 
                dengue prevention, symptoms, and treatment.
              </p>
              <Link to="/DengCampTab" className="dengue-event-card__button">
                More details
              </Link>
            </div>
          </div>

          <div className="dengue-event-card" data-aos="fade-up" data-aos-delay="200">
            <div className="dengue-event-card__image-wrapper">
              <img src={denimg2} className="dengue-event-card__image" alt="Take a Stand Against Dengue" />
            </div>
            <div className="dengue-event-card__content">
              <h3 className="dengue-event-card__title">Take a Stand Against Dengue</h3>
              <p className="dengue-event-card__text">
                "Take a Stand Against Dengue" is a community-driven initiative aimed at combating 
                the spread of dengue fever together for a healthier future.
              </p>
              <Link to="/DengCampTab" className="dengue-event-card__button">
                More details
              </Link>
            </div>
          </div>

          <div className="dengue-event-card" data-aos="fade-up" data-aos-delay="300">
            <div className="dengue-event-card__image-wrapper">
              <img src={denimg3} className="dengue-event-card__image" alt="Dengue Danger Detectives" />
            </div>
            <div className="dengue-event-card__content">
              <h3 className="dengue-event-card__title">Dengue Danger Detectives</h3>
              <p className="dengue-event-card__text">
                "Dengue Danger Detectives" educates children about the dangers of dengue fever 
                and encourages them to take proactive steps to prevent its spread.
                Join the fight against dengue!
              </p>
              <Link to="/DengCampTab" className="dengue-event-card__button">
                More details
              </Link>
            </div>
          </div>

          <div className="dengue-event-card" data-aos="fade-up" data-aos-delay="400">
            <div className="dengue-event-card__image-wrapper">
              <img src={denimg4} className="dengue-event-card__image" alt="Dengue Awareness Drive in Villages" />
            </div>
            <div className="dengue-event-card__content">
              <h3 className="dengue-event-card__title">Dengue Awareness Drive in Villages</h3>
              <p className="dengue-event-card__text">
                Join us in our Dengue Awareness Drive in Villages program, aimed at safeguarding 
                our community against the threat of dengue fever.
              </p>
              <Link to="/DengCampTab" className="dengue-event-card__button">
                More details
              </Link>
            </div>
          </div>
        </div>

        <div className="dengue-events__navigation">
          <button className="dengue-events__nav-button dengue-events__nav-button--prev">
            <span className="dengue-events__nav-icon">←</span>
            <span className="dengue-events__nav-text">Previous</span>
          </button>
          <button className="dengue-events__nav-button dengue-events__nav-button--next">
            <span className="dengue-events__nav-text">Next</span>
            <span className="dengue-events__nav-icon">→</span>
          </button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="dengue-cta-section">
        <div className="dengue-cta-card" data-aos="fade-right">
          <div className="dengue-cta-card__image-container">
            <img src={denimg7} className="dengue-cta-card__image" alt="Add campaign" />
            <div className="dengue-cta-card__overlay"></div>
          </div>
          <div className="dengue-cta-card__content">
            <h3 className="dengue-cta-card__title">Add Your Campaign</h3>
            <p className="dengue-cta-card__text">Contribute to our community efforts by adding your own dengue awareness campaigns.</p>
            <Link to="/denguecamp" className="dengue-cta-card__button">
              Add Campaigns
            </Link>
          </div>
        </div>

        <div className="dengue-cta-card" data-aos="fade-left">
          <div className="dengue-cta-card__image-container">
            <img src={denimg6} className="dengue-cta-card__image" alt="Dengue map" />
            <div className="dengue-cta-card__overlay"></div>
          </div>
          <div className="dengue-cta-card__content">
            <h3 className="dengue-cta-card__title">Dengue Outbreak Map</h3>
            <p className="dengue-cta-card__text">See real-time data on dengue outbreaks in your area and stay informed.</p>
            <Link to="/Denguemap" className="dengue-cta-card__button">
              View Map
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="dengue-stats" data-aos="fade-up">
        <h2 className="dengue-stats__heading">Dengue Impact</h2>
        <div className="dengue-stats__container">
          <div className="dengue-stat-card">
            <div className="dengue-stat-card__number">400M+</div>
            <div className="dengue-stat-card__text">Dengue infections worldwide annually</div>
          </div>
          <div className="dengue-stat-card">
            <div className="dengue-stat-card__number">100+</div>
            <div className="dengue-stat-card__text">Countries affected by dengue</div>
          </div>
          <div className="dengue-stat-card">
            <div className="dengue-stat-card__number">80%</div>
            <div className="dengue-stat-card__text">Cases preventable through awareness</div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DengueHomePage;