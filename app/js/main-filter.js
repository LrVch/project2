var mainFilter = (function () {

  function init() {
    _setUpListners();
    _modules();
  };

  function _setUpListners() {
    $('.main-filter__trigger').on('click', _toggleFilter);
    $(".main-filter__inner-reset").on('click', _reset);
    $(".main-filter__color-link").on("click", _choice);
  };

  function _modules() {
    _slider();
  };
  // аккордеон
  function _toggleFilter(e) {
    e.preventDefault();
    var
      $this = $(this),
      list = $this.closest(".main-filter__list"),
      item = $this.closest(".main-filter__item"),
      links = list.find(".main-filter__trigger"),
      content = item.find(".main-filter__inner"),
      otherContent = list.find(".main-filter__inner"),
      duration = 300;


    if ($this.hasClass("main-filter__trigger--closed")) {
      $this.removeClass("main-filter__trigger--closed");
      content.slideDown(duration);
    } else {
      $this.addClass("main-filter__trigger--closed");
      content.slideUp(duration);
    }

    /*if (!$this.hasClass("main-filter__trigger--closed")) {
      links.removeClass("main-filter__trigger--closed");
      $this.addClass("main-filter__trigger--closed");

      otherContent.stop(true,true).slideUp(duration);
      content.slideDown(duration);
    } else {
      content.slideUp(duration);
      $this.removeClass("main-filter__trigger--closed");
    }*/
  };
  // ресет чекбоксов
  function _reset(e) {
    e.preventDefault();

    var
      $this = $(this),
      list = $this.closest(".main-filter__inner"),
      checkBoxs = list.find('input[type="checkbox"]').not('input[type="checkbox"]:disabled');
    checkBoxs.removeAttr("checked");
  };
  // выбор цвета
  function _choice(e) {
    e.preventDefault();
  }
  // слайдер
  function _slider() {
    var
      slider = $("#slider"),
      min = $("#min"),
      max = $("#max");
    slider.slider({
      //step: 10,
      range: true,
      min: 0,
      max: 26000,
      values: [100, 13000],
      slide: function (event, ui) {
        min.val(ui.values[0]);
        max.val(ui.values[1]);
      }
    });

    // установка значений слайдера в инпуты
    min.val(slider.slider("values", 0));
    max.val(slider.slider("values", 1));

    // проверка валидности и диапазона для мнимального значения
    min.change(function () {
      var $this = $(this);
          //oldVal = $this.val();
      if (!($this.val().match(/^\d+$/))) {
        console.log("только цифры");
        return;
      }
      if ($this.val() < slider.slider("option", "min")) {
        console.log("вы ввели отрицателное значение");
      } else if ($this.val() > slider.slider("values", 1)) {
        console.log("вы ввели значение больше прового края диапазона");
      } else {
        slider.slider("values", 0, $(this).val());
      }
      //console.log(oldVal);
    });

    // проверка валидности и диапазона для максимального значения
    max.change(function () {
      var $this = $(this);
      if (!($this.val().match(/^\d+$/))) {
        console.log("только цифры");
        return;
      }
      if ($this.val() > slider.slider("option", "max")) {
        console.log("вы ввели значение больше правого края диапазона");
      } else if ($this.val() < slider.slider("values", 0)) {
        console.log("вы ввели значение меньше левого края диапазона");
      } else {
        slider.slider("values", 1, $(this).val());
      }
    });

  }
  return {
    init: init
  };

})();

// Вызов модуля
mainFilter.init();