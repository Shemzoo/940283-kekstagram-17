'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var SCALE_VALUE_MAX = 100;
  var SCALE_VALUE_MIN = 25;
  var SCALE_CHANGE_STEP = 25;
  var PHOTO_EFFECT_VOLUME_DEFAULT = 100;
  var PERCENT_MAX = 100;
  var HASHTAGS_MAX_AMOUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;

  var uploadFile = document.querySelector('#upload-file');
  var photoEditForm = document.querySelector('.img-upload__overlay');
  var photoEditFormClose = photoEditForm.querySelector('#upload-cancel');
  var photoPreview = document.querySelector('.img-upload__preview');
  var photoPreviewImage = photoPreview.getElementsByTagName('img')[0];
  var photoChangeSize = document.querySelector('.img-upload__scale');
  var photoSizeValue = photoChangeSize.querySelector('.scale__control--value');
  var imageUploadEffects = document.querySelector('.effects__list');
  var noEffectImage = imageUploadEffects.children[0].children[0];
  var imageUploadEffectsLevel = document.querySelector('.img-upload__effect-level');
  var form = document.querySelector('.img-upload__form');
  var imageEffectLevelValue = imageUploadEffectsLevel.querySelector('.effect-level__value');
  var imageEffectLine = imageUploadEffectsLevel.querySelector('.effect-level__line');
  var imageEffectPin = imageUploadEffectsLevel.querySelector('.effect-level__pin');
  var imageEffectDepth = imageUploadEffectsLevel.querySelector('.effect-level__depth');
  var photosize;
  var effects = {
    chrome: ['grayscale', 0, 1, ''],
    sepia: ['sepia', 0, 1, ''],
    marvin: ['invert', 0, 100, '%'],
    phobos: ['blur', 0, 3, 'px'],
    heat: ['brightness', 1, 3, '']
  };
  var value = '';

  var comment = document.querySelector('.text__description');
  var hashTags = document.querySelector('.text__hashtags');
  var mainContainer = document.querySelector('main');

  var showPhotoEditForm = function (element) {
    photosize = SCALE_VALUE_MAX;
    window.utils.showElement(element);
    document.addEventListener('keydown', onPhotoEditFormEscPress);
    applyPicturefilter(noEffectImage);
    photoPreviewImage.style = 'transform: scale(1)';
  };

  var hidePhotoEditForm = function (element) {
    window.utils.hideElement(element);
    document.removeEventListener('keydown', onPhotoEditFormEscPress);
    uploadFile.value = '';
  };

  var onPhotoEditFormEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== comment && evt.target !== hashTags) {
      resetForm();
      hidePhotoEditForm(photoEditForm);
    }
  };

  var changeSizePhotoPreview = function (button) {
    if (button.target.classList.contains('scale__control--bigger') && photosize < SCALE_VALUE_MAX) {
      photosize += SCALE_CHANGE_STEP;
    } else if ((button.target.classList.contains('scale__control--smaller') && photosize > SCALE_VALUE_MIN)) {
      photosize -= SCALE_CHANGE_STEP;
    }
    photoSizeValue.value = '' + photosize + '%';
    photoPreview.style = 'transform: scale(' + (photosize / 100) + ')';
  };

  var applyPicturefilter = function (element) {
    value = element.value;
    photoPreview.classList = 'img-upload__preview';
    photoPreview.classList.add('effects__preview--' + value);

    if (value === 'none') {
      window.utils.hideElement(imageUploadEffectsLevel);
      photoPreview.style = '';
    } else {
      window.utils.showElement(imageUploadEffectsLevel);
      addEffectLevelValue(PHOTO_EFFECT_VOLUME_DEFAULT, effects[value]);
      photoPreview.style = 'transform: scale(' + (photosize / 100) + ')';
    }
  };

  var addEffectLevelValue = function (percent, effect) {
    imageEffectPin.style.left = percent + '%';
    imageEffectDepth.style.width = percent + '%';
    var valuePercent = (effect[2] - effect[1]) / PHOTO_EFFECT_VOLUME_DEFAULT * percent;
    var valueInput = effect[1] + valuePercent;
    imageEffectLevelValue.textContent = valueInput.toFixed(2);
    photoPreview.style = 'filter: ' + effect[0] + '(' + valueInput.toFixed(2) + effect[3] + ')';
  };

  var getEffectValue = function (percent) {
    if (percent >= 0 && percent <= PERCENT_MAX) {
      addEffectLevelValue(percent, effects[value]);
    }
  };

  uploadFile.addEventListener('change', function () {
    showPhotoEditForm(photoEditForm);
  });

  photoEditFormClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
    hidePhotoEditForm(photoEditForm);
  });

  photoChangeSize.addEventListener('click', changeSizePhotoPreview);

  imageUploadEffects.addEventListener('change', function (evt) {
    applyPicturefilter(evt.target);
  });

  window.utils.slider(imageEffectPin, imageEffectLine, getEffectValue);

  var addHashTagsValidation = function () {
    var hashTagsData = hashTags.value.trim().split(/\s+/gi);
    var message = '';

    if (hashTagsData.length > HASHTAGS_MAX_AMOUNT) {
      message = 'Нельзя указать больше пяти хэш-тегов';

    } else {
      for (var i = 0; i < hashTagsData.length; i++) {
        message = hashtagValidation(hashTagsData, i);
        if (message) {
          break;
        }
      }
    }

    hashTags.setCustomValidity(message);

  };

  hashTags.addEventListener('input', function () {
    addHashTagsValidation();
  });

  var hashtagValidation = function (hashTagsData, i) {
    var message = '';
    if (hashTagsData[i].charAt(0) !== '#') {
      message = 'Хеш-теги должны начинаться с "#"';

    } else if (hashTagsData[i].length === 1) {
      message = 'Хеш-теги должны состоять хотя бы из одного символа';

    } else if (hashTagsData[i].indexOf('#', 1) > 0) {
      message = 'Хеш-теги должны разделяться пробелами';

    } else if (hashTagsData.indexOf(hashTagsData[i], i + 1) > 0) {
      message = 'Один и тот же хэш-тег не может быть использован дважды';

    } else if (hashTagsData[i].length > HASHTAG_MAX_LENGTH) {
      message = 'Максимальная длина одного хэш-тега 20 символов';
    }
    return message;
  };

  var onSuccess = function () {
    hidePhotoEditForm(photoEditForm);
    showMessage('success');
    resetForm();
  };

  var onError = function () {
    showMessage('error');
    resetForm();
  };

  var resetForm = function () {
    comment.form.reset();
    hashTags.form.reset();
  };

  var showMessage = function (classNameMessage) {
    var messageTemplate = document.querySelector('#' + classNameMessage)
      .content.querySelector('.' + classNameMessage)
      .cloneNode(true);
    mainContainer.appendChild(messageTemplate);
    messageTemplate.addEventListener('click', hideMessage);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideMessage();
    }
  };

  var hideMessage = function () {
    var message = mainContainer.querySelector('.message-load');
    mainContainer.removeChild(message);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.getData.save(data, onSuccess, onError);
  });

})();
