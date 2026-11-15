import React, { useState } from 'react';
import { 
  Hash, Plus, Edit3, MessageSquare, Users, Video, CheckSquare, 
  BarChart2, PenTool, Settings, Sparkles, X, ChevronDown, ChevronRight
} from 'lucide-react';
import { CURRENT_USER } from '../constants/users';

export default function Sidebar({
  channels = [],
  directMessages = [],
  activeChatId,
  onSelectChat,
  onAddChannel,
  onAddDM,
  isOpen,
  onCloseMobile,
  onOpenSettings,
  onOpenDashboard,
  onOpenMeetings,
  onOpenTasks,
  onOpenWhiteboard
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelDesc, setNewChannelDesc] = useState('');

  const handleCreateChannel = (e) => {
    e.preventDefault();
    if (!newChannelName.trim()) return;

    onAddChannel({
      name: newChannelName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      displayName: newChannelName.trim(),
      description: newChannelDesc.trim() || 'Custom workplace discussion'
    });

    setNewChannelName('');
    setNewChannelDesc('');
    setShowAddModal(false);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="mobile-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`workplace-mac-sidebar ${isOpen ? 'open' : ''}`}>
        {/* macOS Title Bar with 3 Colored Dots & Compose icon */}
        <div className="mac-window-topbar">
          <div className="mac-traffic-lights">
            <span className="mac-light red" title="Close" />
            <span className="mac-light yellow" title="Minimize" />
            <span className="mac-light green" title="Maximize" />
          </div>

          <button 
            type="button" 
            className="mac-compose-btn"
            onClick={() => setShowAddModal(true)}
            title="Create new channel or conversation"
          >
            <Edit3 size={17} />
          </button>
        </div>

        {/* Scrollable Channels & DMs */}
        <div className="sidebar-tree-scroll-viewport">
          {/* Channels Section */}
          <div className="sidebar-tree-group">
            <div className="tree-group-header">
              <span className="group-heading-title">Channels</span>
              <button
                type="button"
                className="group-add-btn"
                onClick={() => setShowAddModal(true)}
                title="Create Channel"
              >
                <Plus size={15} />
              </button>
            </div>

            <div className="tree-items-column">
              {channels.map((ch) => {
                const isActive = ch.id === activeChatId;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    className={`channel-tree-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectChat(ch.id, 'channel');
                      if (onCloseMobile) onCloseMobile();
                    }}
                  >
                    <span className="channel-hash-icon">
                      <Hash size={16} />
                    </span>
                    <span className="channel-item-name">{ch.name}</span>
                    {ch.unreadCount > 0 && (
                      <span className="channel-unread-badge">{ch.unreadCount}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div className="sidebar-tree-group">
            <div className="tree-group-header">
              <span className="group-heading-title">Direct Messages</span>
              <button
                type="button"
                className="group-add-btn"
                onClick={onAddDM}
                title="New Direct Message"
              >
                <Plus size={15} />
              </button>
            </div>

            <div className="tree-items-column">
              {directMessages.map((dm) => {
                const isActive = dm.id === activeChatId;
                return (
                  <button
                    key={dm.id}
                    type="button"
                    className={`dm-tree-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      onSelectChat(dm.id, 'dm');
                      if (onCloseMobile) onCloseMobile();
                    }}
                  >
                    <div className="dm-avatar-wrapper">
                      {dm.avatar ? (
                        <img src={dm.avatar} alt={dm.name} className="dm-avatar-img" />
                      ) : (
                        <div className="dm-avatar-initials" style={{ backgroundColor: dm.color || '#a855f7' }}>
                          {dm.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="dm-text-meta">
                      <span className="dm-user-name">{dm.name}</span>
                      <span className="dm-status-sub">{dm.statusText || 'Active status'}</span>
                    </div>

                    <span className={`dm-status-dot ${dm.status || 'online'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Workplace App Launchers */}
        <div className="sidebar-app-launchers-dock">
          <button
            type="button"
            className="dock-tool-btn"
            onClick={onOpenDashboard}
            title="Workplace Analytics Dashboard"
          >
            <BarChart2 size={18} />
            <span>Metrics</span>
          </button>

          <button
            type="button"
            className="dock-tool-btn"
            onClick={onOpenMeetings}
            title="Meetings & Calendar"
          >
            <Video size={18} />
            <span>Meetings</span>
          </button>

          <button
            type="button"
            className="dock-tool-btn"
            onClick={onOpenTasks}
            title="Workplace Tasks"
          >
            <CheckSquare size={18} />
            <span>Tasks</span>
          </button>

          <button
            type="button"
            className="dock-tool-btn"
            onClick={onOpenWhiteboard}
            title="Shared Whiteboard"
          >
            <PenTool size={18} />
            <span>Board</span>
          </button>
        </div>

        {/* Current User Profile Card */}
        <div className="sidebar-user-footer-card">
          <div className="footer-avatar-circle">RR</div>
          <div className="footer-user-meta">
            <strong>{CURRENT_USER.name}</strong>
            <span>{CURRENT_USER.role}</span>
          </div>
          <button
            type="button"
            className="footer-gear-btn"
            onClick={onOpenSettings}
            title="Workspace Settings"
          >
            <Settings size={18} />
          </button>
        </div>

        {/* Create Channel Modal */}
        {showAddModal && (
          <div className="modal-backdrop-generic" onClick={() => setShowAddModal(false)}>
            <div className="add-channel-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="dialog-header">
                <h4>Create New Channel</h4>
                <button type="button" onClick={() => setShowAddModal(false)}>
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleCreateChannel}>
                <div className="form-group-item">
                  <label>Channel Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. edge-scada-telemetry"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="form-group-item">
                  <label>Topic / Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Real-time edge diagnostics"
                    value={newChannelDesc}
                    onChange={(e) => setNewChannelDesc(e.target.value)}
                  />
                </div>
                <div className="modal-actions-bar">
                  <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Channel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
