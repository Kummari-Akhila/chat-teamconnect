import React from 'react';
import { USER_COLORS, getInitials } from '../constants/users';

export default function MentionDropdown({
  users,
  selectedIndex,
  onSelectUser,
  position
}) {
  if (!users || users.length === 0) return null;

  return (
    <div 
      className="mention-dropdown-menu"
      style={position ? { left: `${position.left}px`, bottom: `${position.bottom}px` } : undefined}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mention-dropdown-header">
        <span>Team Members ({users.length})</span>
        <span className="mention-hint">↑↓ to navigate, ↵ to select</span>
      </div>
      <ul className="mention-items-list" role="listbox">
        {users.map((user, idx) => {
          const isSelected = idx === selectedIndex;
          const userColor = USER_COLORS[user] || '#64748b';

          return (
            <li
              key={user}
              role="option"
              aria-selected={isSelected}
              className={`mention-item-row ${isSelected ? 'highlighted' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent losing input focus
                onSelectUser(user);
              }}
            >
              <div 
                className="mention-user-avatar"
                style={{ backgroundColor: userColor }}
              >
                {getInitials(user)}
              </div>
              <div className="mention-user-details">
                <span className="mention-user-name">{user}</span>
                <span className="mention-user-handle">@{user.toLowerCase()}</span>
              </div>
              {isSelected && <span className="mention-selected-badge">↵ Select</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
