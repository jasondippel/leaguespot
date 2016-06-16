/**
 * A wrapper class for XMLHttpRequest to bring it up to speed with ES6 promises
 *
 */

 // $.post('http://localhost:3000/login', {
 //   email: "leaguespot.team@gmail.com",
 //   password: "asdf"
 // }, function(res) {
 //   console.log(res);
 // })

import $ from "jquery";


class APIRequest {
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
      //determine url for desired API
      let url = that._constructUrl(options.api, options.apiExt);

      $.post(url, options.data)
      .success( (data) => {
        console.log("post success");
        resolve(data);
      })
      .fail( (err) => {
        console.log("post fail");
        reject(err);
      });

    });
  }

}

const apiRequest = new APIRequest;
export default apiRequest;
