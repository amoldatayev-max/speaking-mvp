AI DEVELOPMENT LOOP

This project uses an AI-assisted development workflow.

The development cycle follows these steps:

1. FEATURE IDEA

Define the feature or improvement that should be built.

Focus on small improvements that support the product philosophy.

Principle:
1% improvement → 99% results.

---

2. FEATURE DESIGN

Use ChatGPT to design the feature.

Clarify:

- the purpose
- the user experience
- the interaction flow

---

3. SYSTEM ARCHITECTURE

Evaluate how the feature fits into the system architecture.

Consider:

- voice pipeline
- mobile browser constraints
- system simplicity

---

4. CLAUDE TASK

Create a structured implementation task using:

CLAUDE_TASK_TEMPLATE.md

Include the context files and describe the task clearly.

---

5. CODE IMPLEMENTATION

Send the task to Claude.

Claude generates the implementation code.

---

6. CODE REVIEW

Use the CODE REVIEW conversation to analyze the code.

Check:

- correctness
- architecture
- edge cases
- maintainability

---

7. PERFORMANCE

Use the PERFORMANCE conversation to optimize latency and efficiency.

Voice systems must remain fast and responsive.

---

8. DEBUGGING

If issues appear, use the DEBUGGING conversation to diagnose the problem.

Focus on identifying the root cause.

---

Repeat this loop for each improvement.