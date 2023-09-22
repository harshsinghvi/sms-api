export const ERRORS = {
  AW_CREDS_NOT_FOUND: 'AW_CREDS_NOT_FOUND',
};

export const URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.origin;
export const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : `${window.location.origin}/api`;

export const DEFAULT_UPDATE_INTERVAL = process.env.NODE_ENV === 'production : ' ? 5 * 1000 : 10 * 1000; // in MS
