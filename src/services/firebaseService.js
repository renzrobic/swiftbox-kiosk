/**
 * SWIFTBOX KIOSK SERVICE ADAPTER
 * 
 * Migrated in Phase 4: All business operations (PIN verification, parcel claims,
 * compartment allocation, and PIN generation) are delegated to the central backend
 * via KioskApi with mutual device authentication.
 * 
 * Direct Firebase database writes have been completely removed.
 */

import { KioskApi } from './kioskApi';

export const FirebaseService = {
  /**
   * Find if user already has an active locker (delegated to backend drop-off logic)
   */
  findLockerByPhone: async (phone) => {
    // Handled authoritatively by backend during dropoffParcel
    return null;
  },

  /**
   * Safe discovery: Get parcel details via central backend
   */
  getParcel: async (parcelId) => {
    try {
      const data = await KioskApi.getParcel(parcelId);
      return {
        parcel_id: data.parcelId,
        status: data.status,
        locker_id: data.lockerId,
        recipient_phone: data.recipientPhone
      };
    } catch (err) {
      console.warn("Kiosk getParcel failed:", err.message);
      return null;
    }
  },

  /**
   * Authoritative claim PIN verification & door unlock
   */
  verifyParcelPin: async (parcelId, pin) => {
    try {
      const result = await KioskApi.verifyPin(parcelId, pin);
      return !!result.verified;
    } catch (err) {
      console.warn("Kiosk verifyParcelPin failed:", err.message);
      return false;
    }
  },

  /**
   * Authoritative rider parcel drop-off & compartment assignment
   */
  assignParcelToLocker: async (parcelId, phone, lockerId = null, extra = {}) => {
    const result = await KioskApi.dropoffParcel({
      parcelId,
      recipientPhone: phone,
      recipientName: extra.recipientName || '',
      lockerSize: extra.lockerSize || 'M'
    });

    return {
      pin: result.pin,
      lockerId: result.lockerId,
      doorCommand: result.doorCommand
    };
  },

  /**
   * Authoritative customer claim & compartment release
   */
  releaseLocker: async (parcelId, lockerId) => {
    return KioskApi.claimParcel(parcelId, lockerId);
  }
};

export default FirebaseService;