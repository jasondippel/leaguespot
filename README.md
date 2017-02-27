# LeagueSpot
The web application for Team 13's FYDP project for the Software Engineering class of 2017. It is a service that allows for the creation of Fantasy leagues that includes players from multiple sports leagues, male or female.

## Setup
1. Clone this repository
2. Run `npm install`
3. Run `webpack`. If you see a message saying `command not found: webpack`, you must first run `npm install -g webpack`.
4. Open up the `index.html` file in your browser
5. In order for any calls to the backend to work, you must have the [server](https://github.com/xKTSE/leaguespot-server) running.

## Dev Setup
1. Run `npm install` and ensure `webpack` works (see above setup for trouble shooting)
2. Run `npm run dev`
3. Visit http://localhost:8080

## Testing
TODO

## Folder Layout
The majority of the folders are kept under `src`, with the exception of `package.json`, `webpack.config.json`, and the generated `prod` folder. These files likely won't need manual editing very often and as such, should not be touched without consulting the owner of this repo.

Within the `src` folder, we have various javascript files. Each contains their respective type of code, separated into logical folders depending on what component/page it affects. Most javascript files should have an accompanying LESS file that contains any styling specific to it.

## Running in Production
Getting this website up and running in production is very simple. Once this repo is put on the server, you can run `npm run build` to build the necessary javascript and css files. Once this is done, you can simply access `index.html` to access the website.

## Committing Procedure
> Note: When committing, please make sure you only commit necessary files. If you add garbage to this repo, please clean it up.

Work that you do should be done on a branch. When ready to merge, create a pull request and DO NOT merge until you get a :+1: from the owner of this repo.
