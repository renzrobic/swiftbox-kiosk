/**
 * SWIFTBOX KIOSK CENTRAL API SERVICE
 * 
 * Mediates all kiosk terminal operations through the central SWIFTBOX backend.
 * Provides mutual device authentication using x-kiosk-id and x-kiosk-token headers.
 */

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const KIOSK_ID = process.env.EXPO_PUBLIC_KIOSK_ID || 'KIOSK_PCC_01';
const KIOSK_TOKEN = process.env.EXPO_PUBLIC_KIOSK_TOKEN || 'SWIFTBOX_KIOSK_SECRET_KEY_2026';
const TIMEOUT_MS = 10000;

class KioskApiError extends Error {
  constructor(message, status, code, details = null) {
    super(message);
    this.name = 'KioskApiError';
    this.status = status;
    this.code = code || 'KIOSK_API_ERROR';
    this.details = details;
  }
}

async function request(endpoint, options = {}) {
  const { method = 'GET', body = null } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const headers = {
    'Accept': 'application/json',
    'x-kiosk-id': KIOSK_ID,
    'x-kiosk-token': KIOSK_TOKEN,
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    let payload = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      payload = await response.json();
    } else {
      payload = await response.text();
    }

    if (!response.ok) {
      const errorMessage = (typeof payload === 'object' && (payload?.error?.message || payload?.error || payload?.message)) 
        || `Kiosk request failed with status ${response.status}`;
      const errorCode = (typeof payload === 'object' && (payload?.error?.code || payload?.code)) 
        || `HTTP_${response.status}`;
      const details = (typeof payload === 'object' && payload?.error?.details) || null;

      throw new KioskApiError(errorMessage, response.status, errorCode, details);
    }

    // Unpack canonical envelope { success: true, data: ... }
    if (payload && typeof payload === 'object' && 'success' in payload && 'data' in payload) {
      return payload.data;
    }

    return payload;

  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      throw new KioskApiError('Kiosk terminal connection timed out.', 408, 'REQUEST_TIMEOUT');
    }

    if (err instanceof KioskApiError) {
      throw err;
    }

    throw new KioskApiError(err.message || 'Cannot reach SwiftBox Central Backend.', 0, 'NETWORK_ERROR');
  }
}

export const KioskApi = {
  /**
   * Device health & credentials verification
   */
  checkStatus: () => {
    return request('/api/v1/kiosk/status');
  },

  /**
   * Safe parcel discovery for customer pickup
   */
  getParcel: (parcelId) => {
    return request(`/api/v1/kiosk/parcel/${encodeURIComponent(parcelId)}`);
  },

  /**
   * Authoritative claim PIN verification & door unlock actuation
   */
  verifyPin: (parcelId, pin) => {
    return request('/api/v1/kiosk/verify-pin', {
      method: 'POST',
      body: { parcelId, pin }
    });
  },

  /**
   * Authoritative customer claim & compartment release
   */
  claimParcel: (parcelId, lockerId) => {
    return request('/api/v1/kiosk/claim', {
      method: 'POST',
      body: { parcelId, lockerId }
    });
  },

  /**
   * Authoritative rider parcel drop-off, compartment allocation & PIN generation
   */
  dropoffParcel: ({ parcelId, recipientPhone, recipientName, lockerSize }) => {
    return request('/api/v1/kiosk/dropoff', {
      method: 'POST',
      body: { parcelId, recipientPhone, recipientName, lockerSize }
    });
  }
};

export default KioskApi;
