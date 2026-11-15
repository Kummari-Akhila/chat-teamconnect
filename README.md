# TeamConnect – React Team Chat Application

A modern, interactive workplace collaboration application built using **React and Vite** for the **Exactspace Technologies UI Developer Internship selection process**.

TeamConnect provides a team communication experience inspired by platforms like Slack and Microsoft Teams, with real-time-style messaging interactions, emoji reactions, user mentions, multiple channels, and persistent chat history.

## 🌟 Key Features

### 1. Core Assignment Requirements

- **Message Thread & Input Bar:** Dedicated conversation area with a modern, pill-shaped message input.
- **Random User Assignment:** Every sent message is dynamically assigned to one of the following users:

  ```javascript
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  ```

- **Dynamic Like Counter:** Each message includes a thumbs-up button. Every click increments its like count.
- **Initial Conversation Seed:** Pre-populated messages featuring `PubNub Bot`, `Gregory Goolsby`, and `Elin` to recreate the reference conversation.

### 2. Stretch Goals

#### Stretch Goal 1 – Categorized Emoji Picker

- Interactive emoji picker accessible through the smiley icon.
- Categories include Frequent, Smileys, Gestures, Industrial & Tech, and Celebration.
- Search functionality to find emojis quickly.
- Inserts emojis at the current cursor position in the message input.

#### Stretch Goal 2 – @Mention Autocomplete

- Automatically detects `@` while typing.
- Displays a floating dropdown containing available team members.
- Supports keyboard navigation using Arrow Up, Arrow Down, Enter, Tab, and Escape.
- Highlights mentions in sent messages.
- Provides hover cards for mentioned team members.

### 3. Bonus Features

#### Dynamic Team Simulation

- Other teammates can automatically respond to messages.
- Responses are generated using contextual industrial and workplace-related remarks.
- Includes a 1–2 second response delay.
- Displays a typing indicator while a teammate is preparing a response.

#### Audio Feedback

- Uses the Web Audio API to generate audio feedback.
- Plays sounds when sending messages and liking messages.
- Includes a mute/unmute toggle.

#### Multi-Channel Support

- Supports switching between:
  - # Introductions
  - # Poland Office
  - # India Office
- Allows users to create custom channels.
- Maintains separate conversations for different channels.

#### Persistent Chat State

- Uses browser `localStorage` to preserve application state.
- Stores messages, like counts, and channel conversations.
- Restores saved conversations after a browser reload.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| JavaScript (ES6+) | Application logic and interactions |
| Vite | Development server and build tool |
| HTML5 | Application structure |
| CSS3 | Styling, layouts, and responsive design |
| Web Audio API | Synthesized audio feedback |
| localStorage | Persistent chat data |
| Lucide / UI icons | Interface iconography |

## 📁 Project Structure

```text
chat-app/
│
├── .qodo/
│   ├── agents/
│   └── workflows/
│
├── dist/                         # Production build output
│   ├── assets/
│   └── index.html
│
├── node_modules/                 # Installed dependencies
│
├── src/                           # Application source code
│   │
│   ├── assets/                    # Static assets
│   │
│   ├── components/                # Reusable UI components
│   │   ├── Chat interface
│   │   ├── Message components
│   │   ├── Input bar
│   │   ├── Emoji picker
│   │   ├── Mention dropdown
│   │   ├── Modals and drawers
│   │   └── Menus and other UI elements
│   │
│   ├── constants/                 # Application constants
│   │   └── users.js               # Team member information
│   │
│   ├── contexts/                  # React context providers
│   │   └── ThemeContext.jsx       # Theme management
│   │
│   ├── utils/                     # Helper functions
│   │   ├── aiResponder.js         # Dynamic teammate responses
│   │   └── sound.js               # Audio feedback utilities
│   │
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Main application styles
│   └── main.jsx                   # React application entry point
│
├── index.html                     # HTML entry point
├── package.json                   # Project dependencies and scripts
├── package-lock.json              # Dependency lock file
├── vite.config.js                 # Vite configuration
└── README.md                      # Project documentation
```

**Note:** `node_modules/` contains installed dependencies, while `dist/` contains generated production build files. These are generated directories rather than application source code.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- A modern web browser

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd chat-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

### 5. Build for Production

```bash
npm run build
```

The production-ready files will be generated inside the `dist/` directory.

## 🎯 Project Objective

The objective of TeamConnect is to develop a responsive and interactive team communication interface that demonstrates practical React development skills, reusable component architecture, state management, event handling, dynamic UI updates, and browser-based data persistence.

The application combines the essential requirements of the assignment with additional features to create a polished and engaging workplace collaboration experience.

---

**Developed for:** Exactspace Technologies – UI Developer Internship Selection Process

**Project:** TeamConnect – React Team Chat Application  
**Framework:** React + Vite

Demo Video : https://drive.google.com/file/d/19R9S_eT8iLcfPQKZW141hE3-zOGahFc6/view?usp=sharing

## 🔗 Live Demo

**Try TeamConnect here:** [https://chat-teamconnect.netlify.app](https://chat-teamconnect.netlify.app)
