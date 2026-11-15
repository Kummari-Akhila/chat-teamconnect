import React, { useState } from 'react';
import { 
  Menu, Search, Phone, Video, Settings, Bell, Image, 
  CheckSquare, PenTool, BarChart2, X, Users, Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ChatHeader({
  activeChat,
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  onOpenSettings,
  onStartCall,
  onOpenWhiteboard,
  onOpenMediaGallery,
  onOpenTasks,
  onOpenNotifications,
  unreadNotificationsCount = 2
}) {
  const [showSearch, setShowSearch] = useState(false);
  const { settings } = useTheme();

  const isChannel = activeChat?.type === 'channel';
  const title = isChannel ? `# ${activeChat.name}` : activeChat?.name || 'Direct Message';
  const subtitle = isChannel ? activeChat.topic || 'Live workspace status' : activeChat?.statusText || 'Active status';

  return (
    <header className="workplace-chat-header">
      <div className="header-left-title-cluster">
        <button 
          type="button" 
          className="mobile-hamburger-btn"
          onClick={onOpenMobileSidebar}
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="channel-live-status-group">
          <h1 className="header-channel-title">{title}</h1>
          <span className="live-status-pill">
            <span className="live-pulse-dot" />
            <span>{subtitle}</span>
          </span>
        </div>
      </div>

      <div className="header-right-action-toolbar">
        {/* Search */}
        {showSearch ? (
          <div className="header-search-capsule">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search in chat..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={() => {
                onSearchChange('');
                setShowSearch(false);
              }}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="hdr-tool-btn"
            title="Search messages"
            onClick={() => setShowSearch(true)}
          >
            <Search size={18} />
          </button>
        )}

        {/* Start Voice / Video Call */}
        <button
          type="button"
          className="hdr-tool-btn"
          onClick={() => onStartCall('video')}
          title="Start Live Video Call"
        >
          <Video size={18} />
        </button>

        <button
          type="button"
          className="hdr-tool-btn"
          onClick={() => onStartCall('audio')}
          title="Start Audio Call"
        >
          <Phone size={17} />
        </button>

        {/* Shared Media Gallery */}
        <button
          type="button"
          className="hdr-tool-btn"
          onClick={onOpenMediaGallery}
          title="Shared Media & Files"
        >
          <Image size={18} />
        </button>

        {/* Interactive Whiteboard */}
        <button
          type="button"
          className="hdr-tool-btn"
          onClick={onOpenWhiteboard}
          title="Shared Drawing Whiteboard"
        >
          <PenTool size={18} />
        </button>

        {/* Notification Center */}
        <button
          type="button"
          className="hdr-tool-btn notification-bell-btn"
          onClick={onOpenNotifications}
          title="Notifications & Mentions"
        >
          <Bell size={18} />
          {unreadNotificationsCount > 0 && (
            <span className="notif-badge-dot" />
          )}
        </button>

        {/* Workspace Settings (Matching gear in screenshot) */}
        <button
          type="button"
          className="hdr-tool-btn settings-gear-btn"
          onClick={onOpenSettings}
          title="Open Workspace Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
