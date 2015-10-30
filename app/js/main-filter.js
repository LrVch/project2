(function () {
  "use strict";
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
        content.stop(true, true).slideDown(duration)
      } else {
        $this.addClass("main-filter__trigger--closed");
        content.stop(true, true).slideUp(duration)
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
      var
        $this = $(this),
        list = $this.closest(".main-filter__color-list"),
        links = list.find(".main-filter__color-link");

      links.removeClass("main-filter__color-link--active");
      $this.addClass("main-filter__color-link--active");
    }
    // слайдер
    function _slider() {
      $(".slider__slide").each(function (i, slider) {
        var
          $this = $(this),
          sliderBlock = $this.parent(".slider"),
          minInput = sliderBlock.find("input[name='min']"),
          maxInput = sliderBlock.find("input[name='max']"),
          maxVal = $this.data("maxval"),
          minVal = $this.data("minval"),
          maxRange = $this.data("maxrange"),
          minRange = $this.data("minrange");

        $this.slider({
          range: true,
          animate: 600,
          min: minRange,
          max: maxRange,
          values: [minVal, maxVal],
          slide: function (event, ui) {
            minInput.val(ui.values[0]);
            maxInput.val(ui.values[1]);
            minInput.trigger("hideTooltip");
            maxInput.trigger("hideTooltip");
          }
        });
        minInput.val($this.slider("values", 0));
        maxInput.val($this.slider("values", 1));

        // проверка валидности и диапазона для мнимального значения
        minInput.change(function () {
          var $this = $(this);

          if (!($this.val().match(/^\d+$/))) {
            $this.trigger("hideTooltip");
            _createQtip($this, "notnumber");
            return;
          }
          if ($this.val() < $(slider).slider("option", "min")) {
            $this.trigger("hideTooltip");
            _createQtip($this, "leftout");
          } else if ($this.val() > $(slider).slider("values", 1)) {
            $this.trigger("hideTooltip");
            _createQtip($this, "rightout");
          } else {
            $(slider).slider("values", 0, $(this).val());
          }
          //console.log(oldVal);
        });

        // проверка валидности и диапазона для максимального значения
        maxInput.change(function () {
          var $this = $(this);

          if (!($this.val().match(/^\d+$/))) {
            console.log("только цифры");
             $this.trigger("hideTooltip");
            _createQtip($this, "notnumber");
            return;
          }
          if ($this.val() > $(slider).slider("option", "max")) {
             $this.trigger("hideTooltip");
            _createQtip($this, "rightout");
          } else if ($this.val() < $(slider).slider("values", 0)) {
            $this.trigger("hideTooltip");
            _createQtip($this, "leftout");
          } else {
            $(slider).slider("values", 1, $(this).val());
          }
        });

      });

    }
    // Создаёт тултипы
    function _createQtip(el, text) {

      var position = {
        my: 'bottom center',
        at: 'top center'
      };
      
      switch (text) {
        case "notnumber": var text = el.attr("qtip-content-motnumber");
          break
        case "leftout": var text = el.attr("qtip-content-leftout");
          break
        case "rightout": var text = el.attr("qtip-content-rightout");
          break
      }
      
      var el = el.qtip({
        content: {
          text: text
        },
        show: {
          event: 'show'
        },
        hide: {
          event: 'keydown hideTooltip'
        },
        position: position,
        style: {
          classes: 'qtip-rounded myclass'
        }
      }).trigger('show');
      //el.trigger("hideTooltip");
      //return el;  
    };

    return {
      init: init
    };

  })();

  if ($(".main-filter").length) {
    mainFilter.init();
  }

}());