import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

const EMOJI_CATEGORIES = [
  {
    name: 'Frequent',
    emojis: ['👍', '👏', '🙌', '🔥', '🎉', '🚀', '💡', '✅', '😂', '😍', '🤔', '👋']
  },
  {
    name: 'Smileys',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
      '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😋', '😛', '😜',
      '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞',
      '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢'
    ]
  },
  {
    name: 'Gestures',
    emojis: [
      '👍', '👎', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅',
      '🤳', '💪', '🦾', '👈', '👉', '👆', '👇', '☝️', '✌️', '🤞',
      '🤟', '🤘', '🤙', '👌', '🤌', '🤏', '🖐️', '✋', '🖖', '👋'
    ]
  },
  {
    name: 'Industrial & Tech',
    emojis: [
      '🚀', '💡', '⚡', '⚙️', '🛠️', '🔧', '🔨', '📊', '📈', '📉',
      '🏭', '🏢', '🔋', '🔌', '💻', '🖥️', '📱', '📡', '🛡️', '🔒',
      '✅', '❌', '⚠️', '🚨', '🎯', '🧪', '🔬', '🌡️', '📦', '🏷️'
    ]
  },
  {
    name: 'Celebration',
    emojis: [
      '🎉', '🎊', '🎈', '🎂', '🏆', '🥇', '🥈', '🥉', '⭐', '🌟',
      '✨', '💥', '💯', '🔥', '☕', '🍵', '🍕', '🍔', '🍻', '🥂'
    ]
  }
];

export default function EmojiPicker({ onSelectEmoji, onClose }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [search, setSearch] = useState('');

  const filteredEmojis = useMemo(() => {
    if (!search.trim()) return null;
    const all = EMOJI_CATEGORIES.flatMap((c) => c.emojis);
    return Array.from(new Set(all));
  }, [search]);

  return (
    <div className="emoji-picker-container" onClick={(e) => e.stopPropagation()}>
      <div className="emoji-search-box">
        <div className="emoji-search-input-wrap">
          <Search size={16} className="emoji-search-icon" />
          <input
            type="text"
            placeholder="Search emojis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        {onClose && (
          <button type="button" className="emoji-picker-close-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        )}
      </div>

      {!search && (
        <div className="emoji-category-tabs">
          {EMOJI_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.name}
              type="button"
              className={`cat-tab ${idx === activeCategory ? 'active' : ''}`}
              onClick={() => setActiveCategory(idx)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      <div className="emoji-grid-area">
        {search ? (
          <div className="emoji-grid">
            {filteredEmojis.map((emoji, i) => (
              <button
                key={`${emoji}-${i}`}
                type="button"
                className="emoji-item-btn"
                onClick={() => onSelectEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        ) : (
          <div className="emoji-grid">
            {EMOJI_CATEGORIES[activeCategory].emojis.map((emoji, i) => (
              <button
                key={`${emoji}-${i}`}
                type="button"
                className="emoji-item-btn"
                onClick={() => onSelectEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
