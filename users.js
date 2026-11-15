// Workplace Team Members & Directory (Teams + Slack + WhatsApp Workplace model)

export const WORKPLACE_USERS = [
  {
    id: "emma-johnson",
    name: "Emma Johnson",
    shortName: "Emma",
    role: "Lead UI/UX Designer",
    department: "Design & Product",
    status: "online", // online | away | busy | dnd | offline
    statusMessage: "Crafting glassmorphism design systems ✨",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    color: "#a855f7",
    lastSeen: "Just now",
    email: "emma.johnson@exactspace.co"
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    shortName: "Michael",
    role: "Senior Systems Architect",
    department: "Infrastructure & Edge",
    status: "online",
    statusMessage: "Monitoring SCADA telemetry clusters 📊",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    color: "#3b82f6",
    lastSeen: "2 mins ago",
    email: "michael.chen@exactspace.co"
  },
  {
    id: "sophia-martinez",
    name: "Sophia Martinez",
    shortName: "Sophia",
    role: "Senior Product Manager",
    department: "Product Operations",
    status: "busy",
    statusMessage: "Sprint planning in progress 📅",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    color: "#ec4899",
    lastSeen: "5 mins ago",
    email: "sophia.martinez@exactspace.co"
  },
  {
    id: "david-wilson",
    name: "David Wilson",
    shortName: "David",
    role: "DevOps & OT Reliability Lead",
    department: "DevOps & Cloud",
    status: "online",
    statusMessage: "Deploying Pulse v4.2 air-gapped node 🚀",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    color: "#10b981",
    lastSeen: "Just now",
    email: "david.wilson@exactspace.co"
  },
  {
    id: "olivia-brown",
    name: "Olivia Brown",
    shortName: "Olivia",
    role: "Senior Frontend Engineer",
    department: "Frontend Engineering",
    status: "online",
    statusMessage: "Refining WhatsApp & Teams message actions 💬",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    color: "#8b5cf6",
    lastSeen: "Just now",
    email: "olivia.brown@exactspace.co"
  },
  {
    id: "ethan-clark",
    name: "Ethan Clark",
    shortName: "Ethan",
    role: "Industrial AI & APM Scientist",
    department: "AI & Analytics",
    status: "dnd",
    statusMessage: "Deep in neural time-series training 🧠",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    color: "#f59e0b",
    lastSeen: "15 mins ago",
    email: "ethan.clark@exactspace.co"
  },
  {
    id: "ava-taylor",
    name: "Ava Taylor",
    shortName: "Ava",
    role: "SCADA & Telemetry Specialist",
    department: "Plant Operations",
    status: "away",
    statusMessage: "Inspecting Boiler 3 sensor gateway 🔧",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    color: "#06b6d4",
    lastSeen: "25 mins ago",
    email: "ava.taylor@exactspace.co"
  },
  {
    id: "ryan-anderson",
    name: "Ryan Anderson",
    shortName: "Ryan",
    role: "Security & OT Compliance Lead",
    department: "Security & Governance",
    status: "online",
    statusMessage: "Ed25519 air-gap audits verified 🛡️",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    color: "#e11d48",
    lastSeen: "Just now",
    email: "ryan.anderson@exactspace.co"
  },
  {
    id: "mia-thomas",
    name: "Mia Thomas",
    shortName: "Mia",
    role: "QA Automation Engineer",
    department: "Quality Assurance",
    status: "online",
    statusMessage: "Running 150+ E2E test suites ✅",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    color: "#14b8a6",
    lastSeen: "4 mins ago",
    email: "mia.thomas@exactspace.co"
  },
  {
    id: "noah-parker",
    name: "Noah Parker",
    shortName: "Noah",
    role: "Full Stack Developer",
    department: "Core Engineering",
    status: "offline",
    statusMessage: "Back at 09:00 AM IST 🌙",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    color: "#64748b",
    lastSeen: "2 hours ago",
    email: "noah.parker@exactspace.co"
  }
];

// Preserving original assignment usernames & mapping to rich workplace users
export const USER_LIST = [
  "Alan",
  "Bob",
  "Carol",
  "Dean",
  "Elin",
  "Emma Johnson",
  "Michael Chen",
  "Sophia Martinez",
  "David Wilson",
  "Olivia Brown"
];

export const CURRENT_USER = {
  id: "rolande-raimondi",
  name: "Rolande Raimondi",
  shortName: "Rolande",
  role: "Research Nurse & Lead Operator",
  department: "Healthcare & OT Monitoring",
  status: "online",
  statusMessage: "Live workspace active • Node 04",
  avatar: null, // Displays 'RR' initials badge
  color: "#a855f7"
};

