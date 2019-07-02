'use strict';

(function () {
  var PHOTOS_AMOUNT = 25; // Количество фотографий

  var photoListElement = document.querySelector('.pictures'); // Находим тег, внутрь которого будем вставлять данные из template'а
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // Находим нужный шаблон
  var fragment = document.createDocumentFragment(); // Создаем documentFragment

  var addPhotos = function (photos) { // Функция для добавления

    var photoElement = userPictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photos.url; // Меняем ссылку
    photoElement.querySelector('.picture__likes').textContent = photos.likes; // Записываем лайки
    photoElement.querySelector('.picture__comments').textContent = photos.comment.length; // Записываем кол-во коментарий на фотографии

    return photoElement;
  };

  var photos = []; // Массив объектов с ссылкой, лайками и комментами к фотографиии

  photos = window.utils.reshuffleArray(window.data.createPhotos(PHOTOS_AMOUNT)); // Создаем фотографии

  for (var i = 0; i < PHOTOS_AMOUNT; i++) { // Цикл для добавления фотографий(объектов) в DOM дерево.
    fragment.appendChild(addPhotos(photos[i])); // Добавляем полученный блок в фрагменты

  }

  photoListElement.appendChild(fragment); // Из фрагмента переносим в DOM

})();
