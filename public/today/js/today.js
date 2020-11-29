var list = document.querySelector('dl');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI'  ) {
        ev.target.classList.toggle('checked');
    }
    if (ev.target.tagName === 'DT'  ) {
      document.querySelectorAll('li').toggle('checked');
    }
}, false);

