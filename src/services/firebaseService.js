import { db } from '../config/firebaseConfig';
import { ref, get, update, set, child } from 'firebase/database';

export const FirebaseService = {
  // 1. SMART CHECK: Find if a user already has an active locker
  findLockerByPhone: async (phone) => {
    const lockersRef = ref(db, 'lockers');
    const snapshot = await get(lockersRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const existingId = Object.keys(data).find(key => 
        data[key].status === 'OCCUPIED' && data[key].recipient_phone === phone
      );
      return existingId || null;
    }
    return null;
  },

  // 2. DISCOVERY: Get parcel details
  getParcel: async (parcelId) => {
    const parcelRef = ref(db, `parcels/${parcelId}`);
    const snapshot = await get(parcelRef);
    return snapshot.exists() ? snapshot.val() : null;
  },

  // 3. AUTHENTICATION: Verify claim PIN
  verifyParcelPin: async (parcelId, pin) => {
    // We need to look up the locker associated with this parcel to find the PIN
    const parcel = await FirebaseService.getParcel(parcelId);
    if (!parcel || !parcel.locker_id) return false;

    const lockerRef = ref(db, `lockers/${parcel.locker_id}`);
    const snapshot = await get(lockerRef);
    
    if (snapshot.exists()) {
      const lockerData = snapshot.val();
      return lockerData.claim_pin === pin;
    }
    return false;
  },

  // 4. ASSIGNMENT: Link a parcel to a locker and generate a PIN
  assignParcelToLocker: async (parcelId, phone, lockerId) => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit PIN
    
    const updates = {};
    updates[`lockers/${lockerId}`] = {
      status: 'OCCUPIED',
      recipient_phone: phone,
      current_parcel: parcelId,
      claim_pin: pin,
      last_update: new Date().toISOString()
    };
    
    updates[`parcels/${parcelId}`] = {
      status: 'IN_LOCKER',
      locker_id: lockerId,
      recipient_phone: phone,
      delivered_at: new Date().toISOString()
    };

    await update(ref(db), updates);
    return pin;
  },

  // 5. RELEASE: Clear locker and parcel after successful claim
  releaseLocker: async (parcelId, lockerId) => {
    const updates = {};
    updates[`lockers/${lockerId}`] = {
      status: 'AVAILABLE',
      recipient_phone: null,
      current_parcel: null,
      claim_pin: null,
      last_update: new Date().toISOString()
    };
    
    updates[`parcels/${parcelId}/status`] = 'PICKED_UP';
    updates[`parcels/${parcelId}/picked_up_at`] = new Date().toISOString();

    await update(ref(db), updates);
  }
};