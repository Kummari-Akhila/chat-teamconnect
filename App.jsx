import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import MessageItem from './components/MessageItem';
import MessageInput from './components/MessageInput';
import MessageActionMenu from './components/MessageActionMenu';
import SettingsPanel from './components/SettingsPanel';
import VoiceVideoCallModal from './components/VoiceVideoCallModal';
import MeetingManagerModal from './components/MeetingManagerModal';
import TaskManagerModal from './components/TaskManagerModal';
import WhiteboardModal from './components/WhiteboardModal';
import DashboardModal from './components/DashboardModal';
import MediaGalleryDrawer from './components/MediaGalleryDrawer';
import ThreadDrawer from './components/ThreadDrawer';
import ForwardModal from './components/ForwardModal';
import NotificationCenter from './components/NotificationCenter';

import { useTheme } from './contexts/ThemeContext';
import {
  USER_LIST,
  INITIAL_CHANNELS,
  INITIAL_DIRECT_MESSAGES,
  CURRENT_USER,
  getCurrentTime
} from './constants/users';
import { generateDynamicResponse } from './utils/aiResponder';
import { soundManager } from './utils/sound';
import './App.css';

const STORAGE_CHANNELS_KEY = 'exactspace_workplace_channels_v6';
const STORAGE_DMS_KEY = 'exactspace_workplace_dms_v6';

