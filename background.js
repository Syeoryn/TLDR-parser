chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.sendMessage(tab.id, {
    findAll: true
  });
});