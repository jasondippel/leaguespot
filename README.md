# LeagueSpot
The web application for Team 13's FYDP project for the Software Engineering class of 2017. It is a service that allows for the creation of Fantasy leagues that includes players from multiple sports leagues, male or female.

## Setup
1. Clone this repository
2. Run `npm install` and `npm install -s jquery`
3. Run `webpack`. If you see a message saying `command not found: webpack`, you must first run `npm install -g webpack`.
4. Open up the `index.html` file in your browser
5. In order for any calls to the backend to work, you must have the [server](https://github.com/xKTSE/leaguespot-server) running.

## Folder Layout
The majority of the folders are kept under `src`, with the exception of `package.json`, `webpack.config.json`, and the generated `prod` folder from running webpack. These files likely won't need manual editing very often and as such, should not be touched without consulting all group members.

Within the `src` folder, we have a `js` and `css` folder where each contains their respective type of code, separated into logical files depending on what component/page the files affect. You will also find the `index.html` file which is the only html file and the main entry file of the web application.

When committing, please make sure you only commit necessary files. If you add garbage to this repo, clean it up.

## Resources
https://github.com/reactjs/react-router-tutorial/tree/master/lessons/01-setting-up
