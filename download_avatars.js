var request = require('request');
var token = require('./secret.js').GITHUB_TOKEN;

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token' + token
  }
};

  request(options, function(err, res, body) {
    body = JSON.parse(body);
    cb(err, body);
    });
    // console.log(repo);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
    result.forEach(function(repo) {
      console.log(repo.avatar_url);
  });

});

console.log('Welcome to the GitHub Avatar Downloader!');