export const USER_COLORS = {
  Alan: "#3b82f6",
  Bob: "#10b981",
  Carol: "#ec4899",
  Dean: "#f59e0b",
  Elin: "#a855f7",
  "Emma Johnson": "#a855f7",
  "Michael Chen": "#3b82f6",
  "Sophia Martinez": "#ec4899",
  "David Wilson": "#10b981",
  "Olivia Brown": "#8b5cf6",
  "Ethan Clark": "#f59e0b",
  "Ava Taylor": "#06b6d4",
  "Ryan Anderson": "#e11d48",
  "Mia Thomas": "#14b8a6",
  "Noah Parker": "#64748b",
  "Rolande Raimondi": "#a855f7",
  "PubNub Bot": "#ef4444"
};

export const INITIAL_CHANNELS = [
  {
    id: "introductions",
    type: "channel",
    name: "introductions",
    displayName: "Introductions",
    description: "Company-wide welcome and teammate intros",
    topic: "Live workspace status",
    memberCount: 10,
    unreadCount: 0,
    isPrivate: false,
    messages: [
      {
        id: "msg-intro-1",
        user: "Alan",
        userId: "alan",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        text: "Welcome to Exactspace Workplace Chat! 👋\nUse the toolbar above any message to Reply, React, Copy, Edit, or Delete.",
        time: "10:15 AM",
        likes: 4,
        reactions: { "👍": 6, "🔥": 4, "🚀": 3 },
        isPinned: true,
        isStarred: true
      },
      {
        id: "msg-intro-2",
        user: "Elin",
        userId: "elin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        text: "Hey @Alan! Open Settings ⚙️ in the top-right to switch between Dark Glassmorphism, Teams, Emerald Pro, or upload a custom wallpaper.",
        time: "10:18 AM",
        likes: 7,
        reactions: { "❤️": 5, "🎉": 4 },
        replyTo: {
          id: "msg-intro-1",
          user: "Alan",
          text: "Welcome to Exactspace Workplace Chat! 👋 Use the toolbar above any message to Reply, React, Copy, Edit, or Delete."
        }
      },
      {
        id: "msg-intro-3",
        user: "Michael Chen",
        userId: "michael-chen",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        text: "Checked the SCADA cluster diagnostics. Latency is under 1.8ms on edge nodes.",
        time: "10:24 AM",
        likes: 2,
        reactions: { "✅": 3 }
      }
    ]
  },
  {
    id: "announcements",
    type: "channel",
    name: "announcements",
    displayName: "Announcements",
    description: "Important company broadcasts, releases, and milestones",
    topic: "Quarterly product roadmap",
    memberCount: 45,
    unreadCount: 1,
    isPrivate: false,
    messages: [
      {
        id: "msg-ann-1",
        user: "Sophia Martinez",
        userId: "sophia-martinez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        text: "📢 Exactspace Pulse v4.2 Release Candidate is live across test plants in Bangalore and Kraków! Great effort everyone 🚀",
        time: "09:00 AM",
        likes: 12,
        reactions: { "🎉": 8, "🚀": 10, "🔥": 6 },
        isPinned: true
      }
    ]
  },
  {
    id: "general",
    type: "channel",
    name: "general",
    displayName: "General",
    description: "Daily general sync and cross-functional chatter",
    topic: "Workplace chatter",
    memberCount: 50,
    unreadCount: 0,
    isPrivate: false,
    messages: [
      {
        id: "msg-gen-1",
        user: "David Wilson",
        userId: "david-wilson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        text: "Reminder: Edge deployment sync starts at 3:00 PM today in the Conference Room. See calendar widget for agenda.",
        time: "11:00 AM",
        likes: 3,
        reactions: { "👍": 4 }
      }
    ]
  },
  {
    id: "development",
    type: "channel",
    name: "development",
    displayName: "Development",
    description: "Core React, architecture, and backend engineering",
    topic: "PR reviews & releases",
    memberCount: 18,
    unreadCount: 2,
    isPrivate: false,
    messages: [
      {
        id: "msg-dev-1",
        user: "Olivia Brown",
        userId: "olivia-brown",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        text: "PR #242 is up: Integrated interactive whiteboard, voice notes, and meeting calendar widgets! Reviewers welcome.",
        time: "11:30 AM",
        likes: 5,
        reactions: { "🔥": 4, "👏": 3 }
      }
    ]
  },
  {
    id: "ui-ux",
    type: "channel",
    name: "ui-ux",
    displayName: "UI-UX",
    description: "Design systems, glassmorphism themes & interactive prototypes",
    topic: "Design system tokens",
    memberCount: 8,
    unreadCount: 0,
    isPrivate: false,
    messages: [
      {
        id: "msg-ui-1",
        user: "Emma Johnson",
        userId: "emma-johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        text: "The new macOS window header with interactive theme drawer is looking super clean in the glassmorphism preview!",
        time: "11:45 AM",
        likes: 6,
        reactions: { "✨": 5, "❤️": 4 }
      }
    ]
  },
  {
    id: "testing",
    type: "channel",
    name: "testing",
    displayName: "Testing",
    description: "QA automation, test suites & bug triage",
    topic: "E2E testing runs",
    memberCount: 12,
    unreadCount: 0,
    isPrivate: false,
    messages: [
      {
        id: "msg-tst-1",
        user: "Mia Thomas",
        userId: "mia-thomas",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
        text: "All 158 tests passing on master! Build time is 2.4s. Zero regressions found.",
        time: "12:00 PM",
        likes: 8,
        reactions: { "✅": 7, "🎉": 4 }
      }
    ]
  },
  {
    id: "marketing",
    type: "channel",
    name: "marketing",
    displayName: "Marketing",
    description: "Case studies, webinars & industrial event showcases",
    topic: "Industrial AI Summit 2026",
    memberCount: 14,
    unreadCount: 0,
    isPrivate: false,
    messages: [
      {
        id: "msg-mkt-1",
        user: "Sophia Martinez",
        userId: "sophia-martinez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        text: "Industrial AI Summit slide deck is ready. Boiler 3 case study shows a 20x faster setup onboarding highlight.",
        time: "12:15 PM",
        likes: 4,
        reactions: { "📊": 4 }
      }
    ]
  }
];

