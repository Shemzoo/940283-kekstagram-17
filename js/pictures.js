'use strict';

(function () {

  var renderPictures = function (picturesData) {

    var pictureContainer = document.querySelector('.pictures');
    var pictures = pictureContainer.querySelectorAll('.picture');
    var fragment = createPictures(picturesData);

    pictures.forEach(function (picture) {
      pictureContainer.removeChild(picture);
    });

    pictureContainer.appendChild(fragment);

  };

  var createPictures = function (pictures) {

    var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment = renderPicture(fragment, pictureTemplate, pictures[i]);
    }

    return fragment;

  };

  var renderPicture = function (fragment, template, picture) {

    var pictureClone = template.cloneNode(true);
    var img = pictureClone.querySelector('.picture__img');
    var likes = pictureClone.querySelector('.picture__likes');
    var comments = pictureClone.querySelector('.picture__comments');

    img.src = picture.url;

    likes.textContent = picture.likes;

    comments.textContent = String(picture.comments.length);

    fragment.appendChild(pictureClone);

    return fragment;
  };

  var successHandler = function (pictures) {
    renderPictures(window.filter(pictures));
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
