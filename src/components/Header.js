import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link to="/">
        <a className="item">SmartCreditSystem</a>
      </Link>

      <Menu.Menu position="right">
        <Link to="/">
          <a className="item">Home</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
