import { Button, Checkbox, Container, Input, Loader, Notice } from '@default-services/components';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { selectApp, setAppSliceState } from 'state/appSlice';
import { selectLogin, setLoginSliceState } from 'state/loginSlice';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'components/login/assets/icons/Icon';
import pageConfig from 'components/login/utilities/pageConfig';
import persistentStorage from 'utilities/persistentStorage';
import styles from 'components/login/assets/styles/Login.module.scss';
import submitForm from 'components/login/utilities/submitForm';

const Login = () => {

  const dispatch = useDispatch();

  const {
    email,
    isRememberMe,
    pageType,
    password,
    username
  } = useSelector(selectLogin);
  const { currentPage } = useSelector(selectApp);

  const [showNotice, setShowNotice] = useState(false);
  const [notice, setNotice] = useState({ header: '', message: '' });
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const rememberUser = persistentStorage.getLocalValue('rememberUser');
    const usernameData = persistentStorage.getLocalValue('username');

    if (rememberUser) {
      if (usernameData) {
        dispatch(setLoginSliceState([
          ['isRememberMe', true],
          ['username', usernameData]
        ]));
      }

      else dispatch(setLoginSliceState(['isRememberMe', true]));
    }

    if (notice.header) {
      setShowNotice(true);
      setShowLoader(false);
    }

    else setShowNotice(false);
  }, [notice]);

  const toggleForgotPassword = () => {
    dispatch(setLoginSliceState(['pageType', 'passwordReset']));
  };

  const toggleLoginSignup = () => {
    const newPageType = pageType === 'login' ? 'signUp' : 'login';
    dispatch(setLoginSliceState(['pageType', newPageType]));
  };

  const toggleRememberMe = () => {
    persistentStorage.setLocalValue('rememberUser', !isRememberMe);
    dispatch(setLoginSliceState(['isRememberMe', !isRememberMe]));
  };

  const updateEmail = (event) => {
    const { target: { value } } = event;
    dispatch(setLoginSliceState(['email', value]));
  };

  const updatePassword = (event) => {
    const {
      target: { value }
    } = event;
    dispatch(setLoginSliceState(['password', value]));
  };

  const updateUsername = (event) => {
    const {
      target: { value }
    } = event;
    dispatch(setLoginSliceState(['username', value]));
  };

  const { currentPageText, newPageText } = pageConfig(pageType);
  const submitInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLoader(true);

    submitForm(
      pageType,
      email,
      password,
      username,
      setNotice
    ).then((response) => {

      if (currentPage === 'login' && pageType === 'login') {

        const hasResponseData = Boolean(response && response.data !== null);

        if (hasResponseData && !response.data.isEmailVerified) {
          setNotice({
            header: 'Verify email address',
            message: "You must first verify your email before you're able to log in."
          });
        }

        else if (hasResponseData) {

          if (persistentStorage.getLocalValue('rememberUser')) {
            persistentStorage.setLocalValue('username', username);
          }

          else persistentStorage.deleteLocalItem('username');

          persistentStorage.setSessionValue('userData', response.data);

          dispatch(
            setAppSliceState([ ['currentPage', 'account'], ['userData', response.data] ])
          );
        }

      }
    });
  };


  return (
    <Fragment>
      <form onSubmit={ handleSubmit }>
        <Container className={ styles.container }>
          <Icon pageType={ pageType } />
          <h4>{currentPageText}</h4>
          <div className={ styles.inputs }>
            {
              pageType === 'signUp' || pageType === 'passwordReset' ? (
                <Input
                  className={ styles.label }
                  onChange={ updateEmail }
                  placeholder="email address"
                  required
                  type="email"
                  value={ email || '' }
                  variant="large"
                />
              ) : null
            }
            {
              pageType !== 'passwordReset' ? (
                <Fragment>
                  <Input
                    className={ styles.label }
                    onChange={ updateUsername }
                    placeholder="username"
                    required
                    value={ username || '' }
                    variant="large"
                  />

                  <Input
                    autoComplete="on"
                    className={ styles.label }
                    minLength="6"
                    onChange={ updatePassword }
                    placeholder="password"
                    required
                    type="password"
                    value={ password || '' }
                    variant="large"
                  />
                </Fragment>
              ) : null
            }
          </div>

          {
            pageType === 'login' ? (
              <Checkbox
                label="Remember me"
                checked={ isRememberMe }
                className={ styles.checkbox }
                onChange={ toggleRememberMe }
              />
            ) : null
          }

          <Button
            className={ styles.button }
            onClick={ () => submitInput.current.click() }
            variant="large"
          >
            <input
              className={ styles['submit-input'] }
              ref={ submitInput }
              type="submit"
            />
            { currentPageText }
          </Button>

          <div className={ pageType === 'login' ? styles.links : styles.link }>
            <a href="#submit" onClick={ toggleForgotPassword }>
              Forgot password?
            </a>

            <a href="#submit" onClick={ toggleLoginSignup }>
              {`${newPageText}?`}
            </a>
          </div>
        </Container>
      </form>

      <Notice
        className={ styles['login-notice'] }
        header={ notice.header }
        okayFunc={ setShowNotice }
        okayText="Okay"
        show={ showNotice || false }
        setShow={ setShowNotice }
        variant="alt-icons"
        type="confirm"
      >
        {notice.message}
      </Notice>
      <Loader show={ showLoader || false } />
    </Fragment>
  );
};

export default Login;
