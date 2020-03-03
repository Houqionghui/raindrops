~function () {
  computedFont();
  window.addEventListener('resize', computedFont, false);
  function computedFont() {
    var deviceW = document.documentElement.clientWidth;
    if (deviceW > 750) return;
    document.documentElement.style.fontSize = deviceW / 750 * 100 + 'px';
  }
}();