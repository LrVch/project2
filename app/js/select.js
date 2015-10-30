(function () {
  if ($("select").length) {
    $('select').select2({
      minimumResultsForSearch: Infinity
    });
  }
}());