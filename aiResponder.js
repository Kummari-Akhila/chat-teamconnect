// Intelligent Dynamic Conversational Engine for Exactspace Team Chat
// Generates realistic, contextual, dynamic responses based on user input, intent, mentions, and industrial context

export const TEAM_PROFILES = {
  Alan: {
    role: "Lead SCADA & Systems Architect",
    avatarColor: "#e06c75",
    tone: "analytical and systems-focused"
  },
  Bob: {
    role: "DevOps & Edge Infrastructure",
    avatarColor: "#56b6c2",
    tone: "concise, operational, and practical"
  },
  Carol: {
    role: "Senior Industrial AI & APM Scientist",
    avatarColor: "#c678dd",
    tone: "data-driven, insightful, and enthusiastic"
  },
  Dean: {
    role: "OT Reliability & Plant Operations Lead",
    avatarColor: "#e5c07b",
    tone: "pragmatic, floor-tested, and experienced"
  },
  Elin: {
    role: "Senior UI/UX & Frontend Engineer",
    avatarColor: "#61afef",
    tone: "design-focused, friendly, and user-centric"
  }
};

// Conversational pattern matching and dynamic generation
export function generateDynamicResponse({ prompt, activeChannel, mentionedUser, previousMessages = [] }) {
  const clean = prompt.trim().toLowerCase();
  
  // Determine who should respond:
  let responder = mentionedUser;
  if (!responder || !TEAM_PROFILES[responder]) {
    const candidateKeys = Object.keys(TEAM_PROFILES);
    responder = candidateKeys[Math.floor(Math.random() * candidateKeys.length)];
  }

  // 1. Direct Greetings
  if (/^(hi|hello|hey|hola|greetings|morning|afternoon|evening|namaste)/i.test(clean)) {
    const greetingReplies = [
      `Hey there! Hope your shift is going smoothly. What are we diving into today?`,
      `Hello! Great to see you in #${activeChannel?.name || 'chat'}. Are you reviewing the latest plant telemetry?`,
      `Hi! Just finished running a diagnostics cycle. How can I help you today?`,
      `Hey! Welcome to the team workspace. Let me know if you need any tag analysis or asset reports.`
    ];
    return {
      user: responder,
      text: greetingReplies[Math.floor(Math.random() * greetingReplies.length)]
    };
  }

  // 2. Identity / Purpose ("what is this", "who are you", "what do you do")
  if (/what is this|who are you|what is pulse|what do you do|what is exactspace/i.test(clean)) {
    const aboutReplies = [
      `This is our Exactspace Pulse plant intelligence hub! We connect real-time telemetry from 450+ industrial sites across 40+ countries to monitor machinery, predict failures, and streamline OT/IT workflows.`,
      `You're in our live team collaboration channel. Here we coordinate asset performance models, SCADA integrations, and assist plant operators with operational decisions in real time!`,
      `We're the engineering and operations team behind Pulse Historian and Pulse APM. We use deep domain physics, thermodynamics, and agentic AI to keep multi-million dollar plant assets running safely!`
    ];
    return {
      user: responder,
      text: aboutReplies[Math.floor(Math.random() * aboutReplies.length)]
    };
  }

  // 3. Boiler & Plant Equipment (Specific to Exactspace product use-cases)
  if (/boiler|steam|efficiency|temperature|temp|pressure|turbine|pump|heat/i.test(clean)) {
    const plantReplies = [
      `Checking the live tags for that: economizer outlet temperature is currently hovering around 342°C with 98.2% thermal efficiency. No anomalies flagged in the last 4 hours.`,
      `Good catch! The predictive model shows a slight setpoint drift on the secondary feedwater valve. We should verify with the shift engineer before the next cycle.`,
      `I pulled the 7-day trend from Pulse Historian. Pressure is holding stable at 142 bar, though delta-T widened slightly during peak load around 15:00.`,
      `On it! Pulse APM ran the fault-tree analysis: probable cause is minor soot build-up on the reheater banks. Recommended action is scheduling a soot-blowing cycle.`
    ];
    return {
      user: responder,
      text: plantReplies[Math.floor(Math.random() * plantReplies.length)]
    };
  }

  // 4. UI / Frontend / Design questions
  if (/ui|design|frontend|react|css|component|ux|layout|responsive|font/i.test(clean)) {
    const uiReplies = [
      `Looking at the interface now! The component hierarchy is clean and modular. We're keeping typography legible and contrast sharp for high-stress control room environments.`,
      `Agreed! A modern SaaS UI with generous padding, clear typography, and subtle micro-interactions makes shift log monitoring way more efficient.`,
      `From a UX perspective, keeping the message bubbles responsive and inputs tactile gives operators instant confidence when submitting telemetry notes.`
    ];
    return {
      user: responder === "Elin" ? "Elin" : responder,
      text: uiReplies[Math.floor(Math.random() * uiReplies.length)]
    };
  }

  // 5. Status / How is it going / Tests / Deployment
  if (/status|how is|update|deploy|release|build|test/i.test(clean)) {
    const statusReplies = [
      `All services are green! The offline Ed25519 licensing engine and micro-services launched in 12 seconds. Ready for testing.`,
      `The test pipeline just finished: all 50+ asset classes passed validation, and the time-series ingestion rate is benchmarked at 5x faster than legacy historians!`,
      `Looking solid on our end. Tag backfilling is running at full speed without dropping any OT packets.`
    ];
    return {
      user: responder,
      text: statusReplies[Math.floor(Math.random() * statusReplies.length)]
    };
  }

  // 6. Help / Instructions / Capabilities
  if (/help|features|guide|commands|can you/i.test(clean)) {
    return {
      user: responder,
      text: `Sure thing! You can:
• Ask about plant assets (e.g. "What's the status of Boiler 3?")
• Tag any teammate using @ (e.g. @Alan, @Carol, @Dean, @Bob, @Elin)
• Like any message using the thumbs-up button
• Send emojis using the picker
• Switch channels in the sidebar to review department updates!`
    };
  }

  // 7. General questions (Why, How, When, Where, Is, Can)
  if (/^(why|how|when|where|is|can|will|should|could|does)/i.test(clean) || clean.endsWith('?')) {
    const questionReplies = [
      `That's an important question regarding "${prompt.slice(0, 45)}...". Based on our plant operational guidelines, we recommend verifying against the baseline telemetry first.`,
      `Good inquiry! The historical data suggests this typically correlates with load fluctuations during shift handovers. I'll flag it for review in the daily logbook.`,
      `I've analyzed the recent metrics regarding that. The trend looks stable, but let's monitor the live sensor telemetry over the next 30 minutes.`
    ];
    return {
      user: responder,
      text: questionReplies[Math.floor(Math.random() * questionReplies.length)]
    };
  }

  // 8. General conversational fallback (dynamic, acknowledging the prompt)
  const dynamicFallbacks = [
    `Thanks for the update on "${prompt.length > 35 ? prompt.slice(0, 35) + '...' : prompt}". I've shared this with the shift team.`,
    `Noted! "${prompt.length > 30 ? prompt.slice(0, 30) + '...' : prompt}" is logged in our channel stream. Let's see if anyone has additional data on this.`,
    `Got it! Let me cross-check this against the latest APM model outputs and keep you posted.`,
    `Appreciate the note! @Carol @Alan take a look when you're free.`
  ];

  return {
    user: responder,
    text: dynamicFallbacks[Math.floor(Math.random() * dynamicFallbacks.length)]
  };
}
