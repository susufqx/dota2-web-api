const dota2api  = require('../lib/susu-dota2-api');
const da        = dota2api.create('F3B2BA2DF342DA3C24A13D6D943C6BF9');

const options   = {match_id : '3402763789'};
da.getMatchDetails(options)
  .then(res=>console.log(res));
