javascript:(function() {
  function saveAs(blob, name) {
    let a = document.createElement("a");
    //
    a.download = name;
    a.innerHTML = "Save File";
    if (window["webkitURL"] !== null) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      a.href = window["webkitURL"].createObjectURL(blob);
    } else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      a.href = window.URL.createObjectURL(blob);
      a.addEventListener('click', function(event) {
        if (event.target.parentNode) {
          event.target.parentNode.removeChild(event.target);
        }
      });
      a.style.display = "none";
      document.body.appendChild(a);
    }
    a.click();
  }
  fetch(document.querySelectorAll('link[rel="stylesheet"]')[0].href.replace(/\.css$/, ".js")).then(res => res.text()).then(txt => {
    let i = txt.indexOf(',["') + 1,
      j = i && (txt.indexOf(']', i) + 1),
      a = j && txt.substring(i, j),
      k = j && (txt.indexOf('=["', j) + 1),
      m = k && (txt.indexOf(']', k) + 1),
      b = m && txt.substring(k, m);
    return b && `{"Ma":${a},"Oa":${b}}`;
  }).then(data => new Blob([data], {
    type: 'application/json'
  })).then(blob => saveAs(blob, "data.json"))
})();