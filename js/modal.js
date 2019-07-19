'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var scrollBar = {
    off: function () {
      document.body.style.width = document.body.clientWidth + 'px';
      document.body.parentElement.style.overflowY = 'hidden';
    },

    on: function () {
      document.body.parentElement.style.overflowY = '';
      document.body.style.width = '';
    }
  };

  var Modal = function (classNameModal) {
    var modal = this;
    var container = document.querySelector(classNameModal);
    var btnClose = container.querySelector('.cancel');
    this.onOpen = function () {};
    this.onClose = function () {};

    this.open = function () {
      modal.onOpen();
      container.classList.remove('hidden');
      document.addEventListener('keydown', this.onModalEscPress);
      scrollBar.off();
    };

    this.close = function () {
      modal.onClose();
      container.classList.add('hidden');
      document.removeEventListener('keydown', this.onModalEscPress);
      scrollBar.on();
    };

    this.onModalEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        modal.close();
      }
    };

    btnClose.addEventListener('click', modal.close);
  };

  window.Modal = Modal;
})();
