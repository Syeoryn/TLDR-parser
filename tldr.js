var parser = function(text, filter){
  filter = filter || 'tl;dr';
  var tldr = text.match(/tl;dr \w+/g);

  return tldr;
}