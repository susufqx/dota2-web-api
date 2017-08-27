"use strict";

let   url_default = 'https://api.steampowered.com/';
const request     = require('request');


require('isomorphic-fetch');

function DotaTwoWebApi (key) {
  if (!key) {
    throw new TypeError('Required steam api key from http://steamcommunity.com/dev/apikey');
  }
  this.key = key;
}

DotaTwoWebApi.url_default = url_default;
DotaTwoWebApi.create      = function(key){
  return new DotaTwoWebApi(key);
};

DotaTwoWebApi.prototype.getMatchDetails = function(options) {
  let path = 'IDOTA2Match_570/GetMatchDetails/V001';
  let keyOptions = 'match_id';
  return this._request(path, options, keyOptions);
};

DotaTwoWebApi.prototype._request = function(path, options, keyOptions) {
  let url               =   path + '/?key=' + this.key + '&' + keyOptions + '=' + options[keyOptions];
  let requestParams     =   {};

  requestParams.method  =   'Get';
  requestParams.mode    =   'no-cors';
  requestParams.cache   =   'default';

  fetch(url, requestParams).then(res => res.json());
}
/*
fetch(url, {
  method: 'GET',
  mode: 'no-cors',
  cache: 'default'
}).then(function(res){
  return res.json();
}).then(function(data){
  console.log(data.response);
}).catch(function(e) {
  console.log("Oops, error");
});*/

module.exports = DotaTwoWebApi;
