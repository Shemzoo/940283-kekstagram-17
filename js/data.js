'use strict';

(function () {
  var PHOTOS_AMOUNT = 25; // Количество фотографий
  var AUTHOR_NAMES = ['Иван', 'Владимир', 'Мария', 'Глеб', 'Виктор', 'Юлия', 'Денис', 'Антон']; // Имена авторов
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ]; // Примеры комментариев
  var VALUE_OF_AVATAR_MIN = 1; // Минимальный номер аватарки из папки img
  var VALUE_OF_AVATAR_MAX = 6; // Максимальный номер аватарки из папки img
  var NUMBER_OF_COMMENTS_MIN = 1; // Минимальное количество комментариев к фото
  var NUMBER_OF_COMMENTS_MAX = 5; // Максимальное количество комментариев к фото
  var NUMBER_OF_LIKES_MIN = 15; // Минимальное количество лайков к фото
  var NUMBER_OF_LIKES_MAX = 200; // Максимальное количество лайков к фото

  var photoListElement = document.querySelector('.pictures'); // Находим тег, внутрь которого будем вставлять данные из template'а
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); // Находим нужный шаблон
  var fragment = document.createDocumentFragment(); // Создаем documentFragment

  var getRandomNumber = function (min, max) { // Функция для получения случайного целого числа в диапазоне от мин. до макс., включая эти значения
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var chooseRandomElement = function (array) { // Функция выбора случайного элемента из входного массива
    return array[getRandomNumber(0, array.length - 1)];
  };

  var createComment = function (amountOfComment) { // Функция генерации комментария, аватара и имени автора
    var array = [];
    for (var i = 0; i < amountOfComment; i++) {
      var commentOptions = {
        avatar: 'img/avatar-' + getRandomNumber(VALUE_OF_AVATAR_MIN, VALUE_OF_AVATAR_MAX) + '.svg',
        message: chooseRandomElement(COMMENTS),
        name: chooseRandomElement(AUTHOR_NAMES)
      };
      array.push(commentOptions);
    }
    return array;
  };

  var createPhotos = function (amountOfPhotos) { // Функция генерации фотографии
    var array = []; // Промежуточный массив

    for (var i = 1; i <= amountOfPhotos; i++) {
      var numberOfComments = getRandomNumber(NUMBER_OF_COMMENTS_MIN, NUMBER_OF_COMMENTS_MAX); // Получаем число комментов к фотографии
      var photosInfo = { // Объект, в котором хранятся данные о фотографии (путь, лайки и комменты)
        url: 'photos/' + i + '.jpg', // Путь к фотке
        likes: getRandomNumber(NUMBER_OF_LIKES_MIN, NUMBER_OF_LIKES_MAX), // Cлучайное количество лайков
        comment: createComment(numberOfComments) // Пустой массив для записи комментов
      };
      array.push(photosInfo); // Добаляем сгенерированный объект в массив
    }
    return array; // Наш итоговый массив объектов
  };

  var addPhotos = function (photos) { // Функция для добавления

    var photoElement = userPictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photos.url; // Меняем ссылку
    photoElement.querySelector('.picture__likes').textContent = photos.likes; // Записываем лайки
    photoElement.querySelector('.picture__comments').textContent = photos.comment.length; // Записываем кол-во коментарий на фотографии

    return photoElement;
  };

  var photos = []; // Массив объектов с ссылкой, лайками и комментами к фотографиии

  photos = window.utils.reshuffleArray(createPhotos(PHOTOS_AMOUNT)); // Создаем фотографии

  for (var i = 0; i < PHOTOS_AMOUNT; i++) { // Цикл для добавления фотографий(объектов) в DOM дерево.
    fragment.appendChild(addPhotos(photos[i])); // Добавляем полученный блок в фрагменты

  }

  photoListElement.appendChild(fragment); // Из фрагмента переносим в DOM

})();
