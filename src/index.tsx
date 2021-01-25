// import { app } from 'electron';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './App.global.css';

import icon from '../assets/icon.svg';

const customTitlebar = require('custom-electron-titlebar');

// TODO: implement different color titlebar for unpackaged mode
// const RESOURCES_PATH = app.isPackaged
//   ? path.join(process.resourcesPath, 'resources')
//   : path.join(__dirname, '../assets');
//
// const getAssetPath = (...paths: string[]): string => {
//   return path.join(RESOURCES_PATH, ...paths);
// };

window.addEventListener('DOMContentLoaded', () => {
  new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#343a40'),
    icon,
    unfocusEffect: false,
  });

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

render(<App />, document.getElementById('root'));
