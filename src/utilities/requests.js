import persistentStorage from 'utilities/persistentStorage';

/**
 * @namespace Requests
 * @description - Helper functions for network requests (e.g., get, post, put, delete, etc..)
 */

/**
 * @description - API url to use for REST calls.
 */
const { location: { hostname, protocol } } = window;
const url = `${protocol}//${hostname}:8080`;

/**
 * @description - Helper GET method for sending requests to and from the Python/Flask services.
 * @param {string} pathname - URL pathname of the Python/Flask service you want to use.
 * @param {function} callback - Callback function which uses the returned data as an argument.
 * @param {function} errorCallback - Callback function to use if there's an error.
 * @return response data from Python/Flask service.
 * @memberof Requests
 */
export const get = (pathname, callback, errorCallback) => {
  fetch(`${url}/${pathname}`)
    .then((response) => response.json())
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
};

/**
 * @description - Helper POST method for sending requests to and from the Python/Flask services.
 * @param {string} body - JSON.stringified request body of data that you want to pass.
 * @param {string} pathname - URL of the Python/Flask service you want to use.
 * @param {function} callback - optional callback function to be invoked if provided.
 * @param {function} errorCallback - Callback function to use if there's an error.
 * @return response data from Python/Flask service.
 * @memberof Requests
 */
export const post = (body, pathname, callback, errorCallback) => {
  fetch(`${url}/${pathname}`, {
    body,
    method: 'POST',
    headers: { 'Content-type': 'application/json' }
  })
    .then((response) => response.json())
    .then((response) => callback(response))
    .catch((error) => errorCallback(error));
};

/**
 * @description Generic function to parse requests being made to Firebase.
 * @param {object} requestBody - Request body of post REST call.
 * @param {string} pathname - Pathname/route to make REST call to.
 * @param {function} callback - Callback executed with the response as its argument.
 * @param {function} errorCallback - Error callback executed with the error as its argument.
 */
const parseRequest = (
  requestBody,
  pathname,
  ...args
) => {
  const [ callback, errorCallback ] = args;
  const credentials = JSON.stringify({ ...requestBody });

  post(
    credentials,
    pathname,
    (response) => callback(response),
    (error) => errorCallback(error)
  );

};

/**
 * @description - Function to log into the user's account in Firebase.
 * @param {string} emailOrUsername - User email or username, either will work.
 * @param {string} password - User password to log into their account.
 * @param  {...function} args - `callback` and `errorCallback` functions.
 */
export const userLogIn = (emailOrUsername, password, ...args) => {

  // Check for string@string.string
  const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);
  const credentials = {
    email: isEmail ? emailOrUsername : null,
    username: !isEmail ? emailOrUsername : null,
    password
  };

  parseRequest(credentials, 'log_in', ...args);
};

/**
 * @description - Function to log out of the user's account. Removes session data
 * and refreshes the screen.
 */
export const userLogOut = () => {
  persistentStorage.deleteSessionItem('userData');
  window.location.reload();
};

/**
 * @description - Function check if the Firebase idToken has expired.
 * @param {string} idToken - Firebase idToken which expires after 1hr.
 * @param  {...function} args - `callback` and `errorCallback` functions.
 */
export const checkLoginStatus = (idToken, ...args) => {
  parseRequest({ idToken }, 'is_logged_in', ...args);
};

/**
 * @description - Function create an account in Firebase.
 * @param {string} email - User email address to associate with account.
 * @param {string} password - User password to log into their account.
 * @param {string} username - Username to associate with account.
 * @param  {...function} args - `callback` and `errorCallback` functions.
 */
export const createAccount = (email, password, username, ...args) => {
  parseRequest({ email, password, username }, 'create_account', ...args);
};

/**
 * @description - Sends a password reset to user to reset their password in Firebase.
 * @param {string} email - User email address associated with the user's account.
 * @param  {...function} args - `callback` and `errorCallback` functions.
 */
export const passwordReset = (email, ...args) => {
  parseRequest({ email }, 'reset_password', ...args);
};