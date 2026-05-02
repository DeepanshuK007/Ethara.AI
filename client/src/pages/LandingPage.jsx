import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--hero-bg)' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--ethara-100)'
      }}>
        <div className="container flex justify-between items-center" style={{ height: '64px' }}>
          <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--foreground)' }}>
            Ethara<span style={{ color: 'var(--ethara-500)' }}>.AI</span> Tasks
          </div>
          <div className="flex gap-4">
            <Link to="/auth" className="btn btn-outline">Login</Link>
            <Link to="/auth" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        paddingTop: '64px', overflow: 'hidden'
      }}>
        {/* Mock Abstract Background */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(circle at center, var(--ethara-900) 0%, var(--hero-bg) 100%)',
          opacity: 0.8
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 20, textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '1.5rem' }}>
            Changing the World with <span style={{ color: 'var(--ethara-400)' }}>Artificial Intelligence</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
            To be the world’s most trusted partner in specialised Reinforcement Learning for fine-tuning AI Models. We've built this task manager to orchestrate complex human-aligned data pipelines.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Start Managing Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Proven Track Record / Features */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Proven Track Record</h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Our expertise is backed by real results. Now, manage your teams with the same precision.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { stat: 'XP System', title: 'Gamified Productivity', desc: 'Earn points for every task you complete on time.' },
              { stat: 'Focus Mode', title: 'Deep Work Integrated', desc: 'Built-in Pomodoro timers for distraction-free work.' },
              { stat: 'Real-Time', title: 'Interactive Kanban', desc: 'Seamlessly drag and drop tasks across stages.' }
            ].map((item, idx) => (
              <div key={idx} className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--ethara-400)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ethara-500)', marginBottom: '0.5rem' }}>
                  {item.stat}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
