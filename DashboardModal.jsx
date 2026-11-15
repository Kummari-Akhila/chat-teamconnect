import React from 'react';
import { 
  BarChart2, Users, MessageSquare, Paperclip, Video, CheckSquare, 
  TrendingUp, Activity, Calendar, Clock, X, Sparkles
} from 'lucide-react';
import { WORKPLACE_USERS } from '../constants/users';

export default function DashboardModal({
  isOpen,
  onClose,
  totalMessages = 158,
  activeChannelsCount = 7
}) {
  if (!isOpen) return null;

  const onlineCount = WORKPLACE_USERS.filter((u) => u.status === 'online').length;

  return (
    <div className="modal-backdrop-generic" onClick={onClose}>
      <div className="dashboard-dialog-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="dialog-header">
          <div className="dialog-title-row">
            <BarChart2 size={24} className="accent-icon" />
            <div>
              <h3>Workplace Activity Dashboard</h3>
              <p>Real-time analytics, team telemetry & active productivity metrics</p>
            </div>
          </div>
          <button type="button" className="dialog-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 6 Key Stat Cards */}
        <div className="dashboard-stats-grid">
          <div className="dash-stat-card">
            <div className="stat-icon-wrapper purple">
              <MessageSquare size={20} />
            </div>
            <div className="stat-meta">
              <span className="stat-val">{totalMessages}</span>
              <span className="stat-lbl">Total Messages Sent</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon-wrapper green">
              <Users size={20} />
            </div>
            <div className="stat-meta">
              <span className="stat-val">{onlineCount} / {WORKPLACE_USERS.length}</span>
              <span className="stat-lbl">Active Teammates Online</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon-wrapper blue">
              <Paperclip size={20} />
            </div>
            <div className="stat-meta">
              <span className="stat-val">34</span>
              <span className="stat-lbl">Shared Files & Media</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon-wrapper rose">
              <Video size={20} />
            </div>
            <div className="stat-meta">
              <span className="stat-val">12</span>
              <span className="stat-lbl">Meetings Conducted</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon-wrapper amber">
              <CheckSquare size={20} />
            </div>
            <div className="stat-meta">
              <span className="stat-val">18</span>
              <span className="stat-lbl">Tasks Completed</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-icon-wrapper teal">
              <TrendingUp size={20} />
            </div>
            <div className="stat-meta">
              <span className="stat-val">99.8%</span>
              <span className="stat-lbl">OT Ingestion Uptime</span>
            </div>
          </div>
        </div>

        {/* Activity & Calendar Split */}
        <div className="dash-dual-columns">
          {/* Recent Activity Stream */}
          <div className="dash-col-card">
            <div className="dash-card-head">
              <Activity size={18} className="accent-icon" />
              <h4>Recent Workspace Activity</h4>
            </div>
            <div className="dash-activity-timeline">
              <div className="activity-item">
                <span className="activity-dot green" />
                <div>
                  <strong>Emma Johnson</strong> joined channel <em>#ui-ux</em>
                  <span className="activity-time">5 mins ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-dot blue" />
                <div>
                  <strong>Michael Chen</strong> shared file <em>boiler-3-telemetry.pdf</em>
                  <span className="activity-time">18 mins ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-dot purple" />
                <div>
                  <strong>Sophia Martinez</strong> scheduled <em>Frontend Review</em>
                  <span className="activity-time">32 mins ago</span>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-dot amber" />
                <div>
                  <strong>David Wilson</strong> completed task <em>Verify Ed25519 node</em>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Meetings Widget */}
          <div className="dash-col-card">
            <div className="dash-card-head">
              <Calendar size={18} className="accent-icon" />
              <h4>Today's Schedule & Reminders</h4>
            </div>
            <div className="dash-meeting-cards">
              <div className="dash-meeting-pill">
                <div className="meeting-pill-time">03:00 PM</div>
                <div className="meeting-pill-info">
                  <strong>Frontend Review & Polish</strong>
                  <span>Starts in 25 mins • 4 participants</span>
                </div>
              </div>

              <div className="dash-meeting-pill">
                <div className="meeting-pill-time">05:30 PM</div>
                <div className="meeting-pill-info">
                  <strong>SCADA Gateway Handover</strong>
                  <span>Bangalore & Kraków Hubs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
