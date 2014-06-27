var parser = function(text){
  var tldr = text.toLowerCase().match(/tl\x3bdr [^\n]+|tl\x3b dr [^\n]+|tldr [^\n]+|tl dr [^\n]+/g);

  return tldr;
}

var list = [];

var findTextInDOM = function(node){
  node = node || document.body;
  
  for(var i = 0; i < node.children.length; i++){
    if(node.children.length){
      findTextInDOM(node.children[i]);
    }
    tldrs = parser(node.children[i].innerHTML);
    if(tldrs){
      for(var j = 0; j < tldrs.length; j++){
        list.push(tldrs[j]);
      }
    }
  }
}

findTextInDOM();

alert(list);
