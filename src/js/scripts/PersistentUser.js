/**
 * This file provides basic javascript functions for checking whether
 * or not a user is currently logged in.
 */

let LeagueSpotUsernameKey = "LeagueSpot-active-user-name";
let LeagueSpotUserEmailKey = "LeagueSpot-active-user-email";

export function loggedIn () {
 let user = localStorage.getItem(LeagueSpotUsernameKey);
 return user !== null;
}

export function getLoggedInUser () {
 return localStorage.getItem(LeagueSpotUsernameKey);
}

export function getLoggedInUserEmail () {
 return localStorage.getItem(LeagueSpotUserEmailKey);
}

export function setLoggedInUser (username, email) {
 localStorage.setItem(LeagueSpotUsernameKey, username);
 localStorage.setItem(LeagueSpotUserEmailKey, email);
}

export function removeLoggedInUser () {
 localStorage.removeItem(LeagueSpotUsernameKey);
}
