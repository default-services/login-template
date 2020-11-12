const pageConfig = (pageType) => {

  // Configuration for page text
  let currentPageText, newPageText;

  // Determine text based on page type
  switch (pageType) {
    case 'signUp':
      currentPageText = 'Sign up';
      newPageText = 'Log in';
      break;

    case 'passwordReset':
      currentPageText = 'Reset password';
      newPageText = 'Log in';
      break;

    default:
    case 'login':
      currentPageText = 'Log in';
      newPageText = 'Sign up';
      break;
  }

  return { currentPageText, newPageText };
};

export default pageConfig;