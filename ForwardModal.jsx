import React, { useState } from 'react';
import { Share2, Search, Check, X, Hash, User } from 'lucide-react';
import { WORKPLACE_USERS } from '../constants/users';

export default function ForwardModal({
  isOpen,
  onClose,
  message,
  channels = [],
  onConfirmForward
}) {
  const [search, setSearch] = useState('');
  const [selectedTarget, setSelectedTarget] = useState(null);

  if (!isOpen || !message) return null;

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = WORKPLACE_USERS.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleForward = () => {
    if (!selectedTarget) return;
    onConfirmForward(selectedTarget, message);
    onClose();
  };

  return (
    <div className="modal-backdrop-generic" onClick={onClose}>
      <div className="forward-message-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div className="dialog-title-row">
            <Share2 size={20} className="accent-icon" />
            <h4>Forward Message</h4>
          </div>
          <button type="button" className="dialog-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Message preview snippet */}
        <div className="forward-snippet-box">
          <strong>{message.user}:</strong>
          <p>{message.text}</p>
        </div>

        <div className="forward-search-input-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search channel or teammate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="forward-targets-list">
          <div className="target-section-title">Channels</div>
          {filteredChannels.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`target-item-btn ${selectedTarget?.id === c.id ? 'active' : ''}`}
              onClick={() => setSelectedTarget({ id: c.id, type: 'channel', name: c.name })}
            >
              <Hash size={16} />
              <span>{c.name}</span>
              {selectedTarget?.id === c.id && <Check size={16} className="check-icon" />}
            </button>
          ))}

          <div className="target-section-title">Direct Messages</div>
          {filteredUsers.map((u) => (
            <button
              key={u.id}
              type="button"
              className={`target-item-btn ${selectedTarget?.id === u.id ? 'active' : ''}`}
              onClick={() => setSelectedTarget({ id: u.id, type: 'dm', name: u.name })}
            >
              <User size={16} />
              <span>{u.name}</span>
              {selectedTarget?.id === u.id && <Check size={16} className="check-icon" />}
            </button>
          ))}
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={!selectedTarget}
            onClick={handleForward}
          >
            Send Forward
          </button>
        </div>
      </div>
    </div>
  );
}
