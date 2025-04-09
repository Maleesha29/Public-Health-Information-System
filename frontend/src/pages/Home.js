import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import docimg from '../webImages/Home Page/doctor.jpg';
import vimg from '../webImages/vacccine.jpg';
import dimg from '../webImages/Home Page/dengueM.jpg';
import cimg from '../webImages/Home Page/complain.jpg';
import rimg from '../webImages/Home Page/raids.jpg';
import Scli from '../webImages/Home Page/Slideclinic.jpg';
import Svac from '../webImages/Home Page/Slidevaccine.jpg';
import Ssta from '../webImages/Home Page/Slidestaff.jpg';
import Sdeng from '../webImages/Home Page/Slidedengue.jpg';
import Sraid from '../webImages/Home Page/Slideraids.jpg';
import midwife from '../webImages/Home Page/midwife.png';
import { motion } from 'framer-motion';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSection, setVisibleSection] = useState('hero');
  const sectionRefs = useRef({});

  const slides = [Scli, Svac, Ssta, Sdeng, Sraid, midwife];
  const slideTitles = [
    "World-Class Healthcare",
    "Vaccination Excellence",
    "Expert Medical Team",
    "Dengue Prevention Initiative",
    "Community Health & Safety",
    "Compassionate Midwifery Care"
  ];
  const slideDescriptions = [
    "Access top-quality healthcare services with our state-of-the-art facilities",
    "Stay protected with our comprehensive vaccination programs for all ages",
    "Our dedicated professionals provide personalized care for every patient",
    "Join our mission to combat dengue through prevention and awareness",
    "We actively ensure public health safety through regular inspections",
    "Experience personalized support and expert guidance from pregnancy to postpartum with our dedicated midwifery services."
  ];

  const navigate = useNavigate();

  // Initialize section refs
  useEffect(() => {
    sectionRefs.current = {
      hero: document.getElementById('hero-section'),
      services: document.getElementById('services-section'),
      features: document.getElementById('features-section'),
      testimonials: document.getElementById('testimonials-section'),
      cta: document.getElementById('cta-section')
    };
  }, []);

  // Initialize animations and scroll tracking
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
      mirror: true
    });

    // Automatic slider
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    // Intersection Observer for scroll tracking
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSection(entry.target.id.split('-')[0]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setIsMenuOpen(false), 500);
    }
  };

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const serviceCards = [
    {
      title: "Clinic Services",
      description: "Access our specialized dengue & dental clinics with easy online appointment scheduling and reminders.",
      image: docimg,
      path: "/clinics",
      bgClass: "card-clinic",
      icon: "fa-hospital"
    },
    {
      title: "Vaccination Programs",
      description: "Complete vaccination services from infants to adults. Stay updated with our immunization calendar.",
      image: vimg,
      path: "/vaccines",
      bgClass: "card-vaccine",
      icon: "fa-syringe"
    },
    {
      title: "Dengue Prevention",
      description: "Join our community-driven dengue prevention programs and learn about effective protection measures.",
      image: dimg,
      path: "/dengueCamp",
      bgClass: "card-dengue",
      icon: "fa-shield-virus"
    },
    {
      title: "Report Health Issues",
      description: "Report health hazards in your area including unsafe food practices and potential disease outbreaks.",
      image: cimg,
      path: "/ComplainsHome",
      bgClass: "card-complain",
      icon: "fa-clipboard-list"
    },
    {
      title: "Community Actions",
      description: "See how your reports lead to real actions with transparent tracking of our inspection programs.",
      image: rimg,
      path: "/RF",
      bgClass: "card-raids",
      icon: "fa-users"
    },
    {
      title: "Midwife",
      description: "Providing compassionate care and expert support for mothers throughout pregnancy, childbirth, and postnatal recovery.",
      image: midwife,
      path: "/RF",
      bgClass: "card-midwife",
      icon: "fa-hands-holding-child"
    }
  ];

  const testimonials = [
    {
      name: "Nimal Perera",
      role: "Local Resident",
      text: "The vaccination program was so well organized. I was in and out in 15 minutes, and the staff were incredibly helpful.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Kumari Wijesinghe",
      role: "Housewife",
      text: "I felt very safe and well taken care of during the entire vaccination process. The staff were friendly and organized.",
      avatar: "https://i.pravatar.cc/150?img=10"
    },
    {
      name: "Priya Sharma",
      role: "University Student",
      text: "I appreciated the clear communication throughout the process. The team handled everything with precision and care.",
      avatar: "https://i.pravatar.cc/150?img=7"
    }
  ];

  return (
    <div className="home-page">
      <Layout>
        {/* Floating Navigation Menu */}
        <div className={`floating-menu ${isMenuOpen ? 'open' : ''}`}>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className="floating-nav">
            <ul>
              <li className={visibleSection === 'hero' ? 'active' : ''}>
                <button onClick={() => scrollToSection('hero-section')}>Home</button>
              </li>
              <li className={visibleSection === 'services' ? 'active' : ''}>
                <button onClick={() => scrollToSection('services-section')}>Services</button>
              </li>
              <li className={visibleSection === 'features' ? 'active' : ''}>
                <button onClick={() => scrollToSection('features-section')}>Features</button>
              </li>
              <li className={visibleSection === 'testimonials' ? 'active' : ''}>
                <button onClick={() => scrollToSection('testimonials-section')}>Testimonials</button>
              </li>
              <li className={visibleSection === 'cta' ? 'active' : ''}>
                <button onClick={() => scrollToSection('cta-section')}>Contact</button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Hero Section with Advanced Slider */}
        <section id="hero-section" className="hero-section">
          <div className="hero-slider">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`slide ${activeSlide === index ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide})` }}
              >
                <div className="slide-overlay">
                  <motion.div
                    className="slide-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={activeSlide === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className='slide-title'>{slideTitles[index]}</h1>
                    <p className='slide-description'>{slideDescriptions[index]}</p>
                    <Button
                      className="btn-hero pulse"
                      onClick={() => scrollToSection('services-section')}
                    >
                      Explore Our Services
                    </Button>
                  </motion.div>
                </div>
              </div>
            ))}

            <div className="slider-controls">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${activeSlide === index ? 'active' : ''}`}
                  onClick={() => handleSlideChange(index)}
                  aria-label={`View slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="hero-scroll-indicator">
              <div className="mouse">
                <div className="wheel"></div>
              </div>
              <div className="arrow-down"></div>
            </div>
          </div>
        </section>

        {/* Services Section with Enhanced Cards */}
        <section id="services-section" className="services-section">
          <Container>
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">What We Offer</span>
              <h2>Comprehensive Health Services</h2>
              <p>Discover our range of public health services designed for community wellbeing</p>
            </motion.div>

            <div className="service-cards">
              {serviceCards.map((card, index) => (
                <motion.div
                  className={`service-card ${card.bgClass}`}
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  <div className="card-icon">
                    <i className={`fas ${card.icon}`}></i>
                  </div>
                  <div className="card-image">
                    <img src={card.image} alt={card.title} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <Button
                      className="btn-service"
                      onClick={() => navigate(card.path)}
                    >
                      Learn More <i className="fas fa-arrow-right"></i>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Features & Benefits Section */}
        <section id="features-section" className="features-section">
          <Container>
            <motion.div
              className="section-header light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">Why Choose Us</span>
              <h2>Making Healthcare Accessible</h2>
              <p>Our mission is to provide quality healthcare for everyone in the community</p>
            </motion.div>

            <Row className="features-container">
              {/* Left Column: Stats Cards */}
              <Col md={6} className="features-list">
                <div className="features-list">
                  {[
                    {
                      icon: "fa-hospital-user",
                      title: "Clinic Scheduling Made Simple",
                      text: "Check clinic availability and book appointments without waiting in long lines.",
                    },
                    {
                      icon: "fa-syringe",
                      title: "Vaccination Tracking",
                      text: "Never miss a shot with personalized vaccine reminders and history tracking.",
                    },
                    {
                      icon: "fa-shield-virus",
                      title: "Dengue Prevention Tips",
                      text: "Access real-time dengue alerts and preventive measures tailored to your area.",
                    },
                    {
                      icon: "fa-bullhorn",
                      title: "Report Health Concerns",
                      text: "Help your community by reporting outbreaks or environmental health risks.",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      className="feature-item"
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="feature-icon">
                        <i className={`fas ${feature.icon}`}></i>
                      </div>
                      <div className="feature-content">
                        <h4>{feature.title}</h4>
                        <p>{feature.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Col>

              {/* Right Column: Features List */}
              <Col md={6}>
                <div className="features-list">
                  {[
                    {
                      icon: "fa-hands-helping",
                      title: "Community Health Initiatives",
                      text: "Join health drives, cleanup operations, and awareness campaigns in your barangay."
                    },
                    {
                      icon: "fa-baby",
                      title: "Midwife Assistance & Maternal Care",
                      text: "Find certified midwives and get prenatal/postnatal care for mothers and babies.",
                    },
                    {
                      icon: "fa-hand-holding-heart",
                      title: "Blood Donation Drives",
                      text: "Participate in organized blood donation events to help save lives in your community.",

                    },
                    {
                      icon: "fa-leaf",
                      title: "Mental Health Support",
                      text: "Access mental health resources, counseling services, and stress relief programs.",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      className="feature-item"
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="feature-icon">
                        <i className={`fas ${feature.icon}`}></i>
                      </div>
                      <div className="feature-content">
                        <h4>{feature.title}</h4>
                        <p>{feature.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials-section" className="testimonials-section">
          <Container>
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">Community Voices</span>
              <h2>What People Say About Us</h2>
              <p>Hear from those who have benefited from our services</p>
            </motion.div>

            <div className="testimonial-cards">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  className="testimonial-card"
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="testimonial-quote">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <img src={testimonial.avatar} alt={testimonial.name} className="author-avatar" />
                    <div className="author-info">
                      <h5>{testimonial.name}</h5>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Call to Action Section */}
        <section id="cta-section" className="cta-section">
          <Container>
            <motion.div
              className="cta-container"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="cta-content">
                <h2>Ready to Prioritize Your Health?</h2>
                <p>Join thousands of community members who rely on our health services and information system.</p>
                <div className="cta-buttons">
                  <Button
                    className="btn-primary-lg"
                    onClick={() => navigate('/clinics')}
                  >
                    Book Appointment
                  </Button>
                  <Button
                    className="btn-outline-lg"
                    onClick={() => navigate('/ComplainsHome')}
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
              <div className="cta-stats">
                <div className="stat">
                  <span className="stat-number">10k+</span>
                  <span className="stat-label">Patients Served</span>
                </div>
                <div className="stat">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support Available</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Link to FontAwesome for icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Layout>
    </div>
  );
};

export default Home;