function Traverser() {
};

Traverser.prototype.options = function(elements, selector) {
  var type = "elem";
  if(selector[0] === '#' || selector[0] ==='.') type = selector[0];
  this.finders = {
    ".": this.classFinder(elements, selector.slice(1)),
    "#": this.idFinder(elements, selector.slice(1)),
    "elem": this.elFinder(elements, selector)
  }[type];
};

Traverser.prototype.elFinder = function(elements, selector) {
  var selector = selector.split('.');
  var items = document.getElementsByTagName(selector[0]);
  if(selector[1] && items.length > 1) 
    return this.classFinder(elements, selector[1].split('#')[0], items)
  this.addEl(elements, items);
};

Traverser.prototype.classFinder = function(elements, selector, filter) {
  var items = [];
  if(filter) {
    for(var i = 0; i < filter.length; i++)
      if(filter[i].getAttribute('class')) {
        if(filter[i].classList.contains(selector)) {
          elements.push(filter[i]);
      }
    }
  }
  else {
    items = document.getElementsByClassName(selector); 
    this.addEl(elements, items, filter);
  }
};

Traverser.prototype.idFinder = function(elements, selector) {
  var item = document.getElementById(selector);
  if(item && item.id) console.log(item.id);
  if(item) elements.push(item);
};

Traverser.prototype.addEl = function(elements, selectors, filter) {
  var filter = filter || elements;
  if(selectors)
  for(var i = 0; i < selectors.length; i++)
    // if(filter.indexOf(selectors[i] > -1)) 
      elements.push(selectors[i]);
};


var traverser = new Traverser();

var $ = function (selector) {
  var elements = [];
  traverser.options(elements, selector);
  return elements;
}