export default function App() {
  const { settings } = useTheme();

  // Channels state
  const [channels, setChannels] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHANNELS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_CHANNELS;
  });

  // Direct Messages state
  const [directMessages, setDirectMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DMS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_DIRECT_MESSAGES;
  });

  // Active chat: ID and Type ('channel' | 'dm')
  const [activeChatId, setActiveChatId] = useState('introductions');
  const [activeChatType, setActiveChatType] = useState('channel');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSimulationEnabled, setIsSimulationEnabled] = useState(true);
  const [typingTeammate, setTypingTeammate] = useState(null);

  // Active modals and drawers
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Controls Workspace Settings right panel!
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [callType, setCallType] = useState('video');
  const [isMeetingManagerOpen, setIsMeetingManagerOpen] = useState(false);
  const [isTaskManagerOpen, setIsTaskManagerOpen] = useState(false);
  const [initialTaskTitle, setInitialTaskTitle] = useState('');
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);
  const [isThreadOpen, setIsThreadOpen] = useState(false);
  const [threadParentMessage, setThreadParentMessage] = useState(null);
  const [isForwardOpen, setIsForwardOpen] = useState(false);
  const [forwardMessage, setForwardMessage] = useState(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Message Actions state
  const [replyTarget, setReplyTarget] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [actionMenuState, setActionMenuState] = useState({
    isOpen: false,
    message: null,
    position: { x: 0, y: 0 }
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const messagesEndRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHANNELS_KEY, JSON.stringify(channels));
      localStorage.setItem(STORAGE_DMS_KEY, JSON.stringify(directMessages));
    } catch {}
  }, [channels, directMessages]);

  // Current active chat object
  const activeChat = activeChatType === 'channel'
    ? channels.find((c) => c.id === activeChatId) || channels[0]
    : directMessages.find((d) => d.id === activeChatId) || directMessages[0];

  const messages = activeChat?.messages || [];

  // Scroll to bottom
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  useEffect(() => {
    scrollToBottom(false);
  }, [activeChatId]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages.length, typingTeammate]);

  // Handle switching chat
  const handleSelectChat = (id, type) => {
    setActiveChatId(id);
    setActiveChatType(type);
    setReplyTarget(null);
  };

  // Requirement: "For each message randomly assign a username from the below user list"
  const handleSendMessage = (text, replyToObj = null, attachmentObj = null) => {
    if (!text.trim() && !attachmentObj) return;

    // Pick random username from USER_LIST as specified
    const randomUser = USER_LIST[Math.floor(Math.random() * USER_LIST.length)];
    const timeString = getCurrentTime();

    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      user: randomUser,
      text: text.trim(),
      time: timeString,
      likes: 0,
      reactions: {},
      attachment: attachmentObj || null,
      replyTo: replyToObj ? { id: replyToObj.id, user: replyToObj.user, text: replyToObj.text } : null
    };

    if (settings.soundEnabled) {
      soundManager.playSend();
    }

    addMessageToActiveChat(newMessage);
    setReplyTarget(null);

    // Trigger Dynamic Context-Aware AI response
    if (isSimulationEnabled && text.trim()) {
      const mentionMatch = text.match(/@([a-zA-Z]+)/);
      const mentionedName = mentionMatch ? mentionMatch[1] : null;
      triggerDynamicAIResponse(text.trim(), mentionedName, randomUser);
    }
  };

  const addMessageToActiveChat = (newMsg) => {
    if (activeChatType === 'channel') {
      setChannels((prev) =>
        prev.map((ch) =>
          ch.id === activeChatId
            ? { ...ch, messages: [...(ch.messages || []), newMsg] }
            : ch
        )
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) =>
          dm.id === activeChatId
            ? { ...dm, messages: [...(dm.messages || []), newMsg] }
            : dm
        )
      );
    }
  };

  // Context-aware AI simulation
  const triggerDynamicAIResponse = (userPrompt, mentionedName, senderUser) => {
    const dynamicReply = generateDynamicResponse({
      prompt: userPrompt,
      activeChannel: activeChat,
      mentionedUser: mentionedName,
      previousMessages: messages
    });

    if (!mentionedName && dynamicReply.user === senderUser) {
      const candidates = USER_LIST.filter((u) => u !== senderUser);
      dynamicReply.user = candidates[Math.floor(Math.random() * candidates.length)];
    }

    setTimeout(() => {
      setTypingTeammate(dynamicReply.user);
    }, 450);

    const replyDelay = 1200 + Math.min(dynamicReply.text.length * 15, 1400);

    setTimeout(() => {
      setTypingTeammate(null);

      const replyMessage = {
        id: `reply-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        user: dynamicReply.user,
        text: dynamicReply.text,
        time: getCurrentTime(),
        likes: 0,
        reactions: {}
      };

      if (settings.soundEnabled) {
        soundManager.playReceive();
      }

      addMessageToActiveChat(replyMessage);
    }, replyDelay);
  };

  // Assignment Requirement: Like message and increment counter
  const handleLikeMessage = (messageId) => {
    const updater = (msgs = []) =>
      msgs.map((m) =>
        m.id === messageId ? { ...m, likes: (m.likes || 0) + 1 } : m
      );

    if (activeChatType === 'channel') {
      setChannels((prev) =>
        prev.map((ch) => (ch.id === activeChatId ? { ...ch, messages: updater(ch.messages) } : ch))
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) => (dm.id === activeChatId ? { ...dm, messages: updater(dm.messages) } : dm))
      );
    }
  };

  // Message Actions
  const handleReplyMessage = (msg) => {
    setReplyTarget(msg);
    showToast(`Replying to ${msg.user}`);
  };

  const handleStartEdit = (msg) => {
    setEditingMessageId(msg.id);
  };

  const handleSaveEdit = (msgId, newText) => {
    const updater = (msgs = []) =>
      msgs.map((m) => (m.id === msgId ? { ...m, text: newText, edited: true } : m));

    if (activeChatType === 'channel') {
      setChannels((prev) =>
        prev.map((ch) => (ch.id === activeChatId ? { ...ch, messages: updater(ch.messages) } : ch))
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) => (dm.id === activeChatId ? { ...dm, messages: updater(dm.messages) } : dm))
      );
    }
    setEditingMessageId(null);
    showToast('Message edited');
  };

  const handleDeleteMessage = (msgId) => {
    const updater = (msgs = []) => msgs.filter((m) => m.id !== msgId);

    if (activeChatType === 'channel') {
      setChannels((prev) =>
        prev.map((ch) => (ch.id === activeChatId ? { ...ch, messages: updater(ch.messages) } : ch))
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) => (dm.id === activeChatId ? { ...dm, messages: updater(dm.messages) } : dm))
      );
    }
    showToast('Message deleted');
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(
      () => showToast('Copied to clipboard!'),
      () => showToast('Failed to copy')
    );
  };

  const handleReactMessage = (msgId, emoji) => {
    const updater = (msgs = []) =>
      msgs.map((m) => {
        if (m.id !== msgId) return m;
        const currentCount = m.reactions?.[emoji] || 0;
        return {
          ...m,
          reactions: { ...(m.reactions || {}), [emoji]: currentCount + 1 }
        };
      });

    if (activeChatType === 'channel') {
      setChannels((prev) =>
        prev.map((ch) => (ch.id === activeChatId ? { ...ch, messages: updater(ch.messages) } : ch))
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) => (dm.id === activeChatId ? { ...dm, messages: updater(dm.messages) } : dm))
      );
    }
  };

  const handlePinMessage = (msgId) => {
    const updater = (msgs = []) =>
      msgs.map((m) => (m.id === msgId ? { ...m, isPinned: !m.isPinned } : m));

    if (activeChatType === 'channel') {
      setChannels((prev) =>
        prev.map((ch) => (ch.id === activeChatId ? { ...ch, messages: updater(ch.messages) } : ch))
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) => (dm.id === activeChatId ? { ...dm, messages: updater(dm.messages) } : dm))
      );
    }
    showToast('Message pin toggled');
  };

  const handleStarMessage = (msgId) => {
    const updater = (msgs = []) =>
      msgs.map((m) => (m.id === msgId ? { ...m, isStarred: !m.isStarred } : m));

    if (activeChatType === 'channel') {
      setChannels((prev) =>
        prev.map((ch) => (ch.id === activeChatId ? { ...ch, messages: updater(ch.messages) } : ch))
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) => (dm.id === activeChatId ? { ...dm, messages: updater(dm.messages) } : dm))
      );
    }
    showToast('Message starred');
  };

  const handleConvertToTask = (msg) => {
    setInitialTaskTitle(msg.text);
    setIsTaskManagerOpen(true);
  };

  const handleOpenThread = (msg) => {
    setThreadParentMessage(msg);
    setIsThreadOpen(true);
  };

  const handleStartForward = (msg) => {
    setForwardMessage(msg);
    setIsForwardOpen(true);
  };

  const handleConfirmForward = (target, msg) => {
    const forwardedMsg = {
      id: `fwd-${Date.now()}`,
      user: CURRENT_USER.name,
      text: `[Forwarded from ${msg.user}]\n${msg.text}`,
      time: getCurrentTime(),
      likes: 0
    };

    if (target.type === 'channel') {
      setChannels((prev) =>
        prev.map((ch) =>
          ch.id === target.id ? { ...ch, messages: [...(ch.messages || []), forwardedMsg] } : ch
        )
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) =>
          dm.id === target.id ? { ...dm, messages: [...(dm.messages || []), forwardedMsg] } : dm
        )
      );
    }
    showToast(`Forwarded to ${target.name}`);
  };

  // Poll Vote
  const handleVotePoll = (msgId, optIdx) => {
    const updater = (msgs = []) =>
      msgs.map((m) => {
        if (m.id !== msgId || !m.poll) return m;
        const newOptions = m.poll.options.map((opt, idx) =>
          idx === optIdx ? { ...opt, votes: (opt.votes || 0) + 1 } : opt
        );
        return { ...m, poll: { ...m.poll, options: newOptions } };
      });

    if (activeChatType === 'channel') {
      setChannels((prev) =>
        prev.map((ch) => (ch.id === activeChatId ? { ...ch, messages: updater(ch.messages) } : ch))
      );
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) => (dm.id === activeChatId ? { ...dm, messages: updater(dm.messages) } : dm))
      );
    }
    showToast('Vote submitted!');
  };

  // Send Voice note
  const handleSendVoiceNote = (durationStr) => {
    const voiceMsg = {
      id: `voice-${Date.now()}`,
      user: CURRENT_USER.name,
      text: 'Voice note',
      time: getCurrentTime(),
      likes: 0,
      voiceNote: { duration: durationStr }
    };
    addMessageToActiveChat(voiceMsg);
    showToast('Voice note sent!');
  };

  // Send Poll
  const handleSendPoll = (pollData) => {
    const pollMsg = {
      id: `poll-${Date.now()}`,
      user: CURRENT_USER.name,
      text: `Poll: ${pollData.question}`,
      time: getCurrentTime(),
      likes: 0,
      poll: pollData
    };
    addMessageToActiveChat(pollMsg);
    showToast('Poll created in chat!');
  };

  // Send whiteboard drawing
  const handleSendWhiteboardDrawing = (dataUrl) => {
    const drawingMsg = {
      id: `drawing-${Date.now()}`,
      user: CURRENT_USER.name,
      text: 'Shared whiteboard drawing 🎨',
      time: getCurrentTime(),
      likes: 0,
      attachment: {
        type: 'image',
        name: 'Whiteboard_Diagram.png',
        url: dataUrl
      }
    };
    addMessageToActiveChat(drawingMsg);
    showToast('Whiteboard drawing shared to chat!');
  };

  // Send meeting invitation card
  const handleSendMeetingInvite = (meeting) => {
    const inviteMsg = {
      id: `invite-${Date.now()}`,
      user: CURRENT_USER.name,
      text: `📅 Meeting Invitation: ${meeting.title}\nDate: ${meeting.date} at ${meeting.time}\nAgenda: ${meeting.agenda}`,
      time: getCurrentTime(),
      likes: 0
    };
    addMessageToActiveChat(inviteMsg);
    showToast('Meeting invitation posted!');
  };

  // Add new channel
  const handleAddChannel = (channelObj) => {
    const newId = channelObj.name;
    const newCh = {
      ...channelObj,
      id: newId,
      type: 'channel',
      memberCount: 5,
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          user: 'PubNub Bot',
          text: `Welcome to #${channelObj.displayName}! This channel is ready for workplace discussion.`,
          time: getCurrentTime(),
          likes: 0
        }
      ]
    };
    setChannels((prev) => [...prev, newCh]);
    setActiveChatId(newId);
    setActiveChatType('channel');
    showToast(`Channel #${channelObj.displayName} created!`);
  };

  const handleOpenActionMenu = (msg, pos) => {
    setActionMenuState({
      isOpen: true,
      message: msg,
      position: pos
    });
  };

  // Filter messages by search query
  const displayedMessages = searchQuery.trim()
    ? messages.filter(
        (m) =>
          m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.user.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  // Compute wallpaper class / style
  const wallpaperClass = `wp-${settings.wallpaper || 'abstract-waves'}`;
  const customStyle = settings.wallpaper === 'custom' && settings.customWallpaperUrl
    ? { backgroundImage: `url(${settings.customWallpaperUrl})`, backgroundSize: 'cover' }
    : undefined;

  return (
    <div className="workplace-app-desktop-frame">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="workplace-toast-banner">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Glassmorphism Workplace Container */}
      <div className="workplace-glass-container">
        {/* Left Sidebar (macOS style with window dots, Channels & DMs) */}
        <Sidebar
          channels={channels}
          directMessages={directMessages}
          activeChatId={activeChatId}
          onSelectChat={handleSelectChat}
          onAddChannel={handleAddChannel}
          onAddDM={() => showToast('Select any teammate from Directory')}
          isOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onOpenSettings={() => setIsSettingsOpen(!isSettingsOpen)}
          onOpenDashboard={() => setIsDashboardOpen(true)}
          onOpenMeetings={() => setIsMeetingManagerOpen(true)}
          onOpenTasks={() => setIsTaskManagerOpen(true)}
          onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
        />

        {/* Center Chat Viewport */}
        <div className="workplace-chat-stage">
          {/* Header */}
          <ChatHeader
            activeChat={activeChat}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenSettings={() => setIsSettingsOpen(!isSettingsOpen)}
            onStartCall={(type) => {
              setCallType(type);
              setIsCallOpen(true);
            }}
            onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
            onOpenMediaGallery={() => setIsMediaGalleryOpen(true)}
            onOpenTasks={() => setIsTaskManagerOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
          />

          {/* Message Thread with Customizable Wallpaper */}
          <main 
            className={`workplace-message-stream-viewport ${wallpaperClass}`}
            style={customStyle}
          >
            <div className="message-stream-centering-box">
              {displayedMessages.length === 0 ? (
                <div className="empty-chat-welcome-state">
                  <div className="empty-bubble-icon">💬</div>
                  <h3>No messages in this view</h3>
                  <p>Send a message below or mention a teammate to begin!</p>
                </div>
              ) : (
                <div className="messages-flow-list">
                  {displayedMessages.map((msg) => (
                    <MessageItem
                      key={msg.id}
                      message={msg}
                      onLike={handleLikeMessage}
                      onReply={handleReplyMessage}
                      onEdit={handleStartEdit}
                      onDelete={handleDeleteMessage}
                      onCopy={handleCopyText}
                      onReact={handleReactMessage}
                      onForward={handleStartForward}
                      onPin={handlePinMessage}
                      onStar={handleStarMessage}
                      onConvertToTask={handleConvertToTask}
                      onOpenThread={handleOpenThread}
                      onOpenActionMenu={handleOpenActionMenu}
                      isEditing={editingMessageId === msg.id}
                      onSaveEdit={handleSaveEdit}
                      onCancelEdit={() => setEditingMessageId(null)}
                      onVotePoll={handleVotePoll}
                    />
                  ))}

                  {/* Typing Indicator */}
                  {typingTeammate && (
                    <div className="live-typing-status-pill">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span><strong>{typingTeammate}</strong> is typing...</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </main>

          {/* Input Capsule Area matching screenshot */}
          <MessageInput
            onSendMessage={handleSendMessage}
            replyTarget={replyTarget}
            onCancelReply={() => setReplyTarget(null)}
            onSendVoiceNote={handleSendVoiceNote}
            onSendPoll={handleSendPoll}
          />
        </div>

        {/* Right-Hand Panel: Workspace Settings (Matching screenshot!) */}
        {isSettingsOpen && (
          <SettingsPanel
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        )}

        {/* Right-Hand Panel: Thread Drawer */}
        {isThreadOpen && (
          <ThreadDrawer
            isOpen={isThreadOpen}
            onClose={() => setIsThreadOpen(false)}
            parentMessage={threadParentMessage}
            onSendThreadReply={() => showToast('Thread reply saved')}
          />
        )}

        {/* Right-Hand Panel: Media Gallery Drawer */}
        {isMediaGalleryOpen && (
          <MediaGalleryDrawer
            isOpen={isMediaGalleryOpen}
            onClose={() => setIsMediaGalleryOpen(false)}
          />
        )}
      </div>

      {/* Floating Action Menu Popover (WhatsApp Style on right-click or 3-dots) */}
      {actionMenuState.isOpen && actionMenuState.message && (
        <MessageActionMenu
          message={actionMenuState.message}
          position={actionMenuState.position}
          onReply={handleReplyMessage}
          onEdit={handleStartEdit}
          onDelete={handleDeleteMessage}
          onCopy={handleCopyText}
          onReact={handleReactMessage}
          onForward={handleStartForward}
          onPin={handlePinMessage}
          onStar={handleStarMessage}
          onConvertToTask={handleConvertToTask}
          onOpenThread={handleOpenThread}
          onClose={() => setActionMenuState({ isOpen: false, message: null, position: { x: 0, y: 0 } })}
        />
      )}

      {/* Modals */}
      <VoiceVideoCallModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        callType={callType}
        chatTitle={activeChat?.displayName || activeChat?.name || 'Workplace Call'}
      />

      <MeetingManagerModal
        isOpen={isMeetingManagerOpen}
        onClose={() => setIsMeetingManagerOpen(false)}
        onStartInstantMeeting={(title) => {
          setCallType('video');
          setIsCallOpen(true);
        }}
        onSendMeetingInviteToChat={handleSendMeetingInvite}
      />

      <TaskManagerModal
        isOpen={isTaskManagerOpen}
        onClose={() => {
          setIsTaskManagerOpen(false);
          setInitialTaskTitle('');
        }}
        initialTaskTitle={initialTaskTitle}
        onTaskCreated={() => showToast('Task created successfully!')}
      />

      <WhiteboardModal
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
        onSendDrawingToChat={handleSendWhiteboardDrawing}
      />

      <DashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        totalMessages={messages.length + 150}
        activeChannelsCount={channels.length}
      />

      <ForwardModal
        isOpen={isForwardOpen}
        onClose={() => setIsForwardOpen(false)}
        message={forwardMessage}
        channels={channels}
        onConfirmForward={handleConfirmForward}
      />

      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
