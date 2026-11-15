import React, { useState } from 'react';
import { 
  X, Moon, Sun, Image, Bell, Type, Shield, User, Volume2, VolumeX, 
  Check, Palette, Sparkles, Smartphone, Upload, Video, Mic, HardDrive, 
  Trash2, Sliders, CheckSquare, Layers
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { CURRENT_USER } from '../constants/users';

export const THEME_OPTIONS = [
  {
    id: 'dark-glass',
    name: 'Dark Glassmorphism',
    subtitle: 'Translucent glass & violet aura',
    previewGradient: 'linear-gradient(135deg, rgba(30, 20, 50, 0.8) 0%, rgba(15, 10, 25, 0.95) 100%)',
    badge: 'Popular'
  },
  {
    id: 'premium-dark',
    name: 'Premium Dark',
    subtitle: 'Obsidian charcoal & crisp lines',
    previewGradient: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)',
    badge: 'Classic'
  },
  {
    id: 'teams-style',
    name: 'Teams Style',
    subtitle: 'Corporate slate & indigo tones',
    previewGradient: 'linear-gradient(135deg, #1f2430 0%, #151821 100%)',
    badge: 'Enterprise'
  },
  {
    id: 'emerald-pro',
    name: 'Emerald Pro',
    subtitle: 'Industrial deep teal & emerald',
    previewGradient: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
    badge: 'Industrial'
  },
  {
    id: 'workspace-gradient',
    name: 'Workspace Gradient',
    subtitle: 'Vibrant purple & magenta sheen',
    previewGradient: 'linear-gradient(135deg, #7c3aed 0%, #c026d3 50%, #4c1d95 100%)',
    badge: 'Vibrant'
  },
  {
    id: 'light',
    name: 'Light Studio',
    subtitle: 'Clean daylight aesthetic',
    previewGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    badge: 'Daylight'
  }
];

export const WALLPAPER_OPTIONS = [
  {
    id: 'abstract-waves',
    name: 'Abstract Waves',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    type: 'image'
  },
  {
    id: 'mesh-gradient',
    name: 'Mesh Gradient',
    preview: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&auto=format&fit=crop&q=80',
    type: 'image'
  },
  {
    id: 'mountains',
    name: 'Mountains',
    preview: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
    type: 'image'
  },
  {
    id: 'forest',
    name: 'Forest',
    preview: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&auto=format&fit=crop&q=80',
    type: 'image'
  },
  {
    id: 'aurora-lights',
    name: 'Aurora Lights',
    preview: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&auto=format&fit=crop&q=80',
    type: 'image'
  },
  {
    id: 'galaxy',
    name: 'Galaxy Theme',
    preview: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop&q=80',
    type: 'image'
  },
  {
    id: 'geometric-grid',
    name: 'Geometric Grid',
    preview: 'linear-gradient(#2d1e4e 1px, transparent 1px), linear-gradient(90deg, #2d1e4e 1px, transparent 1px)',
    type: 'gradient'
  }
];

export const ACCENT_COLORS = [
  { id: 'violet', name: 'Violet Pulse', hex: '#a855f7' },
  { id: 'emerald', name: 'Emerald', hex: '#10b981' },
  { id: 'blue', name: 'Teams Blue', hex: '#3b82f6' },
  { id: 'rose', name: 'Rose', hex: '#f43f5e' },
  { id: 'amber', name: 'Amber Gold', hex: '#f59e0b' }
];

