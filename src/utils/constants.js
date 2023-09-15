export const ERRORS = {
  AW_CREDS_NOT_FOUND: 'AW_CREDS_NOT_FOUND',
};

export const URL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : window.location.origin;
export const API_URL = `${URL}/api`
export const DEFAULT_UPDATE_INTERVAL = 8 * 1000 // in MS 