var request = require('request');
var token = require('./secret.js').GITHUB_TOKEN;
var fs = require('fs');
var https = require('https');

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

function downloadImageByURL(url, filepath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log(`
      Response Status Code: ${response.statusCode}
      Response Status Message: ${response.statusMessage}
      Response Headers: ${response.headers['content-type']}
      `);
      console.log('Downloading image...');
    })
    .on('end', function  () {
      console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filepath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
    result.forEach(function(repo) {
      console.log(repo.avatar_url);
  });

});

console.log('Welcome to the GitHub Avatar Downloader!');
downloadImageByURL('https://avatars0.githubusercontent.com/u/1615?v=4', 'avatars/new_person.jpg');