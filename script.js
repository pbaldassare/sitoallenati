(function () {
  // Menu mobile
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  if (nav && burger) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Comparsa delle card allo scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Modulo: apre il client di posta con il messaggio pronto
  var form = document.getElementById('form');
  if (form) {
    var err = document.getElementById('form-err');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var nome = form.nome.value.trim();
      var palestra = form.palestra.value.trim();
      var email = form.email.value.trim();
      var msg = form.messaggio.value.trim();
      var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      [form.nome, form.palestra, form.email].forEach(function (f) { f.classList.remove('is-bad'); });
      if (!nome) form.nome.classList.add('is-bad');
      if (!palestra) form.palestra.classList.add('is-bad');
      if (!okEmail) form.email.classList.add('is-bad');

      if (!nome || !palestra || !okEmail) {
        err.hidden = false;
        (form.querySelector('.is-bad') || form.nome).focus();
        return;
      }
      err.hidden = true;

      var subject = 'Richiesta demo Allenati — ' + palestra;
      var body = 'Ciao,\n\nvorrei vedere una demo di Allenati.\n\n' +
        'Nome: ' + nome + '\nPalestra: ' + palestra + '\nEmail: ' + email +
        (msg ? '\n\n' + msg : '') + '\n';
      window.location.href = 'mailto:info@allenati.me?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  // Anno nel footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
