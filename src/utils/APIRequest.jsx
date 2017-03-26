/**
 * A wrapper class for XMLHttpRequest to bring it up to speed with ES6 promises
 *
 */

import $ from 'jquery';
import * as auth from './PersistentUser';


class APIRequest {
  constructor() {
    this.sportRadarAPI = 'Sports Radar API';
    this.sportRadarKey = '1234abc';

    // if (process.env.NODE_ENV === 'production') {
      this.leagueSpotAPI = 'http://ec2-52-25-225-99.us-west-2.compute.amazonaws.com:3000';
    // } else {
      // this.leagueSpotAPI = 'http://localhost:3000';
    // }
  }


  /**
   * Helper function to determine the URL for the desired API
   *
   * @param {string} api - which api to hit ('LeagueSpot', 'SportRadar')
   * @return {string} url
   */
  _constructUrl(api, ext) {
    let url;

    if (api === 'LeagueSpot') {
      url = this.leagueSpotAPI;
    }
    else if (api === 'SportRadar') {
      url = this.sportRadarAPI;
    }
    else {
      throw 'Invalid API specified in request';
    }

    url += ext;

    return url;
  }


  /**
   * A function that makes a POST request to the specified API
   *
   * @param {object} options
   *        {string} options.api - which API to make request to ('LeagueSpot', 'SportRadar')
   *        {object} options.data - the data to be passed in the request
   * @return {promise} - promise that will be resolved when request completed
   */
  post(options) {
    let that = this;
    return new Promise(function(resolve, reject) {
      //determine url for desired API
      let url = that._constructUrl(options.api, options.apiExt);
      if(!options.data) {
        options.data = {};
      }
      options.data.token = auth.getSessionId();

      $.post(url, options.data)
      .done( (data) => {
        // TODO: find a nicer way to handle invalid tokens
        // check for invalid token response
        if (data.message && data.message === 'Failed to authenticate token.') {
          auth.removeLoggedInUser();
          window.location.reload();
        }
        resolve(data);
      })
      .fail( (err) => {
        reject(err);
      });

    });
  }


  /**
   * A function that makes a GET request to the specified API
   *
   * @param {object} options
   *        {string} options.api - which API to make request to ('LeagueSpot', 'SportRadar')
   *        {object} options.data - the data to be passed in the request
   * @return {promise} - promise that will be resolved when request completed
   */
  get(options) {
    let that = this;
    return new Promise(function(resolve, reject) {
      //determine url for desired API
      let url = that._constructUrl(options.api, options.apiExt);
      if(!options.data) {
        options.data = {};
      }
      options.data.token = auth.getSessionId();

      $.get(url, options.data)
      .done( (data) => {
        // TODO: find a nicer way to handle invalid tokens
        // check for invalid token response
        if (data.message && data.message === 'Failed to authenticate token.') {
          auth.removeLoggedInUser();
          window.location.reload();
        }
        resolve(data);
      })
      .fail( (err) => {
        reject(err);
      });

    });
  }

}

const apiRequest = new APIRequest;
export default apiRequest;
