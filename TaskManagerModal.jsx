import React, { useState } from 'react';
import { 
  CheckSquare, Plus, Clock, AlertTriangle, User, Check, X, 
  Trash2, ArrowRight, BarChart2
} from 'lucide-react';
import { WORKPLACE_USERS } from '../constants/users';

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Audit Boiler 3 secondary feedwater valve setpoints',
    assignedTo: 'Michael Chen',
    dueDate: '2026-11-18',
    priority: 'High', // 'Low' | 'Medium' | 'High' | 'Critical'
    status: 'In Progress', // 'Todo' | 'In Progress' | 'Done'
    sourceChannel: 'Introductions'
  },
  {
    id: 'task-2',
    title: 'Integrate WhatsApp hover toolbar and reply quotes in React UI',
    assignedTo: 'Emma Johnson',
    dueDate: '2026-11-16',
    priority: 'Critical',
    status: 'Done',
    sourceChannel: 'UI-UX'
  },
  {
    id: 'task-3',
    title: 'Verify Ed25519 air-gapped cryptographic node offline keys',
    assignedTo: 'David Wilson',
    dueDate: '2026-11-20',
    priority: 'Medium',
    status: 'Todo',
    sourceChannel: 'Development'
  }
];

export default function TaskManagerModal({
  isOpen,
  onClose,
  initialTaskTitle = '',
  onTaskCreated
}) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [showCreateForm, setShowCreateForm] = useState(Boolean(initialTaskTitle));
  const [newTitle, setNewTitle] = useState(initialTaskTitle);
  const [assignee, setAssignee] = useState('Emma Johnson');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState('2026-11-19');

  if (!isOpen) return null;

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      assignedTo: assignee,
      dueDate,
      priority,
      status: 'Todo',
      sourceChannel: 'Workplace Chat'
    };

    setTasks((prev) => [newTask, ...prev]);
    if (onTaskCreated) onTaskCreated(newTask);
    setNewTitle('');
    setShowCreateForm(false);
  };

  const handleCycleStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextStatus = t.status === 'Todo' ? 'In Progress' : t.status === 'In Progress' ? 'Done' : 'Todo';
        return { ...t, status: nextStatus };
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const completedCount = tasks.filter((t) => t.status === 'Done').length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  const getPriorityBadgeClass = (p) => {
    switch (p.toLowerCase()) {
      case 'critical': return 'priority-badge-critical';
      case 'high': return 'priority-badge-high';
      case 'medium': return 'priority-badge-medium';
      default: return 'priority-badge-low';
    }
  };

  return (
    <div className="modal-backdrop-generic" onClick={onClose}>
      <div className="task-manager-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dialog-header">
          <div className="dialog-title-row">
            <CheckSquare size={22} className="accent-icon" />
            <div>
              <h3>Workplace Task Manager</h3>
              <p>Turn messages into tasks, track progress & assign deadlines</p>
            </div>
          </div>
          <button type="button" className="dialog-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="task-progress-tracker-bar">
          <div className="tracker-header-row">
            <span>Overall Task Completion</span>
            <strong>{completedCount} of {tasks.length} Done ({progressPercent}%)</strong>
          </div>
          <div className="tracker-progress-track">
            <div className="tracker-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Action button */}
        <div className="task-toolbar-actions">
          <button
            type="button"
            className="btn-create-task-pill"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus size={16} />
            <span>{showCreateForm ? 'Cancel Creation' : 'Create New Task'}</span>
          </button>
        </div>

        {/* Create form */}
        {showCreateForm && (
          <form onSubmit={handleCreateTask} className="create-task-form-box">
            <div className="form-group-item">
              <label>Task Description / Title</label>
              <input
                type="text"
                required
                placeholder="What needs to be done?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-row-twin">
              <div className="form-group-item">
                <label>Assign To</label>
                <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
                  {WORKPLACE_USERS.map((u) => (
                    <option key={u.id} value={u.name}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>

              <div className="form-group-item">
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="form-row-twin">
              <div className="form-group-item">
                <label>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="form-actions-inline">
                <button type="submit" className="btn-primary">
                  Save Task
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Task List */}
        <div className="tasks-scroll-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-list-item status-${task.status.toLowerCase().replace(/\s+/g, '-')}`}>
              <button
                type="button"
                className={`task-checkbox ${task.status === 'Done' ? 'checked' : ''}`}
                onClick={() => handleCycleStatus(task.id)}
                title="Click to cycle status: Todo -> In Progress -> Done"
              >
                {task.status === 'Done' && <Check size={14} color="#fff" />}
              </button>

              <div className="task-content-details">
                <h4 className={task.status === 'Done' ? 'strikethrough' : ''}>{task.title}</h4>
                <div className="task-meta-tags">
                  <span className={`task-priority-tag ${getPriorityBadgeClass(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="task-assignee-tag">
                    <User size={12} />
                    <span>{task.assignedTo}</span>
                  </span>
                  <span className="task-date-tag">
                    <Clock size={12} />
                    <span>Due {task.dueDate}</span>
                  </span>
                  <span className="task-status-pill">{task.status}</span>
                </div>
              </div>

              <button
                type="button"
                className="task-delete-btn"
                onClick={() => handleDeleteTask(task.id)}
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
