/**
 * This file provides basic javascript functions for checking whether
 * or not a user is currently logged in.
 */
 let LeagueSpotUsernameKey = "LeagueSpot-active-user"

 export function loggedIn () {
   let user = localStorage.getItem(LeagueSpotUsernameKey);
   return user !== null;
 }

 export function getLoggedInUser () {
   return localStorage.getItem(LeagueSpotUsernameKey);
 }

 export function setLoggedInUser (username) {
   localStorage.setItem(LeagueSpotUsernameKey, username);
 }

 export function removeLoggedInUser () {
   localStorage.removeItem(LeagueSpotUsernameKey);
 }
