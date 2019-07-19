'use strict';

(function () {

  var pictures = [];

  var createPictures = function (picturesData) {
    var fragment = document.createDocumentFragment();

    picturesData.forEach(function (pictureData, i) {

      pictures[i] = new window.Picture(pictureData);
      fragment.appendChild(pictures[i].create());

    });

    return fragment;
  };

  var renderPictures = function (picturesData) {

    var pictureContainer = document.querySelector('.pictures');
    var picturesWrap = pictureContainer.querySelectorAll('.picture');

    picturesWrap.forEach(function (pictureItem, i) {
      pictures[i].remove();
    });

    var fragment = createPictures(picturesData);

    pictureContainer.appendChild(fragment);

  };

  var successHandler = function (picturesData) {
    renderPictures(picturesData);
    window.filter(picturesData);
  };

  var errorHandler = function (errorMessage) {
    var messageContainer = document.createElement('div');
    messageContainer.textContent = errorMessage;
    messageContainer.classList.add('error-message');
    document.body.appendChild(messageContainer);
  };

  window.backend.getData(successHandler, errorHandler);

  window.renderPictures = renderPictures;
})();
