require("dotenv").config();
const keys = require("./keys.js");
const fs = require('fs');
const Twitter = require('twitter');
const client = new Twitter(keys.twitter);

let tweetGet = function() {
  return client.get('statuses/user_timeline', {screen_name: 'taylorswift13', count: 20}, function(error, tweets) {
    if (!error) {
      let resultArr = ["I don't like twitter. This is the first twitter account I've ever made, and I'm not going to post more than these few test tweets. But it would still work if I had more. This pulls up to 20 from your own account, using your twitter keys in .env", "Seriously. They are actively, not passively, damaging the country by providing a soapbox for a wannabe dictator. Regardless of how cool their technology or their platform is, using Twitter is saying that is all okay."];
      for (var i = 0; i < tweets.length; i++) {
        resultArr.push(`${tweets[i].user.screen_name} - (${tweets[i].created_at}):  ${tweets[i].text}`)
      }
      fs.appendFileSync('./log.txt', JSON.stringify([process.argv[2],resultArr], null, 2), 'utf8');
      return console.log(JSON.stringify(resultArr, null, 2));
    }
  })
};

exports.tweetGet = tweetGet;
