import formidable from "formidable";
import fs from "fs";
import OpenAI from "openai";

export const config = {
  api: { bodyParser: false },
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* ─── SYSTEM PROMPT ────────────────────────────────────────── */

const SYSTEM_PROMPT = `
You are a calm, neutral, inclusive speaking trainer.
Your role is NOT to teach, explain, analyze, or evaluate.
Your role is to help the user SPEAK again with one small improvement.

Core principles:
Voice first. Text is secondary.
No pressure. No judgment. No hype.
One action at a time.
Short over long. Always.
1% change. 99% of the benefit.

You MUST always follow these rules:
Start with a short, calm acknowledgment (maximum 2–4 words).
Identify ONLY ONE improvement.
Priority order: clarity → simplicity → structure → grammar → word choice.
Ask the user to repeat with ONLY that one change.
Never explain grammar rules or theory.
Never name linguistic or academic terms.
Never give more than one suggestion.
Use very short, simple sentences.
Maintain a calm, emotionally neutral tone.

When NO improvement is needed:
Ask ONE simple, relevant follow-up question to keep the user speaking.

Output format:
Maximum 6–10 words per line.
One line at a time.
Keep responses as short as possible.
`.trim();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  /* ─── PARSE FORM DATA ──────────────────────────────────────── */

  const form = formidable({ keepExtensions: true });

  let audioPath;
  try {
    const [, files] = await form.parse(req);
    const file = files.audio?.[0] ?? files.audio;
    if (!file) throw new Error("No audio file received");
    audioPath = file.filepath;
  } catch (err) {
    console.error("Form parse error:", err);
    return res.status(400).json({ error: "Invalid audio upload" });
  }

  try {
    /* ─── 1. TRANSCRIBE ──────────────────────────────────────── */

    const transcription = await openai.audio.transcriptions.create({
      file:  fs.createReadStream(audioPath),
      model: "whisper-1",
      language: "en",
    });

    const userText = transcription.text?.trim();

    if (!userText) {
      return res.status(200).json({
        reply: "I didn't catch that. Please try again.",
        audio: await generateTTS("I didn't catch that. Please try again."),
      });
    }

    /* ─── 2. AI REPLY ────────────────────────────────────────── */

    const completion = await openai.chat.completions.create({
      model:       "gpt-4o-mini",
      temperature: 0.3,
      max_tokens:  180,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: userText },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Okay. Say it again.";

    /* ─── 3. TTS ─────────────────────────────────────────────── */

    const audioBase64 = await generateTTS(reply);

    return res.status(200).json({ reply, audio: audioBase64 });

  } catch (err) {
    console.error("Pipeline error:", err);
    return res.status(500).json({ error: "Pipeline error" });
  } finally {
    // Clean up temp file
    if (audioPath) fs.unlink(audioPath, () => {});
  }
}

/* ─── TTS HELPER ───────────────────────────────────────────── */

async function generateTTS(text) {
  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
      response_format: "mp3",
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer.toString("base64");
  } catch (err) {
    console.error("TTS error:", err);
    return null;
  }
}