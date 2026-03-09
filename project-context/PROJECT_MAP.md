PROJECT STRUCTURE

frontend
  index.html
  voice logic
  UI components

backend
  api/ai.js

---

VOICE PIPELINE

microphone capture  
→ speech recognition  
→ AI response generation  
→ text-to-speech  
→ audio playback

---

SYSTEM GOAL

Provide a fast and natural conversational experience.

The system should minimize latency between user speech and AI response.

---

CURRENT MVP

Browser records speech  
→ text is sent to backend API  
→ AI generates response  
→ response is returned to frontend  
→ response is spoken using speech synthesis