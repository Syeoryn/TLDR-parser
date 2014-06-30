var parser = function(text){
  text = text.replace(/<.+>/g, '');
  var tldr = text.toLowerCase().match(/tl\x3bdr[^\n]+|tl\x3b dr[^\n]+|tldr[^\n]+|tl dr[^\n]+/g);
  return tldr;
}

var findTextOnPage = function(node){
  node = node || document.body;
  var list = [];
   
  tldrs = parser(document.body.innerText);
  if(tldrs){
    for(var j = 0; j < tldrs.length; j++){
      list.push(tldrs[j]);
    }
  }
  return list;
}

var findAll = function(){
  var list =findTextOnPage();
  var message = '';
  for(var i = 0; i < list.length; i++){
    message += list[i] + '\n\n'
  }
  alert(message);
}

findAll();
