import React from 'react';
import { Bell, MessageSquare, AtSign, Video, Check, X } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'mention',
    title: 'Emma Johnson mentioned you',
    body: '"@Rolande please review the new dark glassmorphism theme tokens!"',
    time: '5 mins ago',
    unread: true
  },
  {
    id: 2,
    type: 'meeting',
    title: 'Meeting Invite: Frontend Review',
    body: 'Starts at 03:00 PM today • 4 teammates attending',
    time: '20 mins ago',
    unread: true
  },
  {
    id: 3,
    type: 'reply',
    title: 'Elin replied to your comment',
    body: '"The responsive hover toolbar is working flawlessly."',
    time: '1 hour ago',
    unread: false
  }
];

export default function NotificationCenter({
  isOpen,
  onClose,
  onSelectNotification
}) {
  if (!isOpen) return null;

  return (
    <div className="notification-center-popover" onClick={(e) => e.stopPropagation()}>
      <div className="notification-head">
        <div className="notif-title-group">
          <Bell size={16} className="accent-icon" />
          <h4>Notifications</h4>
        </div>
        <button type="button" className="close-notif-btn" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="notifications-stream-list">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div key={n.id} className={`notification-item-row ${n.unread ? 'unread' : ''}`}>
            <div className="notif-icon-circle">
              {n.type === 'mention' && <AtSign size={14} />}
              {n.type === 'meeting' && <Video size={14} />}
              {n.type === 'reply' && <MessageSquare size={14} />}
            </div>
            <div className="notif-text-content">
              <strong>{n.title}</strong>
              <p>{n.body}</p>
              <span className="notif-time">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
