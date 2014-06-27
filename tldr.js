var parser = function(text, filter){
  filter = filter || 'tl;dr';
  var tldr = text.match(/tl;dr [^\n]+/g);

  return tldr;
}