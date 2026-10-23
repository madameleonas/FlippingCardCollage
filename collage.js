// Collage tile flip
document.querySelectorAll('.collage-content-wrapper .b').forEach(function(tile) {
  var trigger = tile.querySelector('.b-flip-trigger');
  var flipBack = tile.querySelector('.b-flip-back');

  var front = tile.querySelector('.b-front');
  var back = tile.querySelector('.b-back');

  if (!tile.classList.contains('b-flippable')) {
    if (trigger) trigger.style.display = 'none';
    return;
  }

  // The hidden face is inert, so keyboard and screen reader users
  // only ever reach the side that is actually showing.
  function setFlipped(flipped) {
    tile.classList.toggle('is-flipped', flipped);
    front.inert = flipped;
    back.inert = !flipped;
  }

  // Back face can take focus so its content is announced on flip
  back.setAttribute('tabindex', '-1');
  setFlipped(false);

  if (trigger) {
    trigger.addEventListener('click', function() {
      setFlipped(true);
      back.focus();
    });
  }

  if (flipBack) {
    flipBack.addEventListener('click', function() {
      setFlipped(false);
      trigger.focus(); // return focus to where the user started
    });
  }

  // Escape flips the card back from anywhere on the back face
  back.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && tile.classList.contains('is-flipped')) {
      setFlipped(false);
      trigger.focus();
    }
  });
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
} else {
  // No observer support: show icons fully drawn rather than leaving them blank
  drawEls.forEach(function(el) { el.classList.add('is-visible'); });
}
