import React, { useState } from 'react';
import { X, MessageSquare, Send, CornerDownRight } from 'lucide-react';
import { CURRENT_USER, getCurrentTime } from '../constants/users';

export default function ThreadDrawer({
  isOpen,
  onClose,
  parentMessage,
  onSendThreadReply
}) {
  const [replyText, setReplyText] = useState('');
  const [threadReplies, setThreadReplies] = useState([
    {
      id: 'thr-1',
      user: 'Elin',
      text: 'Looks good! Reviewing the telemetry tags now.',
      time: '10:20 AM'
    },
    {
      id: 'thr-2',
      user: 'Michael Chen',
      text: 'Testing remaining on the secondary node.',
      time: '10:22 AM'
    },
    {
      id: 'thr-3',
      user: 'Emma Johnson',
      text: 'Ready for deployment! 🚀',
      time: '10:25 AM'
    }
  ]);

  if (!isOpen || !parentMessage) return null;

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = {
      id: `thr-${Date.now()}`,
      user: CURRENT_USER.name,
      text: replyText.trim(),
      time: getCurrentTime()
    };

    setThreadReplies((prev) => [...prev, newReply]);
    if (onSendThreadReply) {
      onSendThreadReply(parentMessage.id, newReply);
    }
    setReplyText('');
  };

  return (
    <aside className="thread-drawer-panel">
      {/* Header */}
      <div className="thread-drawer-header">
        <div className="thread-head-title">
          <MessageSquare size={18} className="accent-icon" />
          <div>
            <h4>Thread</h4>
            <span>Discussion on message</span>
          </div>
        </div>
        <button type="button" className="settings-close-icon-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Parent message card */}
      <div className="thread-parent-message-card">
        <div className="parent-msg-head">
          <strong>{parentMessage.user}</strong>
          <span>{parentMessage.time}</span>
        </div>
        <p className="parent-msg-body">{parentMessage.text}</p>
      </div>

      <div className="thread-replies-divider">
        <span>{threadReplies.length} replies</span>
      </div>

      {/* Replies stream */}
      <div className="thread-replies-scroll-stream">
        {threadReplies.map((r) => (
          <div key={r.id} className="thread-reply-bubble-item">
            <div className="thread-reply-meta">
              <CornerDownRight size={13} className="thread-arrow-icon" />
              <strong>{r.user}</strong>
              <span>{r.time}</span>
            </div>
            <p className="thread-reply-text">{r.text}</p>
          </div>
        ))}
      </div>

      {/* Thread Input Form */}
      <form onSubmit={handleSubmitReply} className="thread-composer-form">
        <input
          type="text"
          placeholder="Reply in thread..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          autoFocus
        />
        <button type="submit" className="thread-send-btn" disabled={!replyText.trim()}>
          <Send size={15} />
        </button>
      </form>
    </aside>
  );
}
