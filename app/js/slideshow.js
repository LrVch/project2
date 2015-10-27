var slideShow = (function () {

  function init() {
    _setUpListners();
  };

  function _setUpListners() {
    $('.foto__preview-item').on('mouseenter', _slideShow);
  };

  function _slideShow(e) {
    e.preventDefault();
    var
      $this = $(this),
      img = $this.find("img"),
      container = $this.closest(".foto"),
      display = container.find(".foto__main"),
      path = $this.find("img").attr("src"),
      duration = 300;
    //console.log(display);

    if (!$this.hasClass("active")) {
      $this.addClass("active").siblings().removeClass("active");
      display.find("img").fadeOut(duration, function () {
        $(this).attr("src", path).fadeIn(duration);
        console.log(img);
      });
    }

  };

  return {
    init: init
  };

})();

// Вызов модуля
slideShow.init();