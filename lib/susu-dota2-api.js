"use strict";

let   url_default = 'https://api.steampowered.com/';

require('isomorphic-fetch');

function DotaTwoWebApi (key) {
  if (!key) {
    throw new TypeError('Required steam api key from http://steamcommunity.com/dev/apikey');
  }
  this.key = key;
}

DotaTwoWebApi.create      = function(key){
  return new DotaTwoWebApi(key);
};

DotaTwoWebApi.prototype._request = function(path, options, keyOptions) {
  let url               =   url_default + path + '/?key=' + this.key + '&' + keyOptions + '=' + options[keyOptions];
  let requestParams     =   {};

  requestParams.method  =   'Get';
  requestParams.mode    =   'no-cors';
  requestParams.cache   =   'default';

  return fetch(url, requestParams).then(res => res.json());
}

/* get the match details function */
DotaTwoWebApi.prototype.getMatchDetails = function(options) {
  let path = 'IDOTA2Match_570/GetMatchDetails/V001';
  let keyOptions = 'match_id';
  
  return this._request(path, options, keyOptions);
};
/* get the player summaries function */
DotaTwoWebApi.prototype.getPlayerSummaries = function(options) {
  let path = 'ISteamUser/GetPlayerSummaries/v0002';
  let keyOptions = 'steamids';

  return this._request(path, options, keyOptions);
}

module.exports = DotaTwoWebApi;
