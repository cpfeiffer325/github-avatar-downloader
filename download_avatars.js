var request = require('request');
var token = require('./secret.js').GITHUB_TOKEN;
var fs = require('fs');
var https = require('https');
var terminalArgs = process.argv;
var argOne = terminalArgs[2];
var argTwo = terminalArgs[3];

// collects urls, parses them into an object. Finally calls the download function which will populate all the jpegs into a folder
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token' + token
  }
};
  request(options, function(err, res, body) {
    var array = JSON.parse(body);
    // create condition to check for sufficient arguments
    if(terminalArgs.length !== 4) {
        console.log("Not enough arguments!!!! You require two inputs");
      } else {
      // iterate through the urls and call function to import avatar images
      array.forEach(function(repo) {
        downloadImageByURL(repo.avatar_url, `avatars/${repo.login}.jpeg`);
      });
      cb(err, body);
    }
  });
}

// build function to be called that utilizes the urls requested from the github page and then pulls the jpegs into a folder
function downloadImageByURL(url, filepath) {
  request.get(url)
    .on('error', function (err) {
        throw err;
    })
    .on('response', function (response) {
      console.log('Downloading image...');
      console.log(`
      Response Status Code: ${response.statusCode}
      Response Status Message: ${response.statusMessage}
      Response Headers: ${response.headers['content-type']}
      `);
    })
    .on('end', function  () {
      console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filepath));
}

getRepoContributors(argOne, argTwo, function(err, result) {

});

console.log('Welcome to the GitHub Avatar Downloader!');