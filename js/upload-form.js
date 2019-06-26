'use strict';

var PHOTO_SIZE_MAX = 100;
var PHOTO_SIZE_MIN = 25;
var PHOTO_SIZE_CHANGE_STEP = 25;
var PHOTO_EFFECT_VOLUME_DEFAULT = 100;
var PERCENT_MAX = 100;

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

var showElement = function (element) {
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
  }
};

var hideElement = function (element) {
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden');
  }
};

var showPhotoEditForm = function (element) {
  photosize = PHOTO_SIZE_MAX;
  showElement(element);
  document.addEventListener('keydown', onPhotoEditFormEscPress);
  applyPicturefilter(noEffectImage);
  photoPreviewImage.style = 'transform: scale(1)';
};

var hidePhotoEditForm = function (element) {
  if (!element.classList.contains('hidden')) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', onPhotoEditFormEscPress);
    uploadFile.value = '';
  }
};

var onPhotoEditFormEscPress = function (evt) {
  if (evt.keyCode === 27 && evt.target !== comment) {
    hidePhotoEditForm(photoEditForm);
  }
};

var changeSizePhotoPreview = function (button) {
  if (button.target.classList.contains('scale__control--bigger') && photosize < PHOTO_SIZE_MAX) {
    photosize += PHOTO_SIZE_CHANGE_STEP;
  } else if ((button.target.classList.contains('scale__control--smaller') && photosize > PHOTO_SIZE_MIN)) {
    photosize -= PHOTO_SIZE_CHANGE_STEP;
  }
  photoSizeValue.value = '' + photosize;
  photoPreviewImage.style = 'transform: scale(' + (photosize / 100) + ')';
};

var applyPicturefilter = function (element) {
  value = element.value;

  photoPreview.classList = 'img-upload__preview';
  photoPreview.classList.add('effects__preview--' + value);

  if (value === 'none') {
    hideElement(imageUploadEffectsLevel);
    photoPreview.style = '';
  } else {
    showElement(imageUploadEffectsLevel);
    addEffectLevelValue(PHOTO_EFFECT_VOLUME_DEFAULT, effects[value]);
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
  hidePhotoEditForm(photoEditForm);
});

photoChangeSize.addEventListener('click', changeSizePhotoPreview);

imageUploadEffects.addEventListener('change', function (evt) {
  applyPicturefilter(evt.target);
});

imageEffectPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var lineWidth = imageEffectLine.clientWidth;
    var shift = startCoords - moveEvt.clientX;

    startCoords = moveEvt.clientX;

    getEffectValue((imageEffectPin.offsetLeft - shift) * 100 / lineWidth);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
