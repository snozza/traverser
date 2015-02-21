function Traverser() {
};

Traverser.prototype.parser = function(elems, select) {
  if(select[0].match(/[^\.#]/)) return this.elFinder(elems, select.split(/\.|#/));
  return this.idClassFinder(elems, select.slice(1));
};

Traverser.prototype.elFinder = function(elems, select) {
  if(select.length === 1)
    return this.addEl(elems, document.getElementsByTagName(select[0]));
  this.findFilter(elems, select, document.getElementsByTagName(select[0]));
};

Traverser.prototype.findFilter = function(elems, select, elemList) {
  for (var i=0; i < elemList.length; i++)
    if(elemList[i].classList.contains(select[1]) || elemList[i].id == select[1])
      this.addEl(elems, [elemList[i]]);     
};

Traverser.prototype.idClassFinder = function(elems, select) {
  var item = [document.getElementById(select)] 
  if(!item[0]) item = document.getElementsByClassName(select);
  this.addEl(elems, item);
};

Traverser.prototype.addEl = function(elems, selects) {
  for(var i = 0; i < selects.length; i++)
    elems.push(selects[i]);
};

var $ = function (select) {
  var elements = [];
  new Traverser().parser(elements, select);
  return elements;
}