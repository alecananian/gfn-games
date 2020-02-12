(function () {
  var ul = document.getElementById('links');
  var alerts = document.getElementById('alerts');

  var setError = function () {
    var alert = document.createElement('div');
    alert.className = 'alert alert-danger';
    alert.textContent = 'An error occurred while fetching the list of games';
    alerts.appendChild(alert);
  };

  var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      callback(xhr.status >= 400 && xhr.status < 600, xhr.response);
    };
    xhr.onerror = setError;
    xhr.send();
  };

  getJSON('https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json', function (err, data) {
    if (err) {
      setError();
    } else {
      var i, l = data.length;
      var li, a;
      for (i = 0; i < l; i++) {
        li = document.createElement('li');
        if (data[i].steamUrl) {
          a = document.createElement('a');
          a.href = data[i].steamUrl;
          a.rel = 'noopener noreferrer';
          a.target = '_blank';
          a.textContent = data[i].title;
          li.appendChild(a);
        } else {
          li.appendChild(document.createTextNode(data[i].title));
        }
        ul.appendChild(li);
      }
    }
  });
})();
