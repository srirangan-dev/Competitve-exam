import React from 'react';
import { Plus, Clock, Edit2, Trash2, X } from 'lucide-react';

const card = {
  background: '#fff', borderRadius: 14, border: '0.5px solid #e2e8f0',
  boxShadow: '0 1px 6px rgba(0,0,0,0.05)', overflow: 'hidden',
};

const CardHeader = ({ title, right }) => (
  <div style={{ padding: '0.9rem 1.25rem', borderBottom: '0.5px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <p style={{ fontSize: 14, fontWeight: 500, color: '#0f172a' }}>{title}</p>
    {right}
  </div>
);

const SUBJECT_COLORS = {
  Physics:     { color: '#185FA5', bg: '#E6F1FB' },
  Chemistry:   { color: '#0F6E56', bg: '#EAF3DE' },
  Mathematics: { color: '#854F0B', bg: '#FAEEDA' },
  Mock:        { color: '#534AB7', bg: '#EEEDFE' },
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TaskRow = ({ task, onToggleComplete, onDelete }) => {
  const subj = SUBJECT_COLORS[task.subject] || SUBJECT_COLORS.Physics;
  const isCompleted = task.completed;
  
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '0.7rem 0.9rem',
      background: isCompleted ? '#EAF3DE' : '#f8fafc', 
      borderRadius: 10, 
      border: isCompleted ? '0.5px solid #C0DD97' : '0.5px solid #e2e8f0',
      opacity: isCompleted ? 0.8 : 1,
    }}>
      <button
        onClick={() => onToggleComplete(task.id)}
        style={{
          width: 18, height: 18, borderRadius: 4, 
          border: isCompleted ? 'none' : '1.5px solid #cbd5e1',
          background: isCompleted ? '#0F6E56' : 'transparent',
          flexShrink: 0,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {isCompleted && <span style={{ color: '#fff', fontSize: 12, lineHeight: 1, fontWeight: 600 }}>✓</span>}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ 
          fontSize: 13, 
          fontWeight: 500, 
          color: isCompleted ? '#0F6E56' : '#0f172a', 
          marginBottom: 3,
        }}>
          {task.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 500, padding: '1px 8px', borderRadius: 99, background: subj.bg, color: subj.color }}>{task.subject}</span>
          <span style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={11} /> {task.duration}m</span>
          {isCompleted && <span style={{ fontSize: 11, color: '#0F6E56', fontWeight: 600 }}>✓ Completed</span>}
        </div>
      </div>
      <button onClick={() => onDelete(task.id)} style={{ padding: 5, background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6 }}>
        <Trash2 size={13} color="#f87171" />
      </button>
    </div>
  );
};

