var findTldrs = function(){
  node = document.body;
  var list = [];
  var text = node.innerText;
  tldrs = text.toLowerCase().match(/tl\x3bdr[^\n]+|tl\x3b dr[^\n]+|tldr[^\n]+|tl dr[^\n]+/g)
  return tldrs;
}

var createMessage = function(){
  var tldrs =findTldrs();
  var message = '';
  if(tldrs){
    for(var i = 0; i < tldrs.length; i++){
      if(tldrs[i].length > 5){
        message += tldrs[i] + '\n\n'
      }
    }
  } else {
    message = "No tl;drs!";
  }
  return message;
}

var makePopup = function(message){
  var node = document.createElement('div');
  node.className = 'tldr';
  node.innerText = message;
  node.style.width = '300px';
  node.style.position = 'fixed';
  node.style.height = '500px';
  node.style.top = '0';
  node.style.right = '0';
  node.style['background-color'] = '#AAAAAA';
  node.style.overflow = 'hidden';
  node.style['z-index'] = 9001;
  node.style.opacity = 0.9;
  node.style['font-size'] = '12px'
  return node;
}

var removePopup = function(node){
  node.style.opacity -= .001;
  if(node.style.opacity <= .005){
    document.body.removeChild(node);
    poppedUp = false;
  } else {
    setTimeout(function(){
      removePopup(node)
    }, 5);
  }
}

var popup = function(){
  if(!poppedUp){
    var message = createMessage();
    var popup = makePopup(message);
    var time = 5000;
    if(message === 'No tl;drs!') time = 1000;
    document.body.appendChild(popup);
    poppedUp = true;
    setTimeout(function(){removePopup(popup)}, time); 
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  popup();
});

var poppedUp = false;
popup();