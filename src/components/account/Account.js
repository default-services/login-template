import { Navbar } from '@default-services/components';
import React from 'react';
import { userLogOut } from 'utilities/requests';

const Account = () => {
  const links = [
    {
      li: { key: 'log_out' },
      a: {
        href: '#',
        onClick: userLogOut,
        title: 'Log out'
      },
      text: 'Log out'
    }
  ];
  return (
    <div>
      <Navbar
        links={ links }
        // logo={ defaultLogo }
        // logoTitle='Default Services'
        // logoLink='https://default.services'
        variant="navbar-right-underline alt-icons arrow-close"
      />
    </div>
  );
};

export default Account;