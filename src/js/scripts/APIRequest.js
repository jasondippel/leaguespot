/**
 * A wrapper class for XMLHttpRequest to bring it up to speed with ES6 promises
 *
 */


export default class APIRequest {
  constructor() {
    this.sportRadarAPI = "Sports Radar API";
    this.sportRadarKey = "1234abc";
    this.leagueSpotAPI = "http://localhost:3000";
  }


  /**
   * Helper function to determine the URL for the desired API
   *
   * @param {string} api - which api to hit ("LeagueSpot", "SportRadar")
   * @return {string} url
   */
  _constructUrl(api, ext) {
    let url;

    if (api === "LeagueSpot") {
      url = this.leagueSpotAPI;
    }
    else if (api === "SportRadar") {
      url = this.sportRadarAPI;
    }
    else {
      throw "Invalid API specified in request";
    }

    url += ext;

    return url;
  }


  /**
   * A function that makes a POST request to the specified API
   *
   * @param {object} options
   *        {string} options.api - which API to make request to ("LeagueSpot", "SportRadar")
   *        {object} options.data - the data to be passed in the request
   * @return {promise} - ajax request promise that will be resolved when request completed
   */
  post(options) {
    let that = this;
    return new Promise(function(resolve, reject) {
      // create request, determine url for desired API
      let req = new XMLHttpRequest();
      let url = that._constructUrl(options.api, options.apiExt);

      // open request
      req.open('POST', url, true);

      // construct data
      let params = JSON.stringify(options.data);

      req.onload = function() {
        if (req.status == 200) {
          // resolve promise with response
          resolve(req.response);
        }
        else {
          // reject with error
          reject(Error(req.statusText));
        }
      };

      // handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };

      // make the request
      req.send(params);
    });
  }

}
