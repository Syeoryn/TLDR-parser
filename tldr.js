var parser = function(text){
  var tldr = text.toLowerCase().match(/tl\x3bdr[^<]+|tl\x3b dr[^<]+|tldr[^<]+|tl dr[^<]+/g);

  return tldr;
}

var list = [];

var findTextInDOM = function(node){
  node = node || document.body;
  
  for(var i = 0; i < node.children.length; i++){
    if(node.children[i].length){
      findTextInDOM(node.children[i]);
    } else {
      tldrs = parser(node.children[i].innerHTML);
      if(tldrs){
        for(var j = 0; j < tldrs.length; j++){
          list.push(tldrs[j]);
        }
      }
      
    }
  }
}

var findAll = function(){
  findTextInDOM();
  message = ''
  for (var i = 0; i < list.length; i++){
    message += list[i] + '\n\n'
  }
  alert(message);
}

findAll();
