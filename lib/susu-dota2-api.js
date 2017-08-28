"use strict";

let   url_default = 'https://api.steampowered.com/';

require('isomorphic-fetch');

function getSum(num_1, num_2) {
  let distance = num_1.length - num_2.length;
  let len = (distance > 0)? num_1.length:num_2.length;
  let res = [], temp = '', carry = 0;

  if(distance > 0){
       for(let i = 0; i < distance; i++){
           num_2 = '0'+ num_2;
       }
   }else{
       for(let i = 0; i < Math.abs(distance); i++){
           num_1 = '0'+ num_1;
       }
   }
   for(let i = len - 1; i >= 0; i--){
         temp = parseInt(num_1[i]) + parseInt(num_2[i]) + carry;
         if(temp >= 10){
             carry = 1;
             res.push(parseInt(temp)-10);
             console.log('进位',res);
         }else{
             carry = 0;
             res.push(temp);
             console.log('无进位',res);
         }

  }
  res = res.reverse().join('').replace(/^0/,'');
  return res;
}

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
  // steam id is different from account id in dota2 game
  let num_1 = '076561197960265728';
  let num_2 = '0' + options.steamids;
  let res = getSum(num_1, num_2);
  console.log(res);
  options.steamids = res.toString();
  return this._request(path, options, keyOptions);
}

module.exports = DotaTwoWebApi;
