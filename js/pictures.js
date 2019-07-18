'use strict';

(function () {

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
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


  var Picture = function (data) {
    this.data = data;
    this.url = data.url;
    this.likes = data.likes;
    this.description = data.description;
    this.comments = data.comments;

    this.pictureElement = pictureTemplate.cloneNode(true);
  };

  Picture.prototype.create = function () {
    var img = this.pictureElement.querySelector('.picture__img');
    var likes = this.pictureElement.querySelector('.picture__likes');
    var comments = this.pictureElement.querySelector('.picture__comments');

    img.src = this.url;
    likes.textContent = this.likes;
    comments.textContent = String(this.comments.length);

    this.pictureElement.addEventListener('click', this.callRendering.bind(this));

    return this.pictureElement;
  };

  Picture.prototype.remove = function () {
    this.pictureElement.removeEventListener('click', this.callRendering);
    picturesContainer.removeChild(this.pictureElement);
  };

  Picture.prototype.callRendering = function () {
    window.renderFullScreenPhoto(this.data);
  };


  var errorHandler = function (errorMessage) {
    var messageContainer = document.createElement('div');
    messageContainer.textContent = errorMessage;
    messageContainer.classList.add('error-message');
    document.body.appendChild(messageContainer);
  };

  window.backend.getData(successHandler, errorHandler);

  window.Picture = Picture;
  window.renderPictures = renderPictures;
})();
