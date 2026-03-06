/**
 * Application Constants
 * Reusable constants throughout the application
 */

export const POST_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export const FORM_ACTIONS = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete'
};

export const DEFAULT_USER_ID = 1;

export const EMPTY_POST = {
  title: '',
  body: '',
  userId: DEFAULT_USER_ID
};

export const EMPTY_EDIT_FORM = {
  title: '',
  body: ''
};
