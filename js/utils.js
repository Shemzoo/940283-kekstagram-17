'use strict';

window.utils = (function () {
  return {
    showElement: function (element) {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      }
    },

    hideElement: function (element) {
      if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
      }
    },

    reshuffleArray: function (array) { // Для избежания дублирования фотографий
      var j;
      var temp;
      for (var i = array.length - 1; i > 0; i--) { // Перемешиваем массив
        j = Math.floor(Math.random() * (i + 1));
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
      return array;
    },
  };
})();
