var findTldrs = function(){
  node = document.body;
  var list = [];
  var text = node.innerText;
  tldrs = text.toLowerCase().match(/tl\x3bdr[^\n]+|tl\x3b dr[^\n]+|tldr[^\n]+|tl dr[^\n]+/g)
  return tldrs;
}

var findAll = function(){
  var list =findTextOnPage();
  var message = '';
  for(var i = 0; i < list.length; i++){
    message += list[i] + '\n\n'
  }
  if(!message) message = "No tl;drs!";

  return message;
}

var makePopup = function(){
  var node = document.createElement('div');
  node.className = 'tldr';
  node.innerText = message;
  node.style.width = '300px';
  node.style.position = 'fixed';
  node.style.height = '500px';
  node.style.top = '0';
  node.style.right = '0';
  node.style['background-color'] = 'red';
  node.style.overflow = 'hidden';
  node.style['z-index'] = 9001;
  document.body.appendChild(node);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.findAll){
    findAll();
  }
});
