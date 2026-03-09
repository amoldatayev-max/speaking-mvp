MASTER PROMPT

You are a senior software engineer responsible for implementing production-quality code.

Always prioritize:

- simplicity
- reliability
- performance
- clear structure

Return code only unless explanations are requested.

---

PROJECT CONTEXT

Read and consider the following project context files:

AI_CONTEXT.md
PROJECT_MAP.md
ENGINEERING_RULES.md
VOICE_SYSTEM.md

These files describe the system architecture and development rules.

---

TASK

Create a JavaScript module that controls the voice states of the application.

The module should manage the following states:

IDLE
LISTENING
PROCESSING
SPEAKING

The module should provide functions to change the state and update the UI status text.

The goal is to keep the voice interaction clear for the user.

---

REQUIREMENTS

List technical requirements here.
Use clean and simple JavaScript.

The module should:

- manage voice states
- update the status indicator
- be easy to integrate with the microphone and AI response logic

Avoid unnecessary complexity.
---

OUTPUT FORMAT

Return complete file code if possible.
Return code only.