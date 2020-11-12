import { createAccount, passwordReset, userLogIn } from 'utilities/requests';

// Generic function to help parse Firebase error messages
const parseErrorMessage = (errorMessage) => {
  return errorMessage.split(' ')[0].replace(/_/g, ' ').toLowerCase();
};

// Callback for successful sign up
const signUpSuccessCallback = (data, setNotice) => {
  let responseMessage = 'A verification email has been sent to the email address provided.';
  let responseHeader = 'Account created';

  if (data.error) {
    responseHeader = parseErrorMessage(data.error);

    switch (data.error) {
      case 'EMAIL_EXISTS':
        responseMessage = 'The email address provided already exists.';
        break;

      case 'USERNAME_EXISTS':
        responseMessage = 'The username provided already exists.';
        break;

      // Default error message (unknown Firebase error)
      default:
        responseMessage = 'Sign in attempt failed.';
    }
  }

  // Show error notice
  setNotice({
    header: responseHeader,
    message: responseMessage
  });

};

const loginSuccessCallback = (data, setNotice) => {

  if (data.error) {
    let responseMessage;
    const [ errorMessage ] = data.error.split(' ');

    switch (errorMessage) {
      case 'INVALID_PASSWORD':
        responseMessage = 'The password provided does not match email or username provided, try again or reset your password.';
        break;

      case 'MISSING_EMAIL':
        responseMessage = 'The email or username provided does not match an account, try again or sign up.';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        responseMessage = 'This account has been temporarily disabled due to several failed login attempts. You can reset your password or try again later.';
        break;

      // Default error message (unknown Firebase error)
      default:
        responseMessage = 'Unable to log in with the information supplied.';
    }

    setNotice({
      header: 'Login failed',
      message: responseMessage
    });
  }

  else return data;
};


// Callback function for password reset
const passwordResetSuccessCallback = (data, setNotice) => {
  // Initialize variable for response message
  let responseHeader = 'Reset requested';
  let responseMessage = 'A password reset email has been sent to the email address provided.';

  // Determine message based on error provided from Firebase
  if (data.error) {
    console.log('error!');
    // Update response header
    responseHeader = parseErrorMessage(data.error);

    // Determine message based on error provided from Firebase
    switch (data.error) {
      case 'EMAIL_NOT_FOUND':
        responseMessage = 'The email address provided does not belong to an account.';
        break;

      default:
        responseMessage = 'Cannot reset password for the email address provided.';
    }
  }

  setNotice({
    header: responseHeader,
    message: responseMessage
  });
};


// Callback for sign up error
const errorCallback = (error, setNotice) => {

  // Log error in console
  console.error(error);

  // Show server error notice to user
  setNotice({
    header: 'Server error',
    message: 'Failed due to internal server error.'
  });
};


// Function to execute when login/signup form is submitted
const submitForm = (pageType, email, password, username, setNotice) => {

  return new Promise((resolve, reject) => {

    // Determine what to execute based on page type
    switch (pageType) {

      // Function to create an account
      case 'signUp':
        createAccount(
          // credentials
          email, password, username,

          // Success callback (no internal server errors)
          (data) => resolve(signUpSuccessCallback(data, setNotice)),

          // error callback
          (error) => reject(errorCallback(error, setNotice))
        );

        // Nothing to return, just resolve promise
        return resolve();


      // Function to log into the user's account
      case 'login':
        return userLogIn(

          // credentials
          username, password,

          // Success callback
          (data) => resolve(loginSuccessCallback(data, setNotice)),

          // Error callback
          (error) => reject(errorCallback(error, setNotice))
        );


      // Function to reset user password
      case 'passwordReset':
        return passwordReset(

          // credentials
          email,

          // Success callback
          (data) => resolve(passwordResetSuccessCallback(data, setNotice)),

          // Error callback
          (error) => reject(errorCallback(error, setNotice))
        );


      // Default submit function (submit failed)
      default:
        console.error('Submit failed');
        return resolve();
    }
  });
};

export default submitForm;