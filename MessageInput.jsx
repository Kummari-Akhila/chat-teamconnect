import React, { useState, useRef, useEffect } from 'react';
import {
  Smile, Send, Paperclip, Mic, MicOff, BarChart2, X, CornerUpLeft,
  Image, FileText, Check
} from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import { USER_LIST, WORKPLACE_USERS } from '../constants/users';
import { useTheme } from '../contexts/ThemeContext';

export default function MessageInput({
  onSendMessage,
  onTyping,
  replyTarget,
  onCancelReply,
  onSendVoiceNote,
  onSendPoll
}) {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Attachment upload state
  const [pendingAttachment, setPendingAttachment] = useState(null);

  // Poll state
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['10 AM', '2 PM', '4 PM']);

  // @Mentions popup state (matching screenshot `@Alan` with avatar dropdown)
  const [mentionQuery, setMentionQuery] = useState(null);
  const [mentionStartIndex, setMentionStartIndex] = useState(-1);
  const [selectedMentionIdx, setSelectedMentionIdx] = useState(0);

  const { settings } = useTheme();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Voice recording timer
  useEffect(() => {
    let timer;
    if (isRecordingVoice) {
      setRecordingSeconds(0);
      timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecordingVoice]);

  useEffect(() => {
    if (replyTarget && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyTarget]);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter mention teammates
  const matchingTeammates = mentionQuery !== null
    ? WORKPLACE_USERS.filter((u) =>
      u.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
      u.shortName.toLowerCase().includes(mentionQuery.toLowerCase())
    )
    : [];

  const handleTextChange = (e) => {
    const val = e.target.value;
    const cursorPos = e.target.selectionStart;
    setInputText(val);

    if (onTyping) onTyping();

    // Check for @mention trigger
    const textBeforeCursor = val.slice(0, cursorPos);
    const match = textBeforeCursor.match(/(?:^|\s)@([a-zA-Z0-9_-]*)$/);

    if (match) {
      const atPos = textBeforeCursor.lastIndexOf('@');
      setMentionQuery(match[1]);
      setMentionStartIndex(atPos);
      setSelectedMentionIdx(0);
    } else {
      setMentionQuery(null);
      setMentionStartIndex(-1);
    }
  };

  const insertMention = (username) => {
    if (mentionStartIndex === -1) return;

    const cursorPos = inputRef.current?.selectionStart ?? inputText.length;
    const before = inputText.slice(0, mentionStartIndex);
    const after = inputText.slice(cursorPos);
    const updated = `${before}@${username} ${after}`;

    setInputText(updated);
    setMentionQuery(null);
    setMentionStartIndex(-1);

    setTimeout(() => {
      if (inputRef.current) {
        const newPos = before.length + username.length + 2;
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newPos, newPos);
      }
    }, 10);
  };

  const handleSelectEmoji = (emoji) => {
    const input = inputRef.current;
    if (input) {
      const start = input.selectionStart || inputText.length;
      const end = input.selectionEnd || inputText.length;
      const nextText = inputText.substring(0, start) + emoji + inputText.substring(end);
      setInputText(nextText);
      setTimeout(() => {
        input.focus();
        const pos = start + emoji.length;
        input.setSelectionRange(pos, pos);
      }, 0);
    } else {
      setInputText((prev) => prev + emoji);
    }
  };

  const handleKeyDown = (e) => {
    // If mention dropdown is open
    if (mentionQuery !== null && matchingTeammates.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIdx((prev) => (prev + 1) % matchingTeammates.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIdx((prev) => (prev - 1 + matchingTeammates.length) % matchingTeammates.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        insertMention(matchingTeammates[selectedMentionIdx].shortName);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setMentionQuery(null);
        return;
      }
    }

    if (settings.enterToSend && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImg = file.type.startsWith('image/');
      const reader = new FileReader();
      reader.onload = (event) => {
        setPendingAttachment({
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          type: isImg ? 'image' : 'file',
          url: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStopAndSendVoice = () => {
    setIsRecordingVoice(false);
    const durationStr = `0:${String(recordingSeconds).padStart(2, '0')}`;
    if (onSendVoiceNote) {
      onSendVoiceNote(durationStr);
    }
  };

  const handleCancelVoice = () => {
    setIsRecordingVoice(false);
    setRecordingSeconds(0);
  };

  const handleSubmitPoll = (e) => {
    e.preventDefault();
    if (!pollQuestion.trim()) return;
    const validOpts = pollOptions.filter((o) => o.trim()).map((t) => ({ text: t.trim(), votes: 0 }));
    if (onSendPoll) {
      onSendPoll({
        question: pollQuestion.trim(),
        options: validOpts
      });
    }
    setPollQuestion('');
    setShowPollCreator(false);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed && !pendingAttachment) return;

    onSendMessage(trimmed, replyTarget, pendingAttachment);
    setInputText('');
    setPendingAttachment(null);
    setMentionQuery(null);
    setShowEmojiPicker(false);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <footer className="workplace-composer-container" ref={containerRef}>
      {/* Mention Dropdown Popup (Matching screenshot style `@Alan` with avatar dropdown) */}
      {mentionQuery !== null && matchingTeammates.length > 0 && (
        <div className="composer-mention-floating-popup">
          <div className="popup-mention-head">Teammates</div>
          <div className="popup-mention-items">
            {matchingTeammates.slice(0, 5).map((teammate, idx) => {
              const isSelected = idx === selectedMentionIdx;
              return (
                <button
                  key={teammate.id}
                  type="button"
                  className={`mention-pop-item ${isSelected ? 'highlighted' : ''}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    insertMention(teammate.shortName);
                  }}
                >
                  <img src={teammate.avatar} alt={teammate.name} className="mini-pop-avatar" />
                  <span className="pop-name">{teammate.name}</span>
                  <span className="pop-role">{teammate.role}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Emoji Picker Popover */}
      {showEmojiPicker && (
        <div className="emoji-popover-wrapper">
          <EmojiPicker
            onSelectEmoji={handleSelectEmoji}
            onClose={() => setShowEmojiPicker(false)}
          />
        </div>
      )}

      {/* Poll Creator Modal */}
      {showPollCreator && (
        <div className="inline-poll-creator-card">
          <div className="poll-creator-head">
            <strong>Create Workspace Poll</strong>
            <button type="button" onClick={() => setShowPollCreator(false)}>
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleSubmitPoll}>
            <input
              type="text"
              placeholder="Ask a question (e.g. Best Meeting Time?)"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              className="poll-question-input"
              autoFocus
            />
            <div className="poll-opts-inputs">
              {pollOptions.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const next = [...pollOptions];
                    next[i] = e.target.value;
                    setPollOptions(next);
                  }}
                  className="poll-opt-input"
                />
              ))}
            </div>
            <div className="poll-actions-row">
              <button
                type="button"
                className="btn-add-opt"
                onClick={() => setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`])}
              >
                + Add Option
              </button>
              <button type="submit" className="btn-primary" disabled={!pollQuestion.trim()}>
                Post Poll
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Quoted Reply Banner */}
      {replyTarget && (
        <div className="composer-reply-preview-banner">
          <CornerUpLeft size={14} className="accent-reply-icon" />
          <div className="reply-preview-content">
            <span className="replying-to-label">Replying to <strong>{replyTarget.user}</strong></span>
            <p className="replying-text-snippet">{replyTarget.text}</p>
          </div>
          <button type="button" className="close-reply-preview-btn" onClick={onCancelReply}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Pending attachment preview */}
      {pendingAttachment && (
        <div className="pending-attachment-chip">
          {pendingAttachment.type === 'image' ? (
            <img src={pendingAttachment.url} alt="Upload preview" className="pending-thumb" />
          ) : (
            <FileText size={18} />
          )}
          <span>{pendingAttachment.name}</span>
          <button type="button" onClick={() => setPendingAttachment(null)}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Composer Capsule matching screenshot */}
      <div className="workplace-composer-capsule">
        {/* Quick Emojis Strip - Always visible before sending */}
        <div className="composer-quick-emoji-strip">
          <div className="quick-emojis-scroll-row">
            {['👍', '❤️', '🔥', '😂', '🎉', '💡', '🚀', '👏', '🙏', '😍', '✨', '💯', '😎', '✅', '🤔'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="quick-strip-emoji-btn"
                onClick={() => handleSelectEmoji(emoji)}
                title={`Insert ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`quick-strip-more-btn ${showEmojiPicker ? 'active' : ''}`}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Open Full Emoji Picker"
          >
            <Smile size={15} />
            <span>Emojis</span>
          </button>
        </div>

        {isRecordingVoice ? (
          /* Live Voice Recording UI */
          <div className="voice-recording-capsule-active">
            <div className="rec-indicator-pulse" />
            <span className="recording-label">Recording Voice Note... 0:{String(recordingSeconds).padStart(2, '0')}</span>
            <button type="button" className="cancel-rec-btn" onClick={handleCancelVoice}>
              <X size={16} /> Cancel
            </button>
            <button type="button" className="send-voice-btn" onClick={handleStopAndSendVoice}>
              <Send size={16} /> Send Note
            </button>
          </div>
        ) : (
          <form className="capsule-inner-form" onSubmit={handleSubmit}>
            {/* Left Smiley Emoji Button matching screenshot */}
            <button
              type="button"
              className={`capsule-smile-btn ${showEmojiPicker ? 'active' : ''}`}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Add emoji"
            >
              <Smile size={22} />
            </button>

            {/* Paperclip File Upload */}
            <button
              type="button"
              className="capsule-attach-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Attach File or Image"
            >
              <Paperclip size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            {/* Microphone Voice Note Button */}
            <button
              type="button"
              className="capsule-mic-btn"
              onClick={() => setIsRecordingVoice(true)}
              title="Record voice note"
            >
              <Mic size={18} />
            </button>

            {/* Poll Creator Button */}
            <button
              type="button"
              className="capsule-poll-btn"
              onClick={() => setShowPollCreator(!showPollCreator)}
              title="Create Poll"
            >
              <BarChart2 size={18} />
            </button>

            {/* Text Input with placeholder "Typing..." matching screenshot */}
            <input
              ref={inputRef}
              type="text"
              className="capsule-text-input"
              placeholder="Typing..."
              value={inputText}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />

            {/* Quick @ mention button */}
            <button
              type="button"
              className="capsule-at-btn"
              onClick={() => {
                setInputText((prev) => prev + '@');
                setMentionQuery('');
                setMentionStartIndex(inputText.length);
                inputRef.current?.focus();
              }}
              title="Mention teammate (@)"
            >
              @
            </button>

            {/* Right Purple Send Button matching screenshot */}
            <button
              type="submit"
              className="capsule-purple-send-btn"
              disabled={!inputText.trim() && !pendingAttachment}
              title="Send message (Enter)"
            >
              <Send size={18} />
            </button>
          </form>
        )}
      </div>
    </footer>
  );
}
