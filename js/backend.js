'use strict';

(function () {
  var TIMEOUT_10_SEC = 10000;
  var RESPONSE_STATUS = 200;

  var Data = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      createRequest('GET', URL, onSuccess, onError);
    },

    save: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram';
      createRequest('POST', URL, onSuccess, onError, data);
    }
  };

  var createRequest = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === RESPONSE_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_10_SEC;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.Data = Data;
})();
