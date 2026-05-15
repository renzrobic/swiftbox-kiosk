import { db } from './firebaseConfig';
import { ref, update, onValue } from 'firebase/database';

export const HardwareService = {
  
  // Send the unlock command to Firebase
  unlock: async (lockerId) => {
    const lockerRef = ref(db, `lockers/${lockerId}`);
    return update(lockerRef, { door_command: 'PENDING_UNLOCK' });
  },

  // Listen for the ESP32 to confirm the door is actually closed
  watchDoorStatus: (lockerId, callback) => {
    const sensorRef = ref(db, `lockers/${lockerId}/door_sensor`);
    return onValue(sensorRef, (snapshot) => {
      callback(snapshot.val()); // Returns 'OPEN' or 'CLOSED'
    });
  }
};