export default function SettingsPanel({ isOpen, onClose }) {
  const { 
    settings, 
    updateSetting, 
    setColorMode, 
    setWorkspaceTheme, 
    setWallpaper 
  } = useTheme();

  const [activeTab, setActiveTab] = useState('appearance');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);

  if (!isOpen) return null;

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target.result;
        setWallpaper('custom', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomUrlSubmit = (e) => {
    e.preventDefault();
    if (customUrlInput.trim()) {
      setWallpaper('custom', customUrlInput.trim());
      setShowCustomModal(false);
      setCustomUrlInput('');
    }
  };

  return (
    <aside className="workspace-settings-sidebar-panel">
      {/* Top Header matching reference */}
      <div className="workspace-settings-header">
        <h3 className="workspace-settings-title">Workspace Settings</h3>
        <button 
          type="button" 
          className="settings-close-icon-btn"
          onClick={onClose}
          aria-label="Close settings"
        >
          <X size={20} />
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="settings-compact-nav">
        <button 
          type="button" 
          className={`compact-tab ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          Theme
        </button>
        <button 
          type="button" 
          className={`compact-tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Alerts
        </button>
        <button 
          type="button" 
          className={`compact-tab ${activeTab === 'meeting' ? 'active' : ''}`}
          onClick={() => setActiveTab('meeting')}
        >
          Meetings
        </button>
        <button 
          type="button" 
          className={`compact-tab ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Profile
        </button>
      </div>

      <div className="workspace-settings-body">
        {activeTab === 'appearance' && (
          <div className="settings-group-stack">
            {/* Color Mode Switcher (Dark / Light) */}
            <div className="settings-field-block">
              <label className="field-label">Color Mode</label>
              <div className="mode-toggle-pill-group">
                <button
                  type="button"
                  className={`mode-btn ${settings.colorMode === 'dark' ? 'active' : ''}`}
                  onClick={() => setColorMode('dark')}
                >
                  <Moon size={15} />
                  <span>Dark</span>
                </button>
                <button
                  type="button"
                  className={`mode-btn ${settings.colorMode === 'light' ? 'active' : ''}`}
                  onClick={() => setColorMode('light')}
                >
                  <Sun size={15} />
                  <span>Light</span>
                </button>
              </div>
            </div>

            {/* Workspace Theme (Cards matching screenshot) */}
            <div className="settings-field-block">
              <label className="field-label">Workspace Theme</label>
              <div className="workspace-themes-grid">
                {THEME_OPTIONS.map((theme) => {
                  const isSelected = settings.workspaceTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      className={`theme-card-preview ${isSelected ? 'selected' : ''}`}
                      onClick={() => setWorkspaceTheme(theme.id)}
                    >
                      <div 
                        className="theme-card-thumb"
                        style={{ background: theme.previewGradient }}
                      >
                        {isSelected && (
                          <div className="theme-selected-check-badge">
                            <Check size={14} />
                          </div>
                        )}
                        <div className="theme-thumb-mock-sidebar" />
                        <div className="theme-thumb-mock-content">
                          <span className="mock-bar bar-1" />
                          <span className="mock-bar bar-2" />
                        </div>
                      </div>
                      <div className="theme-card-info">
                        <span className="theme-card-name">{theme.name}</span>
                        <span className="theme-card-sub">{theme.subtitle}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent Color Selection */}
            <div className="settings-field-block">
              <label className="field-label">Accent Color</label>
              <div className="accent-color-pills-row">
                {ACCENT_COLORS.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    className={`accent-circle-btn ${settings.accentColor === acc.id ? 'active' : ''}`}
                    style={{ backgroundColor: acc.hex }}
                    onClick={() => updateSetting('accentColor', acc.id)}
                    title={acc.name}
                  >
                    {settings.accentColor === acc.id && <Check size={14} color="#fff" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Background Wallpaper (Thumbnails matching screenshot) */}
            <div className="settings-field-block">
              <div className="field-label-with-action">
                <label className="field-label">Chat Background Wallpaper</label>
                <button
                  type="button"
                  className="upload-wallpaper-btn"
                  onClick={() => setShowCustomModal(true)}
                  title="Upload or paste custom wallpaper URL"
                >
                  <Upload size={13} />
                  <span>Custom</span>
                </button>
              </div>

              <div className="wallpaper-thumbnails-grid">
                {WALLPAPER_OPTIONS.map((wp) => {
                  const isSelected = settings.wallpaper === wp.id;
                  return (
                    <button
                      key={wp.id}
                      type="button"
                      className={`wallpaper-thumb-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setWallpaper(wp.id)}
                    >
                      <div 
                        className="wallpaper-thumb-img"
                        style={{
                          backgroundImage: wp.type === 'image' ? `url(${wp.preview})` : undefined,
                          background: wp.type === 'gradient' ? wp.preview : undefined
                        }}
                      >
                        {isSelected && (
                          <div className="wallpaper-check-circle">
                            <Check size={13} />
                          </div>
                        )}
                      </div>
                      <span className="wallpaper-thumb-label">{wp.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Size & Bubble Style Controls */}
            <div className="settings-field-block">
              <label className="field-label">Font Size</label>
              <div className="font-size-button-row">
                {[
                  { id: 'small', label: '14px' },
                  { id: 'medium', label: '16px' },
                  { id: 'large', label: '18px (Rec)' },
                  { id: 'xlarge', label: '20px' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className={`size-btn ${settings.fontSize === f.id ? 'active' : ''}`}
                    onClick={() => updateSetting('fontSize', f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="settings-field-block">
              <label className="field-label">Layout Density</label>
              <div className="mode-toggle-pill-group">
                <button
                  type="button"
                  className={`mode-btn ${settings.layoutMode === 'comfortable' ? 'active' : ''}`}
                  onClick={() => updateSetting('layoutMode', 'comfortable')}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  className={`mode-btn ${settings.layoutMode === 'compact' ? 'active' : ''}`}
                  onClick={() => updateSetting('layoutMode', 'compact')}
                >
                  Compact
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="settings-group-stack">
            <div className="toggle-setting-row">
              <div className="toggle-setting-meta">
                <strong>Audio Feedback Synthesizer</strong>
                <span>Sound effects on message send, receive and like clicks</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${settings.soundEnabled ? 'on' : 'off'}`}
                onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
              >
                <span className="switch-dot" />
              </button>
            </div>

            <div className="toggle-setting-row">
              <div className="toggle-setting-meta">
                <strong>Desktop Notifications</strong>
                <span>Show banner popups when teammate replies</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${settings.notifications ? 'on' : 'off'}`}
                onClick={() => updateSetting('notifications', !settings.notifications)}
              >
                <span className="switch-dot" />
              </button>
            </div>

            <div className="toggle-setting-row">
              <div className="toggle-setting-meta">
                <strong>Meeting Reminders</strong>
                <span>Alert 10 minutes prior to scheduled syncs</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${settings.meetingReminders ? 'on' : 'off'}`}
                onClick={() => updateSetting('meetingReminders', !settings.meetingReminders)}
              >
                <span className="switch-dot" />
              </button>
            </div>

            <div className="toggle-setting-row">
              <div className="toggle-setting-meta">
                <strong>Mention Alerts (@name)</strong>
                <span>Badge notification when specifically tagged</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${settings.mentionAlerts ? 'on' : 'off'}`}
                onClick={() => updateSetting('mentionAlerts', !settings.mentionAlerts)}
              >
                <span className="switch-dot" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'meeting' && (
          <div className="settings-group-stack">
            <div className="toggle-setting-row">
              <div className="toggle-setting-meta">
                <strong>Auto-mute Microphone on Join</strong>
                <span>Mute mic when entering calls</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${settings.autoMuteMic ? 'on' : 'off'}`}
                onClick={() => updateSetting('autoMuteMic', !settings.autoMuteMic)}
              >
                <span className="switch-dot" />
              </button>
            </div>

            <div className="toggle-setting-row">
              <div className="toggle-setting-meta">
                <strong>Turn Off Camera by Default</strong>
                <span>Join video meetings with camera paused</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${settings.autoTurnOffCamera ? 'on' : 'off'}`}
                onClick={() => updateSetting('autoTurnOffCamera', !settings.autoTurnOffCamera)}
              >
                <span className="switch-dot" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="settings-group-stack">
            <div className="user-profile-account-card">
              <div className="account-avatar-circle">RR</div>
              <div className="account-details">
                <h4>{CURRENT_USER.name}</h4>
                <span className="account-role-tag">{CURRENT_USER.role}</span>
                <span className="account-dept">{CURRENT_USER.department}</span>
                <span className="account-status-online">● Active in node</span>
              </div>
            </div>

            <div className="toggle-setting-row">
              <div className="toggle-setting-meta">
                <strong>Read Receipts (✓✓)</strong>
                <span>Allow teammates to see when you've read messages</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${settings.readReceipts ? 'on' : 'off'}`}
                onClick={() => updateSetting('readReceipts', !settings.readReceipts)}
              >
                <span className="switch-dot" />
              </button>
            </div>

            <div className="toggle-setting-row">
              <div className="toggle-setting-meta">
                <strong>Share Online Presence</strong>
                <span>Display green indicator next to your avatar</span>
              </div>
              <button
                type="button"
                className={`switch-toggle ${settings.onlineStatus ? 'on' : 'off'}`}
                onClick={() => updateSetting('onlineStatus', !settings.onlineStatus)}
              >
                <span className="switch-dot" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Wallpaper Upload / URL Modal */}
      {showCustomModal && (
        <div className="settings-inner-modal-overlay" onClick={() => setShowCustomModal(false)}>
          <div className="settings-inner-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h4>Custom Chat Wallpaper</h4>
              <button type="button" onClick={() => setShowCustomModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="custom-upload-section">
              <label className="upload-file-label">
                <Upload size={20} />
                <span>Upload image from your computer</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleCustomUpload} 
                  style={{ display: 'none' }} 
                />
              </label>

              <div className="or-divider"><span>OR</span></div>

              <form onSubmit={handleCustomUrlSubmit}>
                <input
                  type="url"
                  placeholder="Paste direct image URL (https://...)"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className="custom-url-input"
                />
                <button type="submit" className="apply-custom-btn" disabled={!customUrlInput.trim()}>
                  Apply URL
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
