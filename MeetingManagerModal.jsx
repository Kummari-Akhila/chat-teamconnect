import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, Video, Plus, FileText, Check, X, 
  HelpCircle, Hand, Disc, History, Play, BookmarkCheck
} from 'lucide-react';
import { WORKPLACE_USERS } from '../constants/users';

const INITIAL_MEETINGS = [
  {
    id: 'meet-1',
    title: 'Frontend Review & Glassmorphism Polish',
    date: '2026-11-16',
    time: '03:00 PM',
    duration: '45 mins',
    participants: ['Emma Johnson', 'Michael Chen', 'Elin', 'Alan'],
    agenda: 'Review responsive macOS titlebar, hover toolbars, and custom wallpapers.',
    status: 'upcoming',
    notes: 'Completed review of dark glassmorphism theme tokens. All PRs merged.'
  },
  {
    id: 'meet-2',
    title: 'Boiler 3 Telemetry & Pulse APM Setpoints',
    date: '2026-11-15',
    time: '11:00 AM',
    duration: '30 mins',
    participants: ['David Wilson', 'Ava Taylor', 'Ethan Clark'],
    agenda: 'Analyze 342°C thermal baseline and Ed25519 air-gapped node telemetry.',
    status: 'completed',
    notes: 'Efficiency verified at 98.2%. Scheduled next soot-blowing cycle.',
    hasRecording: true
  }
];

