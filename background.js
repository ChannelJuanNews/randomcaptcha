chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({hide: true}, function() {
      console.log("Hide image is on");
    });
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher()],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

chrome.runtime.onMessage.addListener(function(url, sender, onSuccess) {
  fetch(url).then( response => response.json()).then( response => onSuccess(response))
  return true 
})