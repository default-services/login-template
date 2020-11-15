import React, { useEffect } from 'react';
import { selectApp, setAppSliceState } from 'state/appSlice';
import { useDispatch, useSelector } from 'react-redux';

import Account from 'components/account/Account';
import Login from 'components/login/Login';
import PropTypes from 'prop-types';
import { checkLoginStatus } from 'utilities/requests';
import persistentStorage from 'utilities/persistentStorage';

const App = () => {
  const { currentPage } = useSelector(selectApp);
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = persistentStorage.getSessionValue('userData');

    if (userData) {
      checkLoginStatus(
        userData.idToken,
        (response) => loginSuccessCallback(response, dispatch, userData),
        loginErrorCallback(dispatch)
      );
    }

    else dispatch(setAppSliceState(['currentPage', 'login']));
  }, []);


  return (
    <Page currentPage={ currentPage } />
  );
};

function Page({ currentPage }) {
  switch (currentPage) {
    case 'login':
      return <Login />;

    case 'account':
      return <Account />;

    default:
      return null;
  }
}

function loginSuccessCallback(response, dispatch, userData) {
  if (response.data.users) {
    dispatch(setAppSliceState([
      ['currentPage', 'account'],
      ['userData', userData]
    ]));
  }
}

function loginErrorCallback(dispatch) {
  return () => {
    persistentStorage.deleteSessionItem('userData');
    dispatch(setAppSliceState(['currentPage', 'login']));
  };
}

Page.propTypes = {
  currentPage: PropTypes.string
};

Page.defaultProps = {
  currentPage: null
};

export default App;
