# React Team Chat Application (`chat-app`)

Built for the **Exactspace Technologies** UI Developer Internship selection process.

---

## 🌟 Key Features

### 1. Core Assignment Requirements
- **Message Thread & Input Bar:** Dedicated conversation stream above a modern pill-shaped input capsule.
- **Random User Assignment:** Every sent message is dynamically and randomly assigned to one of:
  ```javascript
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  ```
- **Dynamic Like Counter:** Each message has a thumbs-up like button at the right end of the message card. Every click increments the like counter continuously as required (`count increases on every click`).
- **Initial Conversation Seed:** Pre-populated with messages matching the reference screenshot (`PubNub Bot`, `Gregory Goolsby`, `Elin`).

### 2. Stretch Goals (Fully Implemented)
- **Stretch Goal 1 — Categorized Emoji Picker:**
  - Interactive emoji palette toggled from the smiley icon inside the input pill.
  - Categorized into *Frequent*, *Smileys*, *Gestures*, *Industrial & Tech*, and *Celebration*.
  - Search filter to instantly locate any emoji.
  - Inserts emojis directly at the current cursor position.
- **Stretch Goal 2 — `@` Mention Autocomplete:**
  - Typing `@` automatically detects cursor position and presents a floating dropdown of team members (`Alan`, `Bob`, `Carol`, `Dean`, `Elin`).
  - Full keyboard navigation (`ArrowUp`, `ArrowDown`, `Enter`, `Tab`, `Escape`).
  - Highlights `@Mention` badges in rendered messages with hover cards.
- **Bonus — Dynamic Team Simulation:**
  - Realistic team chat experience: when enabled, other teammates from `user_list` organically respond after a 1–2 second delay with contextual industrial/team remarks and typing indicator!
- **Bonus — Zero-latency Synthesized Audio Feedback:**
  - Uses the Web Audio API to play pleasant audio feedback on sending and liking messages, with a one-click mute toggle.
- **Bonus — Multi-Channel Support & Persistence:**
  - Switch between `# Introductions`, `# Poland Office`, and `# India Office`, or create custom channels.
  - Persistent state in `localStorage` so messages and like counts survive browser reloads.

---

## 🚀 Getting Started

```bash
cd chat-app
npm install
npm run dev
```

App runs at `http://localhost:3000`.

To build for production:
```bash
npm run build
```
