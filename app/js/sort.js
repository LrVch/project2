(function () {

  var sort = (function () {

    function init() {
      _setUpListners();
    };

    function _setUpListners() {
      $('.sort__view-link').on('click', _sort);
    };

    function _sort(e) {
      e.preventDefault();
      var
        $this = $(this),
        list = $this.closest(".sort__view-list"),
        links = list.find(".sort__view-link"),
        goods = $(".mobile");

      links.removeClass("sort__view-link--active");
      $this.addClass("sort__view-link--active");

      if ($this.hasClass("sort__view-link--row")) {
        goods.removeClass("mobile__grid mobile__list");
        goods.addClass("mobile__row")
      }
      if ($this.hasClass("sort__view-link--grid")) {
        goods.removeClass("mobile__row mobile__list");
        goods.addClass("mobile__grid")
      }
      if ($this.hasClass("sort__view-link--list")) {
        goods.removeClass("mobile__grid mobile__row");
        goods.addClass("mobile__list")
      }
    };

    return {
      init: init
    };

  })();

  if ($('.sort__view-link').length) {
    sort.init();
  }

}());