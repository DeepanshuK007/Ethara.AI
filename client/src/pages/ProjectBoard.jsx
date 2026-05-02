import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import FocusTimer from '../components/FocusTimer';

const ProjectBoard = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState({ TODO: [], IN_PROGRESS: [], DONE: [] });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/tasks/project/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      // Organize tasks by status
      const organized = { TODO: [], IN_PROGRESS: [], DONE: [] };
      if (Array.isArray(data)) {
        data.forEach(task => organized[task.status].push(task));
      }
      setTasks(organized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://127.0.0.1:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDesc,
          status: 'TODO',
          projectId: id
        })
      });
      if (res.ok) {
        setTaskTitle('');
        setTaskDesc('');
        setShowForm(false);
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // Optimistic UI Update
    const sourceCol = [...tasks[source.droppableId]];
    const destCol = source.droppableId === destination.droppableId ? sourceCol : [...tasks[destination.droppableId]];
    const [movedTask] = sourceCol.splice(source.index, 1);
    
    movedTask.status = destination.droppableId;
    destCol.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol
    });

    // Backend Update
    try {
      await fetch(`http://127.0.0.1:5000/api/tasks/${movedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: destination.droppableId })
      });
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Board...</div>;

  const columns = ['TODO', 'IN_PROGRESS', 'DONE'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--muted)', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border)', padding: '1rem 2rem' }}>
        <div className="flex justify-between items-center">
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--ethara-600)', fontWeight: 600 }}>← Back to Dashboard</Link>
          <div style={{ fontWeight: 800 }}>Project Kanban</div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Task'}
          </button>
        </div>
      </nav>

      {showForm && (
        <div className="container" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="card" style={{ border: '1px solid var(--ethara-400)', backgroundColor: 'var(--background)' }}>
            <h3>Create a New Task</h3>
            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Task Title</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Conduct data annotation training"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Task Description</label>
                <textarea
                  className="input"
                  style={{ minHeight: '80px' }}
                  placeholder="Additional context about this task"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>
                Save Task
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={{ padding: '2rem', flex: 1, display: 'flex', gap: '1.5rem', overflowX: 'auto' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map(columnId => (
            <div key={columnId} style={{ flex: 1, minWidth: '300px', backgroundColor: 'var(--background)', borderRadius: '0.75rem', padding: '1rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--ethara-100)', color: 'var(--foreground)' }}>
                {columnId.replace('_', ' ')}
              </h3>
              
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ flex: 1, minHeight: '200px', backgroundColor: snapshot.isDraggingOver ? 'var(--ethara-50)' : 'transparent', transition: 'background-color 0.2s ease', borderRadius: '0.5rem' }}
                  >
                    {tasks[columnId].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="card"
                            style={{
                              ...provided.draggableProps.style,
                              marginBottom: '0.75rem',
                              padding: '1rem',
                              borderLeft: `4px solid ${columnId === 'DONE' ? 'var(--ethara-400)' : columnId === 'IN_PROGRESS' ? '#f59e0b' : 'var(--border)'}`,
                              boxShadow: snapshot.isDragging ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 1px 3px 0 rgba(0,0,0,0.1)',
                            }}
                          >
                            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{task.title}</h4>
                            {task.description && <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{task.description}</p>}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>

      <FocusTimer />
    </div>
  );
};

export default ProjectBoard;
