var mainFilter = (function () {

  function init() {
    _setUpListners();
    _modules();
  };

  function _setUpListners() {
    $('.main-filter__trigger').on('click', _toggleFilter);
  };

  function _modules() {

  };

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

  return {
    init: init
  };

})();

// Вызов модуля
mainFilter.init();