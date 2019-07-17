'use strict';

(function () {
  var fullScreenModal = new window.Modal('.big-picture');
  var modalContainer = document.querySelector('.big-picture');
  var photo = modalContainer.querySelector('.big-picture__img img');
  var description = modalContainer.querySelector('.social__caption');
  var likes = modalContainer.querySelector('.likes-count');
  var commentsCount = modalContainer.querySelector('.social__comment-count');
  var commentsLoader = modalContainer.querySelector('.comments-loader');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsContainer = modalContainer.querySelector('.social__comments');

  commentsCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');

  var renderPhoto = function (picture) {
    photo.src = picture.url;
    description.textContent = picture.description;
    likes.textContent = picture.likes;
    renderComments(picture.comments);
    fullScreenModal.open();
  };

  var renderComments = function (commentsData) {

    var comments = commentsContainer.querySelectorAll('.social__comment');
    var fragment = document.createDocumentFragment();


    comments.forEach(function (comment) {
      commentsContainer.removeChild(comment);
    });

    commentsData.forEach(function (comment) {
      var commentClone = createComment(comment);
      fragment.appendChild(commentClone);
    });

    commentsContainer.appendChild(fragment);
  };

  var createComment = function (comment) {
    var commentClone = commentTemplate.cloneNode(true);
    var img = commentClone.querySelector('.social__picture');
    var text = commentClone.querySelector('.social__text');
    img.src = comment.avatar;
    text.textContent = comment.message;

    return commentClone;
  };

  window.renderFullScreenPhoto = renderPhoto;
})();
