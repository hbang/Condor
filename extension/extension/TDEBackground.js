// TDEBackground.js
// Copyright (c) 2015 Dangered Wolf

if (window.chrome) {
  chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return { redirectUrl: chrome.extension.getURL("resources/favicon.ico") };
  }, {
    urls: [ "https://ton.twimg.com/tweetdeck-web/web/assets/logos/favicon.*.ico" ]
  }, [ "requestBody", "blocking" ]);
}
