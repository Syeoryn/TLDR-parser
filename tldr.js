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
  node.style['width'] = '300px';
  node.style['position'] = 'fixed';
  node.style['top'] = '0';
  node.style['right'] = '0';
  node.style['background-color'] = '#C34FF1';
  node.style['overflow'] = 'hidden';
  node.style['z-index'] = 9001;
  node.style['opacity'] = 0.9;
  node.style['font-size'] = '12px'
  return node;
}

var removePopup = function(node, step){
  step = step || .001;
  node.style['opacity'] -= step;
  if(node.style['opacity'] <= .01){
    document.body.removeChild(node);
    poppedUp = false;
  } else {
    setTimeout(function(){
      removePopup(node, step)
    }, 5);
  }
}

var popup = function(showIfNoTldrs){
  if(poppedUp) return;
  var message = createMessage();
  var popup = makePopup(message);
  var time = 4000;
  var step = .001;
  if(message === 'No tl;drs!'){
    if(!showIfNoTldrs) return;
    time = 1000;
    step = .01;
  }
  document.body.appendChild(popup);
  poppedUp = true;
  setTimeout(function(){removePopup(popup, step)}, time);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  popup(true);
});

var poppedUp = false;
popup();