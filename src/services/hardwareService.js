import { db } from '../config/firebaseConfig';
import { ref, onValue } from 'firebase/database';

export const HardwareService = {
  // Authoritative unlock actuation is handled server-side by swiftbox-backend
  unlock: async (lockerId) => {
    return { success: true, message: 'Unlock actuation managed by central backend' };
  },

  // Telemetry listener: Listen for the ESP32 reed switch to confirm the door physical state
  watchDoorStatus: (lockerId, callback) => {
    const sensorRef = ref(db, `lockers/${lockerId}/door_sensor`);
    return onValue(sensorRef, (snapshot) => {
      callback(snapshot.val()); // Returns 'OPEN' or 'CLOSED'
    });
  }
};

export default HardwareService;