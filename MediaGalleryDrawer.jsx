import React, { useState } from 'react';
import { 
  X, Image, Video, FileText, Link2, Mic, Star, Download, ExternalLink
} from 'lucide-react';

const MOCK_MEDIA = {
  photos: [
    { id: 1, title: 'Pulse Historian Dashboard v4.2', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80', time: 'Today 10:15 AM' },
    { id: 2, title: 'Plant Machinery Thermal Baseline', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80', time: 'Yesterday' },
    { id: 3, title: 'Boiler 3 Sensor Gateway', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop&q=80', time: 'Nov 14' }
  ],
  documents: [
    { id: 1, title: 'Pulse_Air_Gap_Ed25519_Spec.pdf', size: '2.4 MB', type: 'PDF', time: 'Today 09:30 AM' },
    { id: 2, title: 'Boiler_3_Efficiency_Metrics.xlsx', size: '1.1 MB', type: 'Excel', time: 'Nov 14' },
    { id: 3, title: 'Exactspace_UI_Design_Tokens.docx', size: '850 KB', type: 'DOCX', time: 'Nov 13' }
  ],
  links: [
    { id: 1, title: 'Exactspace Official Plant Intelligence', url: 'https://exactspace.co', time: 'Today' },
    { id: 2, title: 'Pulse Copilot AI Documentation', url: 'https://exactspace.co/products/pulse-copilot', time: 'Nov 12' }
  ],
  voiceNotes: [
    { id: 1, title: 'Shift Handover Voice Note #04', duration: '0:42', user: 'Dean', time: 'Today 08:30 AM' },
    { id: 2, title: 'Feedback on Secondary Feedwater Valve', duration: '1:15', user: 'Michael Chen', time: 'Yesterday' }
  ]
};

export default function MediaGalleryDrawer({
  isOpen,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('photos');

  if (!isOpen) return null;

  return (
    <aside className="media-gallery-drawer-panel">
      <div className="media-drawer-head">
        <div className="drawer-title-group">
          <Image size={20} className="accent-icon" />
          <h3>Shared Media & Files</h3>
        </div>
        <button type="button" className="settings-close-icon-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="media-tabs-row">
        <button
          type="button"
          className={`media-tab ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos
        </button>
        <button
          type="button"
          className={`media-tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          Docs
        </button>
        <button
          type="button"
          className={`media-tab ${activeTab === 'links' ? 'active' : ''}`}
          onClick={() => setActiveTab('links')}
        >
          Links
        </button>
        <button
          type="button"
          className={`media-tab ${activeTab === 'voice' ? 'active' : ''}`}
          onClick={() => setActiveTab('voice')}
        >
          Voice Notes
        </button>
      </div>

      {/* Content */}
      <div className="media-drawer-content">
        {activeTab === 'photos' && (
          <div className="media-photos-grid">
            {MOCK_MEDIA.photos.map((p) => (
              <div key={p.id} className="media-photo-thumb-card">
                <img src={p.url} alt={p.title} />
                <div className="photo-thumb-meta">
                  <span>{p.title}</span>
                  <a href={p.url} target="_blank" rel="noreferrer" title="Open full size">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="media-docs-list">
            {MOCK_MEDIA.documents.map((d) => (
              <div key={d.id} className="media-doc-item">
                <div className="doc-icon-badge">
                  <FileText size={18} />
                </div>
                <div className="doc-meta-info">
                  <strong>{d.title}</strong>
                  <span>{d.size} • {d.time}</span>
                </div>
                <button type="button" className="doc-download-btn" title="Download Document">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'links' && (
          <div className="media-links-list">
            {MOCK_MEDIA.links.map((l) => (
              <a key={l.id} href={l.url} target="_blank" rel="noreferrer" className="media-link-item">
                <Link2 size={16} className="link-icon" />
                <div className="link-meta">
                  <strong>{l.title}</strong>
                  <span>{l.url}</span>
                </div>
                <ExternalLink size={14} className="ext-icon" />
              </a>
            ))}
          </div>
        )}

        {activeTab === 'voice' && (
          <div className="media-voice-list">
            {MOCK_MEDIA.voiceNotes.map((v) => (
              <div key={v.id} className="media-voice-item">
                <div className="voice-mic-badge">
                  <Mic size={16} />
                </div>
                <div className="voice-meta">
                  <strong>{v.title}</strong>
                  <span>{v.user} • {v.duration} duration</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