const AddTaskModal = ({ open, onClose, onAdd, days }) => {
  const [title, setTitle] = React.useState('');
  const [subject, setSubject] = React.useState('Physics');
  const [duration, setDuration] = React.useState('60');
  const [selectedDay, setSelectedDay] = React.useState(0);

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        subject,
        duration: parseInt(duration) || 60,
        day: selectedDay,
      });
      setTitle('');
      setSubject('Physics');
      setDuration('60');
      setSelectedDay(0);
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
    }}
      onClick={onClose}
    >
      <div
        style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', width: 420, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <p style={{ fontSize: 16, fontWeight: 500, color: '#0f172a' }}>Add study task</p>
          <button onClick={onClose} style={{ padding: 4, background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={18} color="#94a3b8" /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 6 }}>Task title</label>
            <input 
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Physics kinematics"
              style={{ width: '100%', padding: '9px 12px', fontSize: 13, borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', color: '#0f172a', background: '#f8fafc' }}
            />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 6 }}>Select day</label>
            <select 
              value={selectedDay}
              onChange={e => setSelectedDay(parseInt(e.target.value))}
              style={{ width: '100%', padding: '9px 12px', fontSize: 13, borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none', color: '#0f172a', background: '#f8fafc' }}
            >
              {days.map((day, idx) => (
                <option key={idx} value={idx}>{day.day}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 6 }}>Subject</label>
              <select 
                value={subject}
                onChange={e => setSubject(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', fontSize: 13, borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none', color: '#0f172a', background: '#f8fafc' }}
              >
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Mathematics</option>
                <option>Mock</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#64748b', display: 'block', marginBottom: 6 }}>Duration (min)</label>
              <input 
                type="number" 
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="60"
                style={{ width: '100%', padding: '9px 12px', fontSize: 13, borderRadius: 10, border: '0.5px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', color: '#0f172a', background: '#f8fafc' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, paddingTop: 4 }}>
            <button 
              onClick={handleAdd}
              style={{ flex: 1, padding: '10px 0', background: '#185FA5', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            >
              Add task
            </button>
            <button 
              onClick={onClose}
              style={{ flex: 1, padding: '10px 0', background: '#f8fafc', color: '#64748b', border: '0.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudyPlanner = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [weekPlan, setWeekPlan] = React.useState([
    {
      day: 'Monday',
      tasks: [
        { id: 1, title: 'Physics kinematics', duration: 90, subject: 'Physics', completed: false },
        { id: 2, title: 'Chemistry bonding', duration: 75, subject: 'Chemistry', completed: false },
      ],
    },
    {
      day: 'Tuesday',
      tasks: [
        { id: 3, title: 'Math integration', duration: 120, subject: 'Mathematics', completed: false },
      ],
    },
    {
      day: 'Wednesday',
      tasks: [
        { id: 4, title: 'Physics mechanics', duration: 100, subject: 'Physics', completed: false },
      ],
    },
    {
      day: 'Thursday',
      tasks: [],
    },
    {
      day: 'Friday',
      tasks: [],
    },
    {
      day: 'Saturday',
      tasks: [],
    },
  ]);

  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      subject: taskData.subject,
      duration: taskData.duration,
      completed: false,
    };

    const updatedPlan = [...weekPlan];
    updatedPlan[taskData.day].tasks.push(newTask);
    setWeekPlan(updatedPlan);
  };

  const handleToggleComplete = (dayIdx, taskId) => {
    const updatedPlan = [...weekPlan];
    const task = updatedPlan[dayIdx].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
    setWeekPlan(updatedPlan);
  };

  const handleDeleteTask = (dayIdx, taskId) => {
    const updatedPlan = [...weekPlan];
    updatedPlan[dayIdx].tasks = updatedPlan[dayIdx].tasks.filter(t => t.id !== taskId);
    setWeekPlan(updatedPlan);
  };

  const totalTasksThisWeek = weekPlan.reduce((sum, day) => sum + day.tasks.length, 0);
  const totalDurationThisWeek = weekPlan.reduce((sum, day) => 
    sum + day.tasks.reduce((daySum, task) => daySum + task.duration, 0), 0
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '2rem' }}>
      <AddTaskModal 
        open={showModal} 
        onClose={() => setShowModal(false)}
        onAdd={handleAddTask}
        days={weekPlan}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: '#0f172a', marginBottom: 4 }}>Study planner</h1>
          <p style={{ fontSize: 14, color: '#64748b' }}>Plan your study schedule for the week</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#185FA5', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
        >
          <Plus size={15} /> Add task
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
        <div style={card}>
          <div style={{ padding: '1rem 1.25rem' }}>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Tasks this week</p>
            <p style={{ fontSize: 26, fontWeight: 500, color: '#0f172a' }}>{totalTasksThisWeek}</p>
          </div>
        </div>
        <div style={card}>
          <div style={{ padding: '1rem 1.25rem' }}>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Total study time</p>
            <p style={{ fontSize: 26, fontWeight: 500, color: '#0f172a' }}>{Math.round(totalDurationThisWeek / 60)}h {totalDurationThisWeek % 60}m</p>
          </div>
        </div>
      </div>

      {/* Week plan */}
      <div style={card}>
        <CardHeader title="Your study schedule" />
        <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {weekPlan.map((day, dayIdx) => (
            <div key={dayIdx}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 10 }}>{day.day}</p>
              {day.tasks.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 12 }}>
                  {day.tasks.map(task => (
                    <TaskRow 
                      key={task.id} 
                      task={task}
                      onToggleComplete={() => handleToggleComplete(dayIdx, task.id)}
                      onDelete={() => handleDeleteTask(dayIdx, task.id)}
                    />
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 12, color: '#cbd5e1', fontStyle: 'italic', paddingLeft: 12 }}>No tasks scheduled</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;