(function() {
  function $(id) {
    return document.getElementById(id);
  }

  var card = $('card'),
      openB = $('open'),
      closeB = $('close'),
      timer = null;
  console.log('wat', card);
  openB.addEventListener('click', function () {
    card.setAttribute('class', 'open-half');
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', 'open-fully');
      timer = null;
    }, 1000);
  });

  closeB.addEventListener('click', function () {
    card.setAttribute('class', 'close-half');
    if (timer) clearTimerout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', '');
      timer = null;
    }, 1000);
  });
  
  

}());

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('fade-out');
  }, 1500); // delay for effect
});

// Optional confetti generator
function launchConfetti() {
  document.body.style.overflow = 'hidden'; // Prevent scrolling during confetti
  const colors = ['#ff4e50', '#fc913a', '#f9d423', '#ede574', '#e1f5c4'];
  for (let i = 0; i < 50; i++) {
    const conf = document.createElement('div');
    conf.classList.add('confetti');
    conf.style.left = Math.random() * 100 + 'vw';
    conf.style.animationDuration = (Math.random() * 3 + 2) + 's';
    conf.style.setProperty('--confetti-color', colors[Math.floor(Math.random() * colors.length)]);
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 5000);
  }
  setTimeout(() => {
    document.body.style.overflow = ''; // Restore scrolling after confetti
  }, 5000);
}

// Trigger confetti when card opens fully
document.getElementById('open').addEventListener('click', () => {
  setTimeout(launchConfetti, 1200);
});
