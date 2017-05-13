function listenerId(id, func) {
  return document.getElementById(id).addEventListener('click', func);
}

function byId(id) {
  return document.getElementById(id);
}

function byClass(className) {
  return document.getElementsByClassName(className);
}

function qerSel(from, query) {
  return from.querySelector(query);
}

function parseDate(date) {
  if (date === 'NaN') return null;
  return Number(date);
}
