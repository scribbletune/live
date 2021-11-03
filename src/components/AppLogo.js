/* eslint-disable react/jsx-no-bind */ // TODO: Fix arrow function props
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './AppLogo.css';

import { ReactComponent as AppLogoIcon } from '../logo/logo-live.svg';
// import { ReactComponent as AppLogoIcon } from '../logo/logo-only.svg';

function AppLogo({ onClick, appInfo }) {
  return (
    <Navbar.Brand href="#home" onClick={onClick}>
      <AppLogoIcon className="d-inline-block" aria-labelledby="Logo" alt={appInfo.name} fill="#fff" />
      <span>{appInfo.name}</span>
    </Navbar.Brand>
  );
}

export default AppLogo;
