'use strict';

window.backend = (function () {

  return {
    getData: function (onSuccess, onError) {

      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      var timeout = 10000;
      var status = 200;

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === status) {
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

      xhr.timeout = timeout;

      xhr.open('GET', URL);
      xhr.send();

    }

  };

})();
