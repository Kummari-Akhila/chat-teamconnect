import React, { useState } from 'react';
import {
  Reply, Copy, Trash2, Edit2, Share2, MoreHorizontal, ThumbsUp,
  CornerUpLeft, Pin, Star, CheckSquare, Play, Pause, Download,
  FileText, Check, CheckCheck, Quote, Smile, Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { USER_COLORS, getInitials } from '../constants/users';
import { soundManager } from '../utils/sound';

export default function MessageItem({
  message,
  onLike,
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
  onOpenActionMenu,
  isEditing,
  onSaveEdit,
  onCancelEdit,
  onVotePoll
}) {
  const [isLiking, setIsLiking] = useState(false);
  const [showQuickReact, setShowQuickReact] = useState(false);
  const [editText, setEditText] = useState(message.text);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const {
    id, user, avatar, text, time, likes = 0, reactions = {},
    edited = false, replyTo, isPinned, isStarred, attachment,
    poll, voiceNote
  } = message;

  const userColor = USER_COLORS[user] || '#a855f7';

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiking(true);
    soundManager.playLike();
    onLike(id);

    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 16,
        spread: 45,
        origin: { x, y },
        colors: ['#a855f7', '#ec4899', '#f59e0b', '#10b981'],
        disableForReducedMotion: true,
        ticks: 120,
        scalar: 0.7
      });
    } catch (e) { }

    setTimeout(() => {
      setIsLiking(false);
    }, 300);
  };

  const handleMoreButtonClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    onOpenActionMenu(message, {
      x: rect.left - 180,
      y: rect.bottom + 6
    });
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    onOpenActionMenu(message, { x: e.clientX, y: e.clientY });
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editText.trim()) {
        onSaveEdit(id, editText.trim());
      }
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  // Render text with highlighted @mentions
  const renderFormattedText = (rawText = '') => {
    const mentionRegex = /(@(?:Alan|Bob|Carol|Dean|Elin|Emma|Michael|Sophia|David|Olivia|Ethan|Ava|Ryan|Mia|Noah|All|Development-Team|[a-zA-Z0-9_-]+)\b)/g;
    const parts = rawText.split(mentionRegex);

    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="mention-tag-pill">
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const isSentByElinOrMe = user === 'Elin' || user === 'Rolande Raimondi';

  return (
    <div
      className={`workplace-message-row ${isSentByElinOrMe ? 'highlighted-purple-bubble' : ''}`}
      onContextMenu={handleContextMenu}
    >
      {/* User Avatar */}
      <div className="message-user-avatar-stage">
        {avatar ? (
          <img src={avatar} alt={user} className="message-author-avatar-img" />
        ) : (
          <div
            className="message-avatar-fallback-initials"
            style={{ backgroundColor: userColor }}
          >
            {getInitials(user)}
          </div>
        )}
      </div>

      {/* Message Column */}
      <div className="message-content-column">
        {/* Main Message Bubble */}
        <div className="message-bubble-wrapper">
          {/* Bubble Header: Author Name & Quick Hover Toolbar */}
          <div className="bubble-top-meta-header">
            <div className="author-and-badges">
              <span className="author-display-title">{user}</span>
              <span className="author-time-label">{time}</span>
              {edited && <span className="edited-indicator">(edited)</span>}
              {isPinned && <span className="meta-icon-badge" title="Pinned message"><Pin size={12} /></span>}
              {isStarred && <span className="meta-icon-badge text-gold" title="Starred message"><Star size={12} /></span>}
            </div>

            {/* Hover Action Toolbar matching screenshot with Emoji React button */}
            <div className="message-hover-toolbar-cluster">
              <button
                type="button"
                className={`hover-tool-icon-btn ${showQuickReact ? 'active-react' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickReact(!showQuickReact);
                }}
                title="React with Emoji"
              >
                <Smile size={16} />
              </button>
              <button
                type="button"
                className="hover-tool-icon-btn"
                onClick={() => onReply(message)}
                title="Reply"
              >
                <Reply size={15} />
              </button>
              <button
                type="button"
                className="hover-tool-icon-btn"
                onClick={() => onForward(message)}
                title="Forward / Share"
              >
                <Share2 size={15} />
              </button>
              <button
                type="button"
                className="hover-tool-icon-btn"
                onClick={() => onCopy(text)}
                title="Copy Text"
              >
                <Copy size={15} />
              </button>
              <button
                type="button"
                className="hover-tool-icon-btn danger"
                onClick={() => onDelete(id)}
                title="Delete Message"
              >
                <Trash2 size={15} />
              </button>
              <button
                type="button"
                className="hover-tool-icon-btn"
                onClick={handleMoreButtonClick}
                title="More Actions"
              >
                <MoreHorizontal size={15} />
              </button>
            </div>
          </div>

          {/* Quick Reaction Floating Bar (WhatsApp style on message) */}
          {showQuickReact && (
            <div className="message-quick-reaction-popup" onClick={(e) => e.stopPropagation()}>
              {['👍', '❤️', '🔥', '😂', '🎉', '💡', '🚀', '👏', '🙏', '😍', '✨', '💯'].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="quick-react-item-btn"
                  onClick={() => {
                    onReact(id, emoji);
                    setShowQuickReact(false);
                  }}
                  title={`React ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Quoted Message Card (Matching screenshot style inside Elin's message) */}
          {replyTo && (
            <div className="embedded-quote-preview-box">
              <div className="quote-left-info">
                <div className="quote-author-row">
                  <span className="quote-avatar-mini">{replyTo.user.charAt(0)}</span>
                  <strong>{replyTo.user}</strong>
                </div>
                <p className="quote-snippet-text">{replyTo.text}</p>
              </div>
              <Quote size={16} className="quote-watermark-icon" />
            </div>
          )}

          {/* Inline Edit or Regular Text */}
          {isEditing ? (
            <div className="message-inline-edit-box">
              <textarea
                className="inline-edit-textarea"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleEditKeyDown}
                rows={3}
                autoFocus
              />
              <div className="inline-edit-actions">
                <span className="edit-shortcut-hint">↵ to save • Esc to cancel</span>
                <div className="btn-group-right">
                  <button type="button" className="edit-cancel-btn" onClick={onCancelEdit}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="edit-save-btn"
                    onClick={() => onSaveEdit(id, editText.trim())}
                    disabled={!editText.trim()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="message-body-text-block">
              {renderFormattedText(text)}
            </div>
          )}

          {/* Attachment (Image or File) */}
          {attachment && (
            <div className="message-attachment-card">
              {attachment.type === 'image' ? (
                <img
                  src={attachment.url}
                  alt={attachment.name || "Attachment"}
                  className="attachment-preview-image"
                />
              ) : (
                <div className="attachment-file-pill">
                  <FileText size={18} />
                  <div className="file-pill-meta">
                    <strong>{attachment.name}</strong>
                    <span>{attachment.size || '1.2 MB'}</span>
                  </div>
                  <a href={attachment.url} download className="attachment-download-link">
                    <Download size={15} />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Voice Note Audio Player */}
          {voiceNote && (
            <div className="message-voice-note-card">
              <button
                type="button"
                className="voice-play-pause-btn"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              >
                {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <div className="voice-waveform-animation">
                {[4, 12, 18, 8, 22, 14, 28, 10, 16, 24, 12, 6, 20, 14, 8].map((h, i) => (
                  <span
                    key={i}
                    className={`wave-bar ${isPlayingAudio ? 'animating' : ''}`}
                    style={{ height: `${h}px`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </div>
              <span className="voice-duration-label">{voiceNote.duration || '0:35'}</span>
            </div>
          )}

          {/* Interactive Poll Card */}
          {poll && (
            <div className="message-poll-card">
              <strong className="poll-question-title">{poll.question}</strong>
              <div className="poll-options-list">
                {poll.options.map((opt, optIdx) => {
                  const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0) || 1;
                  const pct = Math.round(((opt.votes || 0) / totalVotes) * 100);
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className="poll-option-vote-btn"
                      onClick={() => onVotePoll && onVotePoll(id, optIdx)}
                    >
                      <div className="poll-bar-fill" style={{ width: `${pct}%` }} />
                      <span className="poll-opt-label">{opt.text}</span>
                      <span className="poll-opt-pct">{pct}% ({opt.votes || 0})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Read Receipt */}
          <div className="bubble-bottom-receipt-row">
            <CheckCheck size={14} className="read-double-check" />
          </div>
        </div>

        {/* Bottom Reaction Pills & Assignment Like Button Row */}
        <div className="message-bottom-controls-row">
          {/* Reaction badges on left (👍 6, 🔥 4, 🚀 3) and Add Reaction Button */}
          <div className="bubble-reaction-chips-strip">
            {reactions && Object.entries(reactions).map(([emoji, count]) => (
              <button
                key={emoji}
                type="button"
                className="reaction-counter-pill"
                onClick={() => onReact(id, emoji)}
                title={`React with ${emoji}`}
              >
                <span className="reaction-emoji-symbol">{emoji}</span>
                <span className="count-num">{count}</span>
              </button>
            ))}
            <button
              type="button"
              className="add-reaction-plus-pill"
              onClick={() => setShowQuickReact(!showQuickReact)}
              title="React with emoji"
            >
              <Smile size={14} />
              <Plus size={10} />
            </button>
          </div>

          {/* Assignment Requirement: Like Button with Counter on Right Side! (Matches screenshot) */}
          <button
            type="button"
            className={`message-like-btn-exactspace ${likes > 0 ? 'has-likes' : ''} ${isLiking ? 'pulse' : ''}`}
            onClick={handleLikeClick}
            aria-label={`Like message by ${user}, count: ${likes}`}
            title="Click to like (count increases on every click)"
          >
            <ThumbsUp size={15} className={`like-icon ${isLiking ? 'bounce' : ''}`} />
            <span>Like</span>
            {likes > 0 && <span className="like-badge-num">{likes}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
