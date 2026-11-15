import React, { useState, useEffect } from 'react';
import { 
  Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Monitor, 
  Users, Maximize2, Minimize2, MessageSquare, Sparkles, X
} from 'lucide-react';
import { WORKPLACE_USERS, CURRENT_USER } from '../constants/users';

export default function VoiceVideoCallModal({
  isOpen,
  onClose,
  callType = 'video', // 'video' | 'audio'
  chatTitle = 'Team Call'
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === 'audio');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setCallDuration(0);
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  };

  // 4 participants in call grid
  const participants = [
    { name: CURRENT_USER.name, role: 'Host (You)', isMuted, isVideoOff, avatar: null },
    { ...WORKPLACE_USERS[0], isMuted: false, isVideoOff: false },
    { ...WORKPLACE_USERS[1], isMuted: true, isVideoOff: false },
    { ...WORKPLACE_USERS[4], isMuted: false, isVideoOff: false }
  ];

  return (
    <div className="call-modal-backdrop" onClick={onClose}>
      <div className="call-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Top Call Bar */}
        <div className="call-modal-top-bar">
          <div className="call-title-group">
            <span className="live-call-pill">● LIVE {callType.toUpperCase()}</span>
            <h3>{chatTitle}</h3>
            <span className="call-timer-badge">{formatDuration(callDuration)}</span>
          </div>
          <button 
            type="button" 
            className="call-window-close-btn"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Grid */}
        <div className="call-video-grid">
          {isScreenSharing ? (
            <div className="screen-share-stage">
              <div className="screen-mock-display">
                <Monitor size={48} className="screen-icon" />
                <h4>You are sharing your screen</h4>
                <p>Exactspace SCADA Telemetry & Pulse APM Dashboard v4.2</p>
              </div>
            </div>
          ) : (
            participants.map((p, idx) => (
              <div key={idx} className="participant-video-card">
                {p.isVideoOff ? (
                  <div className="video-avatar-placeholder">
                    <div className="big-avatar-circle" style={{ backgroundColor: p.color || '#a855f7' }}>
                      {p.name.charAt(0)}
                    </div>
                  </div>
                ) : (
                  <img
                    src={p.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                    alt={p.name}
                    className="participant-video-stream"
                  />
                )}
                <div className="participant-info-overlay">
                  <span className="participant-name">{p.name}</span>
                  {p.isMuted && <span className="muted-indicator"><MicOff size={12} /></span>}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Call Controls Bar */}
        <div className="call-modal-controls-bar">
          <button
            type="button"
            className={`call-ctrl-btn ${isMuted ? 'active-mute' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute microphone" : "Mute microphone"}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            type="button"
            className={`call-ctrl-btn ${isVideoOff ? 'active-mute' : ''}`}
            onClick={() => setIsVideoOff(!isVideoOff)}
            title={isVideoOff ? "Turn on camera" : "Turn off camera"}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>

          <button
            type="button"
            className={`call-ctrl-btn ${isScreenSharing ? 'active-share' : ''}`}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            title={isScreenSharing ? "Stop sharing screen" : "Share screen"}
          >
            <Monitor size={20} />
          </button>

          {/* End Call Button */}
          <button
            type="button"
            className="call-ctrl-btn end-call"
            onClick={onClose}
            title="Leave / End call"
          >
            <PhoneOff size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
