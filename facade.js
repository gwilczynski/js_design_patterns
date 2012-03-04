function addEvent(element, type, func){
  if(window.addEventListener){
    element.addEventListener(type, func, false);
  } else if (window.attachEvent) {
    element.attachEvent('on' + type, func);
  } else {
    element['on' + type] = func;
  }
}