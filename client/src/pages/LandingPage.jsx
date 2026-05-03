import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000' }}>
      {/* Hero Section (Includes Navbar within the dark background) */}
      <section style={{
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #021a22 0%, #06313f 50%, #021a22 100%)' // Dark wave-like background placeholder
      }}>
        
        {/* Abstract Wave lines Placeholder using SVG / CSS */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(45, 212, 191, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)',
          zIndex: 1
        }}></div>

        {/* Navbar */}
        <nav style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
          padding: '1.5rem 2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%' }}></div>
            </div>
            Ethara.AI
          </div>

          {/* Nav Links (Pill Shape) */}
          <div style={{
            display: 'flex', gap: '2rem', backgroundColor: 'rgba(255,255,255,0.9)', 
            padding: '0.75rem 2rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 500
          }}>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Data Services</a>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Enterprise</a>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Research</a>
            <a href="#" style={{ color: '#333', textDecoration: 'none' }}>Contact Us</a>
          </div>

          {/* Get Started Button */}
          <Link to="/auth" style={{
            backgroundColor: 'var(--ethara-400)', color: '#000', padding: '0.75rem 1.5rem', 
            borderRadius: '5px', fontWeight: 600, textDecoration: 'none'
          }}>
            Get Started
          </Link>
        </nav>

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', maxWidth: '800px', padding: '0 20px', marginTop: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '50%' }}></div>
            </div>
          </div>
          <h1 style={{ fontSize: '4rem', color: 'white', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.1 }}>
            Changing the World with Artificial Intelligence
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', margin: '0 auto 3rem auto' }}>
            To be the world's most trusted partner in specialised Reinforcement Learning for fine-tuning AI Models
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <Link to="/auth" style={{
              backgroundColor: 'white', color: '#000', padding: '1rem 2rem', 
              borderRadius: '5px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              Get Started →
            </Link>
            <Link to="/auth" style={{
              backgroundColor: 'transparent', color: 'white', border: '2px solid white', padding: '1rem 2rem', 
              borderRadius: '5px', fontWeight: 600, textDecoration: 'none'
            }}>
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Proven Track Record Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Proven Track Record</h2>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '4rem' }}>
          Our expertise is backed by real results and extensive experience in AI data curation.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { stat: '200+', label: 'Projects' },
            { stat: '400K+', label: 'Data Annotation hours' },
            { stat: '5+', label: 'Domain expertise' }
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: '#e6f7f8', padding: '3rem 2rem', borderRadius: '8px', 
              flex: '1', minWidth: '250px', textAlign: 'center'
            }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#024d57', marginBottom: '0.5rem' }}>{item.stat}</div>
              <div style={{ fontSize: '1rem', color: '#555', fontWeight: 500 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Expertise Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#ffffff' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Our Expertise in Post-Training Techniques</h2>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '4rem' }}>
          Our team has deep expertise in crucial training techniques that elevate your LLM's performance.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { title: 'Supervised Fine-Tuning (SFT)', desc: 'We craft domain-specific, high-quality instruction response datasets to precisely steer your model\'s behavior enhancing task performance, alignment, and reliability across targeted use cases.' },
            { title: 'Reinforcement Learning from Human Feedback (RLHF)', desc: 'We craft the perfect human feedback loops, enabling your LLM to align with human preferences and generate more helpful, accurate, and safe responses.' },
            { title: 'Evaluations', desc: 'Our robust evaluation frameworks provide a comprehensive assessment of your model\'s performance, ensuring quality, fairness, and safety. We don\'t just train your model; we validate its success.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              border: '1px solid #bceae6', padding: '2.5rem', borderRadius: '8px', 
              flex: '1', minWidth: '300px', textAlign: 'left', backgroundColor: '#ffffff'
            }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#dcfce7', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>✨</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#024d57' }}>{item.title}</h3>
              <p style={{ color: '#555', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>What Sets Us Apart</h2>
        <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '4rem' }}>
          Our unique combination of advanced technology, expert workforce, and integrated platform delivers unmatched quality and efficiency in AI data services.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { title: 'Human-Aligned Data Engine', desc: 'Proprietary workflows for supervised fine-tuning, RLHF, and model evaluation.\n\nOur advanced data engine combines cutting-edge AI techniques with human expertise to create datasets that truly understand and align with human values, preferences, and reasoning patterns. Every data point is crafted to enhance model safety, reliability, and performance.' },
            { title: 'Vertically Integrated Workforce', desc: 'Trained and vetted workforce curated for AI tasks — with real-time quality checks.\n\nOur carefully selected and continuously trained team of domain experts, annotators, and quality specialists work seamlessly together. From recruitment to certification, we maintain complete control over talent development, ensuring consistent quality and deep understanding of AI training requirements.' },
            { title: 'Platform-Driven Operations', desc: 'End-to-end platform to manage task allocation, quality assurance, feedback loops, and client reporting.\n\nOur proprietary technology platform orchestrates every aspect of data production, from intelligent task distribution and automated quality monitoring to real-time progress tracking and detailed analytics. This ensures scalability, transparency, and consistent delivery excellence.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              border: '1px solid #bceae6', padding: '2.5rem', borderRadius: '8px', 
              flex: '1', minWidth: '300px', textAlign: 'center', backgroundColor: '#ffffff'
            }}>
               <div style={{ width: '48px', height: '48px', backgroundColor: '#0f766e', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <span style={{ fontSize: '1.5rem', color: 'white' }}>⚙️</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#024d57' }}>{item.title}</h3>
              <p style={{ color: '#555', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Spacer / Divider block */}
      <div style={{ height: '200px', backgroundColor: '#115e59' }}></div>

      {/* Footer */}
      <footer style={{ padding: '4rem 2rem 2rem 2rem', backgroundColor: '#ffffff', borderTop: '1px solid #eaeaea' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', gap: '2rem' }}>
          
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#024d57', marginBottom: '1rem' }}>Ethara AI</div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Engineering the future of AI with precision datasets for LLM training.</p>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <h4 style={{ color: '#024d57', marginBottom: '1rem' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>About</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Services</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Technology</a>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <h4 style={{ color: '#024d57', marginBottom: '1rem' }}>Solutions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Research</a>
              <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</a>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <h4 style={{ color: '#024d57', marginBottom: '1rem' }}>Connect</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>Gurugram, India</span>
              <span style={{ color: '#666', fontSize: '0.9rem' }}>Global Operations</span>
            </div>
          </div>
          
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem', color: '#888', fontSize: '0.85rem' }}>
          <a href="#" style={{ color: '#888', textDecoration: 'underline', marginBottom: '0.5rem', display: 'inline-block' }}>Privacy Policies</a>
          <div>© 2025 Ethara AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
