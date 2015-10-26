var sort = (function () {

  function init() {
    _setUpListners();
    _modules();
  };

  function _setUpListners() {
    $('.sort__view-link').on('click', _sort);
  };

  function _modules() {

  };

  function _sort(e) {
    e.preventDefault();
    var
      $this = $(this),
      list = $this.closest(".sort__view-list"),
      links = list.find(".sort__view-link");
      
      links.removeClass("sort__view-link--active");
      $this.addClass("sort__view-link--active");
  };

  return {
    init: init
  };

})();

// Вызов модуля
sort.init();