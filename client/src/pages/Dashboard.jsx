import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://127.0.0.1:5000/api/projects', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(userData));
    fetchProjects();
  }, [navigate]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://127.0.0.1:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: projectName, description: projectDesc })
      });
      if (res.ok) {
        setProjectName('');
        setProjectDesc('');
        setShowForm(false);
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
        <div className="container flex justify-between items-center">
          <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>Ethara.AI Tasks</div>
          <div className="flex items-center gap-4">
            <div style={{ background: 'var(--ethara-50)', color: 'var(--ethara-600)', padding: '0.5rem 1rem', borderRadius: '99px', fontWeight: 600 }}>
              🌟 {user.xpPoints || 0} XP
            </div>
            <button className="btn btn-outline" onClick={() => { localStorage.clear(); navigate('/'); }}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '3rem' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
          <h2>Your Projects</h2>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ New Project'}
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ marginBottom: '2.5rem', border: '1px solid var(--ethara-400)', backgroundColor: 'var(--background)' }}>
            <h3>Create a New Project</h3>
            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Project Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Image Evaluation Engine"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
                <textarea
                  className="input"
                  style={{ minHeight: '80px' }}
                  placeholder="What is the purpose of this project?"
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>
                Create Project
              </button>
            </form>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--muted)' }}>
            <h3 style={{ marginBottom: '1rem' }}>No Projects Found</h3>
            <p style={{ color: 'var(--muted-foreground)' }}>You haven't been assigned to any projects yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {projects.map(project => (
              <Link to={`/projects/${project._id}`} key={project._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" style={{ borderTop: `4px solid ${project.themeColor || 'var(--ethara-400)'}`, height: '100%' }}>
                  <h3 style={{ marginBottom: '0.5rem' }}>{project.name}</h3>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>{project.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--ethara-600)', fontWeight: 500 }}>{project.members?.length || 0} Members</span>
                    <span style={{ color: 'var(--muted-foreground)' }}>Owner: {project.ownerId?.name || 'Unknown'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
