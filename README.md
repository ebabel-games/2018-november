# 2018 November
[![Build Status](https://travis-ci.org/ebabel-games/2018-november.svg?branch=master)](https://travis-ci.org/ebabel-games/2018-november) [![dependencies Status](https://david-dm.org/ebabel-games/2018-november.svg)](https://david-dm.org/ebabel-games/2018-november.svg)

Game fully developed in just one month, from beginning to end.

![Screenshot of gameplay](assets/screenshots/2018-11-12-2325.png)

### Requirements
We need [Node.js](https://nodejs.org) to install and run scripts.

## Install and run
Run next commands in your terminal:

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies.|
| `npm test` | Lint the source code and run all automated tests.|
| `npm run build` | One-off build of the game.|
| `npm run watch` | Continuously build the game during development.|
| `npm start` | Build bundle and run game on localhost:8080. <br> Press `Ctrl + c` to kill **http-server** process. |

Browse to http://localhost:8080 to play the game.

## Test localhost on a touch device
- [Check your local IP](https://www.whatismyip.com/) on your network (it should start with 192.168.).
- Put your touch device on the same network as your development machine (same Wifi for eample).
- Add the port :8080 to the IP.
- You should now be able to test the game running on your machine with your touch device.

## Switch the debug mode on or off
By default, debug mode is off. To switch it on, run in Javascript console of your browser:
```
localStorage['debug'] = true;
```
