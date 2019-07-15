'use strict';

(function () {
  var filter = function (data) {

    var NEW_PICTURES_AMOUNT = 10;

    var DELAY_TIME = 500;

    var FilterName = {
      POPULAR: 'filter-popular',
      NEW: 'filter-new',
      DISCUSSED: 'filter-discussed'
    };

    var filterContainer = document.querySelector('.img-filters');
    var filterButtons = filterContainer.querySelectorAll('.img-filters__button');
    var activeClassButton = 'img-filters__button--active';
    var timerId;
    var buttonChecked = filterButtons[0];
    var picturesData = data;

    var showFilter = function () {
      filterContainer.classList.remove('img-filters--inactive');
    };

    var addHandlerToFilter = function () {

      filterContainer.addEventListener('click', function (evt) {

        if (evt.target.type === 'button' && !evt.target.classList.contains(activeClassButton)) {
          changeFilter(evt.target);
        }

      });
    };

    var changeFilter = function (btn) {
      var filterName = btn.id;

      filterButtons.forEach(function (btnItem) {
        btnItem.classList.remove(activeClassButton);
      });

      btn.classList.add(activeClassButton);

      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(function () {
        if (buttonChecked !== btn) {
          applyFilter(filterName);
          buttonChecked = btn;
        }
      }, DELAY_TIME);
    };

    var applyFilter = function (filterName) {
      var sortedPictures = picturesData.slice();

      switch (filterName) {

        case FilterName.NEW:
          sortedPictures = sortedPictures
            .sort(function () {
              return Math.random() - 0.5;
            })
            .slice(-NEW_PICTURES_AMOUNT);
          break;

        case FilterName.DISCUSSED:
          sortedPictures = sortedPictures
            .sort(function (first, second) {
              return second.comments.length - first.comments.length;
            });
          break;
      }

      window.renderPictures(sortedPictures);
    };

    showFilter();
    addHandlerToFilter();
  };

  window.filter = filter;

})();
