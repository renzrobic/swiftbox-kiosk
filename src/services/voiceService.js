import * as Speech from 'expo-speech';

export const SwiftVoice = {
  say: (text) => {
    Speech.speak(text, { language: 'en-US', pitch: 1.0, rate: 0.9 });
  },
  stop: () => Speech.stop(),
};