export const INITIAL_DIRECT_MESSAGES = [
  {
    id: "dm-alan",
    type: "dm",
    user: "Alan",
    name: "Alan",
    role: "Senior Systems Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "online",
    statusText: "Active status",
    unreadCount: 0,
    messages: [
      {
        id: "dm-msg-1",
        user: "Alan",
        text: "Hey Rolande! Can you double-check the Boiler 3 steam temp telemetry?",
        time: "10:05 AM",
        likes: 1
      },
      {
        id: "dm-msg-2",
        user: "Rolande Raimondi",
        text: "On it Alan! Economizer temperature is steady at 342°C with 98.2% efficiency.",
        time: "10:08 AM",
        likes: 2
      }
    ]
  },
  {
    id: "dm-bob",
    type: "dm",
    user: "Bob",
    name: "Bob",
    role: "DevOps & Cloud Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "online",
    statusText: "Active status",
    unreadCount: 0,
    messages: [
      {
        id: "dm-bob-1",
        user: "Bob",
        text: "The Ed25519 licensing service passed offline air-gap validation.",
        time: "09:40 AM",
        likes: 3
      }
    ]
  },
  {
    id: "dm-carol",
    type: "dm",
    user: "Carol",
    name: "Carol",
    role: "Senior Industrial AI Scientist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "online",
    statusText: "Active status",
    unreadCount: 1,
    messages: [
      {
        id: "dm-carol-1",
        user: "Carol",
        text: "Shared the predictive APM setpoint model in #development.",
        time: "09:55 AM",
        likes: 2
      }
    ]
  },
  {
    id: "dm-dean",
    type: "dm",
    user: "Dean",
    name: "Dean",
    role: "OT Reliability Lead",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    status: "online",
    statusText: "Active status",
    unreadCount: 0,
    messages: [
      {
        id: "dm-dean-1",
        user: "Dean",
        text: "Shift handover notes are recorded in the logbook.",
        time: "08:30 AM",
        likes: 1
      }
    ]
  },
  {
    id: "dm-elin",
    type: "dm",
    user: "Elin",
    name: "Elin",
    role: "Senior UI/UX Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    status: "online",
    statusText: "Active status",
    unreadCount: 0,
    messages: [
      {
        id: "dm-elin-1",
        user: "Elin",
        text: "The dark glassmorphism theme with purple aura looks fantastic on macOS displays!",
        time: "10:12 AM",
        likes: 4
      }
    ]
  }
];

export function getInitials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";
}

export function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
