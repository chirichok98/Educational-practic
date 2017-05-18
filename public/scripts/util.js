function listenerId(id, func) {
  return document.getElementById(id).addEventListener('click', func);
}

function byId(id) {
  return document.getElementById(id);
}

function byClass(className) {
  return document.getElementsByClassName(className);
}

function byTagName(tagName) {
  return document.getElementsByTagName(tagName);
}

function qerSel(from, query) {
  return from.querySelector(query);
}

function display(field, option) {
  const NONE = 'display-none';
  field.classList.toggle(NONE, option);
}
