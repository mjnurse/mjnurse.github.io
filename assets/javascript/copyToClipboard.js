/* eslint-disable require-jsdoc */
function copyToClipboard(text) {    
  const el = document.createElement("textarea");
  el.value = ('gvim C:/MJN/github/mjnurse-github-io/' + text).replace(/\//g, "\\");
  alert(el.value + ' copied to clipboard');
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
