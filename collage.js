// Collage tile flip
document.querySelectorAll('.collage-content-wrapper .b').forEach(function(tile) {
  var trigger = tile.querySelector('.b-flip-trigger');
  var flipBack = tile.querySelector('.b-flip-back');

  if (!tile.classList.contains('b-flippable')) {
    if (trigger) trigger.style.display = 'none';
  }

  if (trigger) {
    trigger.addEventListener('click', function() {
      tile.classList.add('is-flipped');
    });
  }

  if (flipBack) {
    flipBack.addEventListener('click', function() {
      tile.classList.remove('is-flipped');
    });
  }
});

// Draw effect via IntersectionObserver
var drawEls = document.querySelectorAll('.draw-effect');
if (drawEls.length && 'IntersectionObserver' in window) {
  var drawObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        drawObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  drawEls.forEach(function(el) { drawObserver.observe(el); });
}
