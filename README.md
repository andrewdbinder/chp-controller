# CHP Lighting Controller

Electron-based user-interface to control the [chp-lighting](https://github.com/andrewdbinder/chp-lighting) library over serial connections.

<img src="https://i.imgur.com/NmF2aXj.png" width="100%"/>

## Setup

Since a required dependency is hosted in another repository (as opposed to npm), some additional setup is needed before installing packages.

A GitHub user token is required for yarn to download [chp-lights-module](https://github.com/andrewdbinder/chp-lights-module).
Follow the instructions [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) to generate a token,
and put it in a local `.npmrc` file with the entry `//npm.pkg.github.com/:_authToken=TOKEN`.

Then, run `yarn install` to install packages, and `yarn start` to run locally.
