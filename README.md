# dota2-web-api

## Install

```bash
npm install susu-dota2-api
```
Before the example, you should apply a steam key to use these APIs.

## Example
```javascript
const DotaTwoWebApi = require('susu-dota2-api');

const dota2Api = DotaTwoWebApi.create('steam key');

const options = {match_id : '123456789'}; // id is an example which is not true

dota2Api.getMatchDetails(options).then(res=>console.log(res));
```
## the functions

* getMatchDetails({match_id:'123456789'})
* getPlayerSummaries({account_id:'123456789'})

### todo next
* getMatchHistory API
### todo in future
other APIs of dota2 or steam
