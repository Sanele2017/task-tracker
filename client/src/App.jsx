import { useState, useEffect } from 'react';
import './App.css';
const API_BASE = 'https://solid-yodel-rj9r9qx9wr425774-5000.app.github.dev';

function App() {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Failed to fetch tasks:', err));
  }, []);

  const handleAddTask = () => {
    if (text.trim() === '') return;

    const newTask = {
      text,
      dueDate,
    };

    fetch(`${API_BASE}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((createdTask) => {
        setTasks([...tasks, createdTask]);
        setText('');
        setDueDate('');
      })
      .catch((err) => console.error('Failed to add task:', err));
  };

  const handleDeleteTask = (id) => {
    fetch(`${API_BASE}/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => setTasks(tasks.filter((t) => t.id !== id)))
      .catch((err) => console.error('Failed to delete task:', err));
  };

  return (
<div className="wrapper">
  <h1 className="title">📝 Task Tracker</h1>

  <div className="form">
    <input
      value={task}
      onChange={(e) => setTask(e.target.value)}
      placeholder="Add a new task..."
      className="input"
    />
    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      className="dateInput"
    />
    <button onClick={handleAddTask} className="button">
      Add
    </button>
  </div>

  <ul className="list">
    {tasks.map((t) => (
      <li key={t.id} className="task">
        <div>
          <strong>{t.text}</strong>
          <div style={{ fontSize: '0.9rem', color: '#555' }}>
            📅 Created: {new Date(t.createdAt).toLocaleString()}
            {t.dueDate && <div>⏰ Due: {t.dueDate}</div>}
          </div>
        </div>
        <button onClick={() => handleDeleteTask(t.id)} className="delete">
          ❌
        </button>
      </li>
    ))}
  </ul>
</div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: `'Inter', sans-serif`,
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '2rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  dateInput: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#00b894',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  task: {
    background: '#fff',
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  delete: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    color: '#e17055',
  },
};

export default App;
