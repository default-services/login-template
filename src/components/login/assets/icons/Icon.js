import LoginIcon from 'components/login/assets/icons/LoginIcon';
import PropTypes from 'prop-types';
import React from 'react';
import ResetIcon from 'components/login/assets/icons/ResetIcon';
import SignUpIcon from 'components/login/assets/icons/SignUpIcon';
import styles from 'components/login/assets/styles/Login.module.scss';

const Icon = (props) => {
  const { pageType, ...otherProps } = props;
  const className = pageType === 'passwordReset' ? styles['reset-icon'] : styles.icon;
  const iconProps = { className, ...otherProps };

  switch (pageType) {
    case 'passwordReset':
      return <ResetIcon { ...iconProps } />;

    case 'signUp':
      return <SignUpIcon { ...iconProps } />;

    case 'login':
    default:
      return <LoginIcon { ...iconProps } />;
  }
};

Icon.propTypes = {
  pageType: PropTypes.string.isRequired
};

export default Icon;
