// import { app } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './App.global.css';

import icon from '../assets/icon.svg';

const customTitlebar = require('custom-electron-titlebar');

// implement different color titlebar for unpackaged mode

let backgroundColor: string;
if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  backgroundColor = customTitlebar.Color.fromHex('#ffc107');
} else {
  backgroundColor = customTitlebar.Color.fromHex('#343a40');
}

window.addEventListener('DOMContentLoaded', () => {
  console.log(process.env.NODE_ENV);
  // eslint-disable-next-line no-new
  new customTitlebar.Titlebar({
    backgroundColor,
    icon,
    unfocusEffect: false,
  });

  const replaceText = (selector: any, text: any) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

render(<App />, document.getElementById('root'));
