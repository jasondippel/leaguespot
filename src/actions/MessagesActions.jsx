/**
 * Functions used to handle inbox contents
 */

import APIRequest from '../utils/APIRequest';

/**
 * Given a list of invited leagues, this function creates a list of invite
 * messages and pushes them onto the messages list
 *
 * @param {array} invitedLeages - list of leagues the user is invited to
 */
function generateInviteMessages(invitedLeagues) {
  let messages = [];

  // generate messages
  invitedLeagues.map(function(league) {
    let newMessage = {};
    newMessage['type'] = 'fleagueInvite';
    newMessage['title'] = 'You\'ve been invited!';
    newMessage['body'] = 'Congrats! You\'ve been invited to join ' + league.fleague_name + '!';
    messages.push(newMessage);
  });

  return messages;
}


export function fetchInboxContents() {
  let that = this;

  return function(dispatch) {
    APIRequest.get({
      api: 'LeagueSpot',
      apiExt: '/fantasy_leagues/my_invited_leagues' // TODO: use proper endpoint to get inbox contents
    })
    .then((resp) => {
      if (resp.success) {
        dispatch({
          type: 'FETCH_INBOX_CONTENTS_FULFILLED',
          payload: {
            messages: generateInviteMessages(resp.leagues)
          }
        });
      } else {
        dispatch({
          type: 'FETCH_INBOX_CONTENTS_REJECTED',
          payload: {
            errorMessage: resp.message
          }
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: 'FETCH_INBOX_CONTENTS_ERROR',
        payload: {
          errorMessage: 'Error occurred while fetching inbox contents'
        }
      });
    });
  }
}
