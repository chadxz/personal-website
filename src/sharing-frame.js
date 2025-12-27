(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('title');
  const slot = document.getElementById('slot');

  if (!slot) return;

  if (title) {
    slot.textContent = title;
  } else {
    slot.remove();
  }
})();
