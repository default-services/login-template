import { Button } from '@default-services/components';
import React from 'react';
import { userLogOut } from 'utilities/requests';

const Account = () => {
  return (
    <div>
      <h1>Hello!</h1>
      <Button onClick={ userLogOut }>Log out</Button>
    </div>
  );
};

export default Account;