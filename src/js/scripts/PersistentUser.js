/**
 * This file provides basic javascript functions for checking whether
 * or not a user is currently logged in.
 */

let LeagueSpotUserFirstNameKey = "LeagueSpot-active-user-first-name";
let LeagueSpotUserLastNameKey = "LeagueSpot-active-user-last-name";
let LeagueSpotUserEmailKey = "LeagueSpot-active-user-email";

export function loggedIn () {
 let user = localStorage.getItem(LeagueSpotUserFirstNameKey);
 return user !== null;
}

export function getLoggedInUserFirstName () {
 return localStorage.getItem(LeagueSpotUserFirstNameKey);
}

export function getLoggedInUserFullName () {
 return localStorage.getItem(LeagueSpotUserFirstNameKey) + " " + localStorage.getItem(LeagueSpotUserLastNameKey);
}

export function getLoggedInUserEmail () {
 return localStorage.getItem(LeagueSpotUserEmailKey);
}

export function setLoggedInUser (firstName, lastName, email) {
 localStorage.setItem(LeagueSpotUserFirstNameKey, firstName);
 localStorage.setItem(LeagueSpotUserLastNameKey, lastName);
 localStorage.setItem(LeagueSpotUserEmailKey, email);
}

export function removeLoggedInUser () {
 localStorage.removeItem(LeagueSpotUserFirstNameKey);
}
