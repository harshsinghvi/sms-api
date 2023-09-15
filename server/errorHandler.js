export const ERROR_MESSAGES = {};

export const ERROR_TYPES = {};

export const SERVER_ERRORS = {
  INTERNAL: 'INTERNAL',
  DATA_ERROR: 'DATA_ERROR',
  WEBHOOK_ERROR: 'WEBHOOK_ERROR',
  DB_NOT_UPDATED: 'DB_NOT_UPDATED',
};

export const handleErrors = async (err, req, res, next) => {
  console.error(err);
  if (ERROR_MESSAGES[err.message]) {
    res.status(400);
    res.json({ error: ERROR_MESSAGES[err.message], errorId: err.message });
    return;
  }
  // TODO: post error to webhook
  res.status(err.status || 500);
  res.json({ error: 'Something went wrong' });
};

// TODO-Phase2: Set different error code for different errors;