export default function MeetingManagerModal({
  isOpen,
  onClose,
  onStartInstantMeeting,
  onSendMeetingInviteToChat
}) {
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'schedule' | 'history'
  
  // New meeting form
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-11-16');
  const [time, setTime] = useState('04:00 PM');
  const [agenda, setAgenda] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(['Emma Johnson', 'Michael Chen']);

  // Meeting notes editor state
  const [activeNotesMeetingId, setActiveNotesMeetingId] = useState(null);
  const [meetingNotesText, setMeetingNotesText] = useState('');

  if (!isOpen) return null;

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMeeting = {
      id: `meet-${Date.now()}`,
      title: title.trim(),
      date,
      time,
      duration: '45 mins',
      participants: selectedUsers,
      agenda: agenda.trim() || 'General team sync',
      status: 'upcoming',
      notes: ''
    };

    setMeetings((prev) => [newMeeting, ...prev]);

    // Send invitation card directly into chat!
    if (onSendMeetingInviteToChat) {
      onSendMeetingInviteToChat(newMeeting);
    }

    setTitle('');
    setAgenda('');
    setActiveTab('upcoming');
  };

  const toggleUserSelection = (userName) => {
    setSelectedUsers((prev) =>
      prev.includes(userName)
        ? prev.filter((u) => u !== userName)
        : [...prev, userName]
    );
  };

  const handleOpenNotes = (meeting) => {
    setActiveNotesMeetingId(meeting.id);
    setMeetingNotesText(meeting.notes || '');
  };

  const handleSaveNotes = () => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === activeNotesMeetingId ? { ...m, notes: meetingNotesText } : m
      )
    );
    setActiveNotesMeetingId(null);
  };

  return (
    <div className="modal-backdrop-generic" onClick={onClose}>
      <div className="meeting-manager-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dialog-header">
          <div className="dialog-title-row">
            <Calendar size={22} className="accent-icon" />
            <div>
              <h3>Meetings & Calendar Sync</h3>
              <p>Schedule syncs, run instant calls, take notes & view past recordings</p>
            </div>
          </div>
          <button type="button" className="dialog-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="dialog-tabs-strip">
          <button
            type="button"
            className={`dialog-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Syncs ({meetings.filter((m) => m.status === 'upcoming').length})
          </button>
          <button
            type="button"
            className={`dialog-tab ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Plus size={15} />
            <span>Schedule New</span>
          </button>
          <button
            type="button"
            className={`dialog-tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <History size={15} />
            <span>Past History & Recordings</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="dialog-content-body">
          {activeTab === 'upcoming' && (
            <div className="meetings-list-stack">
              {/* Instant Meeting Banner */}
              <div className="instant-meeting-banner">
                <div>
                  <strong>Need a quick sync?</strong>
                  <p>Start a live audio/video call right now and invite teammates instantly.</p>
                </div>
                <button
                  type="button"
                  className="start-instant-btn"
                  onClick={() => {
                    onClose();
                    onStartInstantMeeting();
                  }}
                >
                  <Video size={16} />
                  <span>Start Instant Meeting</span>
                </button>
              </div>

              {meetings
                .filter((m) => m.status === 'upcoming')
                .map((m) => (
                  <div key={m.id} className="meeting-card-item">
                    <div className="meeting-card-head">
                      <div>
                        <h4>{m.title}</h4>
                        <div className="meeting-time-pill">
                          <Clock size={13} />
                          <span>{m.date} at {m.time} ({m.duration})</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="join-meeting-btn"
                        onClick={() => {
                          onClose();
                          onStartInstantMeeting(m.title);
                        }}
                      >
                        <Video size={15} />
                        <span>Join</span>
                      </button>
                    </div>

                    <p className="meeting-agenda-desc"><strong>Agenda:</strong> {m.agenda}</p>

                    <div className="meeting-participants-preview">
                      <Users size={14} />
                      <span>{m.participants.join(', ')}</span>
                    </div>

                    <div className="meeting-actions-row">
                      <button 
                        type="button" 
                        className="btn-text-action"
                        onClick={() => handleOpenNotes(m)}
                      >
                        <FileText size={14} />
                        <span>Meeting Notes</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'schedule' && (
            <form onSubmit={handleScheduleSubmit} className="schedule-form-stack">
              <div className="form-group-item">
                <label>Meeting Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sprint Review & Asset Model Handover"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-row-twin">
                <div className="form-group-item">
                  <label>Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="form-group-item">
                  <label>Time</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 03:00 PM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group-item">
                <label>Meeting Agenda & Goals</label>
                <textarea
                  rows={3}
                  placeholder="Discussion points, deliverables, review items..."
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                />
              </div>

              <div className="form-group-item">
                <label>Invite Teammates</label>
                <div className="user-chips-selector">
                  {WORKPLACE_USERS.map((user) => {
                    const isSelected = selectedUsers.includes(user.name);
                    return (
                      <button
                        key={user.id}
                        type="button"
                        className={`chip-toggle ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleUserSelection(user.name)}
                      >
                        <span>{user.name}</span>
                        {isSelected && <Check size={13} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-actions-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setActiveTab('upcoming')}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Schedule & Send Invite
                </button>
              </div>
            </form>
          )}

          {activeTab === 'history' && (
            <div className="meetings-history-list">
              {meetings
                .filter((m) => m.status === 'completed')
                .map((m) => (
                  <div key={m.id} className="history-meeting-card">
                    <div className="history-head">
                      <div>
                        <h4>{m.title}</h4>
                        <span className="history-date">{m.date} • Conducted by Exactspace Team</span>
                      </div>
                      {m.hasRecording && (
                        <div className="recording-badge">
                          <Disc size={14} className="rec-dot" />
                          <span>Recording Available (24 MB)</span>
                        </div>
                      )}
                    </div>
                    <div className="history-notes-box">
                      <strong>Meeting Minutes & Notes:</strong>
                      <p>{m.notes}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Meeting Notes Editor Modal */}
        {activeNotesMeetingId && (
          <div className="nested-notes-modal-overlay">
            <div className="nested-notes-box">
              <div className="dialog-header">
                <h4>Meeting Minutes & Rich Notes</h4>
                <button type="button" onClick={() => setActiveNotesMeetingId(null)}>
                  <X size={18} />
                </button>
              </div>
              <textarea
                rows={6}
                className="rich-notes-area"
                value={meetingNotesText}
                onChange={(e) => setMeetingNotesText(e.target.value)}
                placeholder="Type meeting decisions, action items, assignees..."
              />
              <div className="modal-actions-bar">
                <button type="button" className="btn-secondary" onClick={() => setActiveNotesMeetingId(null)}>
                  Close
                </button>
                <button type="button" className="btn-primary" onClick={handleSaveNotes}>
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
