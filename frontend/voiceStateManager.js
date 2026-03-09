const VOICE_STATES = {
  IDLE: 'IDLE',
  LISTENING: 'LISTENING',
  PROCESSING: 'PROCESSING',
  SPEAKING: 'SPEAKING',
};

const STATUS_TEXT = {
  [VOICE_STATES.IDLE]: 'Tap to speak',
  [VOICE_STATES.LISTENING]: 'Listening...',
  [VOICE_STATES.PROCESSING]: 'Thinking...',
  [VOICE_STATES.SPEAKING]: 'Speaking...',
};

let currentState = VOICE_STATES.IDLE;
let statusElement = null;
let onChangeCallback = null;

function init({ statusElementId, onChange } = {}) {
  if (statusElementId) {
    statusElement = document.getElementById(statusElementId);
  }
  if (typeof onChange === 'function') {
    onChangeCallback = onChange;
  }
  _applyState(VOICE_STATES.IDLE);
}

function setState(newState) {
  if (!VOICE_STATES[newState]) {
    console.warn(`[voiceState] Unknown state: "${newState}"`);
    return;
  }
  if (newState === currentState) return;
  currentState = newState;
  _applyState(newState);
}

function getState() {
  return currentState;
}

function is(state) {
  return currentState === state;
}

function _applyState(state) {
  _updateStatusText(state);
  if (typeof onChangeCallback === 'function') {
    onChangeCallback(state);
  }
}

function _updateStatusText(state) {
  if (!statusElement) return;
  statusElement.textContent = STATUS_TEXT[state] ?? '';
  statusElement.dataset.voiceState = state.toLowerCase();
}

export {
  VOICE_STATES,
  STATUS_TEXT,
  init,
  setState,
  getState,
  is,
};