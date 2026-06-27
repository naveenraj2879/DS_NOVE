import React, { useRef, useEffect, useState } from 'react';
import heroImg from '../assets/hero.png';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FaBrain, FaCode, FaCloud, FaShieldAlt, 
  FaTerminal, FaPalette,
  FaServer, FaDatabase, FaNetworkWired, FaCheckCircle,
  FaQuoteLeft
} from 'react-icons/fa';
import { MagneticButton } from '../components/common/MagneticButton';
import { useTheme } from '../context/ThemeContext';
import { initialTestimonials } from '../utils/mockData';

// Animated Stats Counter component
const StatsCounter = ({ endValue, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, endValue, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

export const Home = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const [homepageSettings, setHomepageSettings] = useState({
    tagline: 'Futuristic Enterprise Technology Systems',
    showPromoBanner: true,
    promoBannerText: '🔥 DSNOVE recognized as top digital innovator in Q2 2026!'
  });
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-quad'
    });

    // Load admin homepage customization settings if available
    const savedSettings = localStorage.getItem('dsnove_settings');
    if (savedSettings) {
      try {
        setHomepageSettings(JSON.parse(savedSettings));
      } catch {
        /* use defaults */
      }
    }

    const storedTestimonials = localStorage.getItem('dsnove_testimonials');
    if (storedTestimonials) {
      try {
        setTestimonials(JSON.parse(storedTestimonials));
      } catch {
        setTestimonials(initialTestimonials);
      }
    }
  }, []);

  // Three.js 3D Constellation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle creation
    const particleCount = 130;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleSpeeds = [];

    // Distribute particles inside a sphere
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 35 + Math.random() * 20; // sphere radius range

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.15,
        y: (Math.random() - 0.5) * 0.15,
        z: (Math.random() - 0.5) * 0.15
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Glow particle material
    const material = new THREE.PointsMaterial({
      color: isDark ? 0x00f2fe : 0x0a58ca,
      size: 2.2,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Dynamic Connections (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x00f2fe : 0x0a58ca,
      transparent: true,
      opacity: 0.12
    });

    let lineSegments = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial);
    scene.add(lineSegments);

    // Mouse interactive movement variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / height) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse parallax interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particleSystem.rotation.y += 0.002;
      particleSystem.rotation.x += 0.001;

      // Apply mouse skew
      particleSystem.rotation.y += targetX * 0.15;
      particleSystem.rotation.x -= targetY * 0.15;

      // Move individual particles slightly
      const positionsArr = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3] += particleSpeeds[i].x;
        positionsArr[i * 3 + 1] += particleSpeeds[i].y;
        positionsArr[i * 3 + 2] += particleSpeeds[i].z;

        // Bounce back if they expand too far
        const dist = Math.sqrt(
          positionsArr[i * 3] ** 2 +
          positionsArr[i * 3 + 1] ** 2 +
          positionsArr[i * 3 + 2] ** 2
        );

        if (dist > 65 || dist < 20) {
          particleSpeeds[i].x *= -1;
          particleSpeeds[i].y *= -1;
          particleSpeeds[i].z *= -1;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Update lines between nearby particles
      const linePositions = [];
      for (let i = 0; i < particleCount; i++) {
        const x1 = positionsArr[i * 3];
        const y1 = positionsArr[i * 3 + 1];
        const z1 = positionsArr[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = positionsArr[j * 3];
          const y2 = positionsArr[j * 3 + 1];
          const z2 = positionsArr[j * 3 + 2];

          const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
          if (dist < 18) {
            linePositions.push(x1, y1, z1, x2, y2, z2);
          }
        }
      }

      lineSegments.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      lineSegments.geometry.computeBoundingSphere();

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div>
      {/* Promo banner customization */}
      {homepageSettings.showPromoBanner && (
        <div className="bg-primary text-dark py-2 text-center fw-bold" style={{ fontSize: '0.85rem', zIndex: 100, position: 'relative' }}>
          {homepageSettings.promoBannerText}
        </div>
      )}

      {/* Hero Section */}
      <section className="position-relative overflow-hidden d-flex align-items-center" style={{ minHeight: '92vh', background: 'var(--bg-gradient)' }}>
        <div className="position-absolute w-100 h-100 top-0 left-0" style={{ zIndex: 1 }}>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
        
        {/* Glow backdrop lights */}
        <div className="position-absolute rounded-circle" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.12) 0%, transparent 70%)', top: '10%', left: '5%', filter: 'blur(50px)', zIndex: 0 }} />
        <div className="position-absolute rounded-circle" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)', bottom: '10%', right: '5%', filter: 'blur(70px)', zIndex: 0 }} />

        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="section-subtitle mb-3 d-inline-block px-3 py-1 glass-panel text-primary" style={{ borderRadius: '20px', fontSize: '0.8rem' }}>
                  Enterprise Solutions // Scalable Architecture
                </span>
                <h1 className="display-4 fw-extrabold text-white mb-4 lh-sm" style={{ fontWeight: '800' }}>
                  Engineering the Next Epoch of <span className="text-gradient">Digital Intelligence</span>
                </h1>
                <p className="lead text-secondary mb-5" style={{ fontSize: '1.2rem', lineHeight: '1.7' }}>
                  {homepageSettings.tagline}. DSNOVE drives operational excellence using high-performance AI integration, robust security infrastructure, and premium product design.
                </p>
                <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                  <Link to="/portal/register">
                    <MagneticButton className="btn btn-premium btn-lg w-100 px-5">
                      Explore Client Portal
                    </MagneticButton>
                  </Link>
                  <Link to="/contact">
                    <MagneticButton className="btn btn-premium-outline btn-lg w-100 px-5">
                      Contact Consultant
                    </MagneticButton>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Hero Illustration */}
            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  animation: 'heroFloat 4s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 40px rgba(0, 242, 254, 0.25))'
                }}
              >
                <img
                  src={heroImg}
                  alt="DSNOVE Enterprise Technology Platform"
                  style={{
                    width: '100%',
                    maxWidth: '520px',
                    objectFit: 'contain',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Logo Carousel */}
      <section className="border-top border-bottom" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-fluid px-0">
          <div className="logo-slider">
            <div className="logo-track">
              {/* Slide 1 - 7 */}
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">DSNOVE Labs</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">MediCore</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">Vault Mutual</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">Apex Retail</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">SwiftCargo</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">NovaCorp</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">Vertex Systems</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">DSNOVE Labs</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">MediCore</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">Vault Mutual</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">Apex Retail</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">SwiftCargo</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">NovaCorp</div>
              <div className="logo-item text-secondary fw-bold fs-5 tech-font">Vertex Systems</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">What We Do</span>
            <h2 className="section-title">Core Engineering Fields</h2>
          </div>

          <div className="row g-4">
            {/* Service 1: AI */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="glass-panel glass-panel-hover p-4 h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 d-inline-block mb-4">
                  <FaBrain size={32} />
                </div>
                <h4 className="fw-bold mb-3">Artificial Intelligence</h4>
                <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
                  Custom-trained LLMs, private retrieval RAG pipelines, neural vision networks, and decision support integrations.
                </p>
                <Link to="/services" className="text-primary text-decoration-none fw-bold" style={{ fontSize: '0.85rem' }}>
                  Explore Capability →
                </Link>
              </div>
            </div>

            {/* Service 2: Dev */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="glass-panel glass-panel-hover p-4 h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 d-inline-block mb-4">
                  <FaCode size={32} />
                </div>
                <h4 className="fw-bold mb-3">Enterprise Software</h4>
                <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
                  High-performance ERP applications, custom workflow dashboards, and event-driven backend microservices.
                </p>
                <Link to="/services" className="text-primary text-decoration-none fw-bold" style={{ fontSize: '0.85rem' }}>
                  Explore Capability →
                </Link>
              </div>
            </div>

            {/* Service 3: Cloud */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="glass-panel glass-panel-hover p-4 h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 d-inline-block mb-4">
                  <FaCloud size={32} />
                </div>
                <h4 className="fw-bold mb-3">Cloud Infrastructure</h4>
                <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
                  Kubernetes clusters, multi-cloud strategy planning, serverless configurations, and database migrations.
                </p>
                <Link to="/services" className="text-primary text-decoration-none fw-bold" style={{ fontSize: '0.85rem' }}>
                  Explore Capability →
                </Link>
              </div>
            </div>

            {/* Service 4: Sec */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="glass-panel glass-panel-hover p-4 h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 d-inline-block mb-4">
                  <FaShieldAlt size={32} />
                </div>
                <h4 className="fw-bold mb-3">Cybersecurity Core</h4>
                <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
                  Threat detection systems, zero-trust IAM policy integrations, penetration testing, and SOC compliance auditing.
                </p>
                <Link to="/services" className="text-primary text-decoration-none fw-bold" style={{ fontSize: '0.85rem' }}>
                  Explore Capability →
                </Link>
              </div>
            </div>

            {/* Service 5: DevOps */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="glass-panel glass-panel-hover p-4 h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 d-inline-block mb-4">
                  <FaTerminal size={32} />
                </div>
                <h4 className="fw-bold mb-3">DevOps & Automation</h4>
                <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
                  Infrastructure as Code via Terraform, CI/CD automated pipeline builds, and server performance telemetry.
                </p>
                <Link to="/services" className="text-primary text-decoration-none fw-bold" style={{ fontSize: '0.85rem' }}>
                  Explore Capability →
                </Link>
              </div>
            </div>

            {/* Service 6: UX */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="glass-panel glass-panel-hover p-4 h-100">
                <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 d-inline-block mb-4">
                  <FaPalette size={32} />
                </div>
                <h4 className="fw-bold mb-3">UI/UX Interface Design</h4>
                <p className="text-secondary mb-4" style={{ fontSize: '0.9rem' }}>
                  Figma styling libraries, interactive prototyping, cognitive wireframe research, and custom branding guides.
                </p>
                <Link to="/services" className="text-primary text-decoration-none fw-bold" style={{ fontSize: '0.85rem' }}>
                  Explore Capability →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6" data-aos="fade-up">
              <div className="p-3">
                <h2 className="display-4 fw-extrabold text-primary mb-2 tech-font">
                  <StatsCounter endValue={180} suffix="+" />
                </h2>
                <p className="text-secondary mb-0">Engineers & Experts</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="100">
              <div className="p-3">
                <h2 className="display-4 fw-extrabold text-primary mb-2 tech-font">
                  <StatsCounter endValue={99} suffix=".99%" />
                </h2>
                <p className="text-secondary mb-0">Uptime SLA Guaranteed</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
              <div className="p-3">
                <h2 className="display-4 fw-extrabold text-primary mb-2 tech-font">
                  <StatsCounter endValue={12} suffix=" hubs" />
                </h2>
                <p className="text-secondary mb-0">Global Development Hubs</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="300">
              <div className="p-3">
                <h2 className="display-4 fw-extrabold text-primary mb-2 tech-font">
                  <StatsCounter endValue={300} suffix="M+" />
                </h2>
                <p className="text-secondary mb-0">API Transactions Managed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">Client Success</span>
            <h2 className="section-title">Trusted by Enterprise Partners</h2>
          </div>

          <div className="row g-4">
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="glass-panel p-4 h-100 d-flex flex-column">
                  <FaQuoteLeft className="text-primary mb-3" size={24} />
                  <p className="text-secondary flex-grow-1 mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="d-flex align-items-center gap-3 border-top pt-3" style={{ borderColor: 'var(--border-color)' }}>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-circle"
                      style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>{testimonial.name}</h6>
                      <small className="text-secondary">{testimonial.role}, {testimonial.company}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">Methodology</span>
            <h2 className="section-title">Client-Partner Integration</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="timeline-container">
                {/* Step 1 */}
                <div className="timeline-item" data-aos="fade-left">
                  <div className="timeline-dot completed"></div>
                  <h4 className="fw-bold mb-2">Phase 1: Deep Discovery & Threat Modeling</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    We analyze your active server schemas, current team bottlenecks, and project risks. Our security engineers structure a threat vector map before writing code.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="timeline-item" data-aos="fade-left" data-aos-delay="100">
                  <div className="timeline-dot completed"></div>
                  <h4 className="fw-bold mb-2">Phase 2: High-Fidelity UX & Technical Blueprint</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    UX engineers create interactive Figma models, while database architects draft data schemas, API specifications, and cloud landing zone designs.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="timeline-item" data-aos="fade-left" data-aos-delay="200">
                  <div className="timeline-dot active"></div>
                  <h4 className="fw-bold mb-2">Phase 3: Automated Sprint Development</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Dev teams write clean code with Git control. You track live build status, milestones, and pull requests directly from your **Client Portal**.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="timeline-item" data-aos="fade-left" data-aos-delay="300">
                  <div className="timeline-dot"></div>
                  <h4 className="fw-bold mb-2">Phase 4: Vulnerability & QA Audits</h4>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Our team runs automated penetration routines, latency capacity testing, and code audits, ensuring complete SOC2 security compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Showcase */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">Stack Specs</span>
            <h2 className="section-title">Enterprise Tech Integrations</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Frontend */}
            <div className="col-lg-3 col-md-6" data-aos="zoom-in">
              <div className="glass-panel p-4 text-center">
                <FaCode size={24} className="text-primary mb-3" />
                <h5 className="fw-bold mb-3">Web Core</h5>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">React.js</span>
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">TypeScript</span>
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">Next.js</span>
                </div>
              </div>
            </div>

            {/* Cloud */}
            <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="glass-panel p-4 text-center">
                <FaServer size={24} className="text-primary mb-3" />
                <h5 className="fw-bold mb-3">Cloud Ecosystem</h5>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">AWS</span>
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">Kubernetes</span>
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">GCP Cloud</span>
                </div>
              </div>
            </div>

            {/* DB */}
            <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="glass-panel p-4 text-center">
                <FaDatabase size={24} className="text-primary mb-3" />
                <h5 className="fw-bold mb-3">Big Data / Ware</h5>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">Snowflake</span>
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">PostgreSQL</span>
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">Redis</span>
                </div>
              </div>
            </div>

            {/* Network */}
            <div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay="300">
              <div className="glass-panel p-4 text-center">
                <FaNetworkWired size={24} className="text-primary mb-3" />
                <h5 className="fw-bold mb-3">DevOps / CI</h5>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">Terraform</span>
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">GitHub CI</span>
                  <span className="badge bg-dark border border-secondary text-secondary py-2 px-3">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">Execution Tiers</span>
            <h2 className="section-title">Development Cost Models</h2>
          </div>

          <div className="row g-4 align-items-center">
            {/* Tier 1 */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="glass-panel p-4">
                <h5 className="tech-font text-secondary">Discovery & MVP</h5>
                <h2 className="display-6 fw-bold mb-4 text-white">$15K<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/cycle</span></h2>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Perfect for tech-testing or defining clear architecture plans.</p>
                <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />
                <ul className="list-unstyled d-flex flex-column gap-3 mb-5" style={{ fontSize: '0.85rem' }}>
                  <li><FaCheckCircle className="text-primary me-2" /> UX Wireframes & Interactive Prototypes</li>
                  <li><FaCheckCircle className="text-primary me-2" /> 1 Full Architecture Spec Document</li>
                  <li><FaCheckCircle className="text-primary me-2" /> Single Cloud Deployment Dry-Run</li>
                  <li><FaCheckCircle className="text-primary me-2" /> 2 Weeks Dedicated Engineering Sprint</li>
                </ul>
                <Link to="/contact" className="btn btn-premium-outline w-100">Initiate Cycle</Link>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="150">
              <div className="glass-panel p-5 border border-primary" style={{ position: 'relative', overflow: 'hidden' }}>
                <span className="position-absolute bg-primary text-dark fw-bold px-3 py-1 text-uppercase" style={{ fontSize: '0.65rem', right: '-30px', top: '20px', transform: 'rotate(45deg)', width: '120px', textAlign: 'center' }}>Popular</span>
                <h5 className="tech-font text-primary">Dedicated Sprint Team</h5>
                <h2 className="display-6 fw-bold mb-4 text-white">$32K<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/month</span></h2>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Deploy a specialized sprint squad to build and ship features daily.</p>
                <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />
                <ul className="list-unstyled d-flex flex-column gap-3 mb-5" style={{ fontSize: '0.85rem' }}>
                  <li><FaCheckCircle className="text-primary me-2" /> 1 Senior PM, 2 Backend, 2 Frontend</li>
                  <li><FaCheckCircle className="text-primary me-2" /> Full CI/CD automated setup</li>
                  <li><FaCheckCircle className="text-primary me-2" /> Weekly system audit & security testing</li>
                  <li><FaCheckCircle className="text-primary me-2" /> High-priority support response</li>
                </ul>
                <Link to="/contact" className="btn btn-premium w-100">Deploy Team</Link>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="glass-panel p-4">
                <h5 className="tech-font text-secondary">Enterprise Custom</h5>
                <h2 className="display-6 fw-bold mb-4 text-white">Custom<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}> model</span></h2>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Tailored configurations for multi-national conglomerates with complex compliance requirements.</p>
                <hr className="my-4" style={{ borderColor: 'var(--border-color)' }} />
                <ul className="list-unstyled d-flex flex-column gap-3 mb-5" style={{ fontSize: '0.85rem' }}>
                  <li><FaCheckCircle className="text-primary me-2" /> Dedicated solutions architect</li>
                  <li><FaCheckCircle className="text-primary me-2" /> Customized SLA uptime agreements (99.99%)</li>
                  <li><FaCheckCircle className="text-primary me-2" /> SOC2/ISO audit compliance support</li>
                  <li><FaCheckCircle className="text-primary me-2" /> 24/7/365 dedicated hotline support</li>
                </ul>
                <Link to="/contact" className="btn btn-premium-outline w-100">Schedule Assessment</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
