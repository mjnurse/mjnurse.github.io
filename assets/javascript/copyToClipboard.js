/* eslint-disable require-jsdoc */

// eslint-disable-next-line no-unused-vars
function copyPageNameToClipboard(text) {
  const el = document.createElement('textarea');
  el.value =
    ('gvim C:/MJN/github/mjnurse-github-io/' + text).replace(/\//g, '\\');
  alert(el.value + ' copied to clipboard');
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

// eslint-disable-next-line no-unused-vars
function copyToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  alert(el.value + ' copied to clipboard');
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

