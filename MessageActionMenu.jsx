import React, { useEffect, useRef } from 'react';
import { 
  Reply, Edit2, Trash2, Copy, Smile, Share2, Pin, Star, 
  CheckSquare, MessageSquare, Info, Download
} from 'lucide-react';

const QUICK_EMOJIS = ['👍', '❤️', '🔥', '😂', '🎉', '💡', '🚀', '👏'];

export default function MessageActionMenu({
  message,
  position,
  onReply,
  onEdit,
  onDelete,
  onCopy,
  onReact,
  onForward,
  onPin,
  onStar,
  onConvertToTask,
  onOpenThread,
  onClose,
  canEdit = true
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="whatsapp-action-menu"
      style={{
        top: `${Math.min(position.y, window.innerHeight - 380)}px`,
        left: `${Math.min(position.x, window.innerWidth - 260)}px`
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Quick Reaction Bar on top (WhatsApp Style) */}
      <div className="quick-reactions-bar">
        {QUICK_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className="quick-reaction-btn"
            onClick={() => {
              onReact(message.id, emoji);
              onClose();
            }}
            title={`React with ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="menu-divider" />

      {/* Menu Actions */}
      <div className="menu-actions-list">
        <button
          type="button"
          className="menu-action-item"
          onClick={() => {
            onReply(message);
            onClose();
          }}
        >
          <Reply size={16} />
          <span>Reply</span>
        </button>

        <button
          type="button"
          className="menu-action-item"
          onClick={() => {
            onOpenThread(message);
            onClose();
          }}
        >
          <MessageSquare size={16} />
          <span>Reply in Thread</span>
        </button>

        <button
          type="button"
          className="menu-action-item"
          onClick={() => {
            onForward(message);
            onClose();
          }}
        >
          <Share2 size={16} />
          <span>Forward Message</span>
        </button>

        <button
          type="button"
          className="menu-action-item"
          onClick={() => {
            onCopy(message.text);
            onClose();
          }}
        >
          <Copy size={16} />
          <span>Copy Text</span>
        </button>

        <button
          type="button"
          className="menu-action-item"
          onClick={() => {
            onPin(message.id);
            onClose();
          }}
        >
          <Pin size={16} />
          <span>{message.isPinned ? 'Unpin Message' : 'Pin Message'}</span>
        </button>

        <button
          type="button"
          className="menu-action-item"
          onClick={() => {
            onStar(message.id);
            onClose();
          }}
        >
          <Star size={16} />
          <span>{message.isStarred ? 'Unstar Message' : 'Star Message'}</span>
        </button>

        <button
          type="button"
          className="menu-action-item"
          onClick={() => {
            onConvertToTask(message);
            onClose();
          }}
        >
          <CheckSquare size={16} />
          <span>Convert to Task</span>
        </button>

        {canEdit && (
          <button
            type="button"
            className="menu-action-item"
            onClick={() => {
              onEdit(message);
              onClose();
            }}
          >
            <Edit2 size={16} />
            <span>Edit Message</span>
          </button>
        )}

        <button
          type="button"
          className="menu-action-item delete-danger"
          onClick={() => {
            onDelete(message.id);
            onClose();
          }}
        >
          <Trash2 size={16} />
          <span>Delete Message</span>
        </button>
      </div>
    </div>
  );
}
