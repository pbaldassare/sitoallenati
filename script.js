(function () {
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Contatori dei numeri
  var counters = document.querySelectorAll('[data-count]');
  function fmt(n) { return Math.round(n).toLocaleString('it-IT'); }
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var dur = 1400, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && 'IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // Voce di menu attiva in base alla sezione visibile
  var spyLinks = document.querySelectorAll('[data-spy]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    spyLinks.forEach(function (a) { map[a.getAttribute('data-spy')] = a; });
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        spyLinks.forEach(function (a) { a.classList.remove('is-active'); });
        var link = map[e.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) sio.observe(sec);
    });
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

  // Riga di attività: messaggi di esempio che si alternano ogni pochi secondi
  var feed = document.getElementById('feed');
  if (feed) {
    var fAvatar = document.getElementById('feed-avatar');
    var fTitle = document.getElementById('feed-title');
    var fMsg = document.getElementById('feed-msg');
    var events = [
      { k: 'new', t: 'Nuovo iscritto', s: 'Marta F. si è iscritta a CrossBox Milano' },
      { k: 'book', t: 'Nuova prenotazione', s: 'Luca B. ha prenotato Functional training · 18:00' },
      { k: 'pay', t: 'Abbonamento attivato', s: 'Giulia R. · Mensile illimitato' },
      { k: 'ok', t: 'Posto liberato', s: 'Andrea C. è entrato in Boxe 19:00 dalla lista d\'attesa' },
      { k: 'new', t: 'Nuovo iscritto', s: 'Sara M. si è iscritta a Fit Lab Torino' },
      { k: 'pay', t: 'Pagamento ricevuto', s: 'Paolo G. · pacchetto 10 crediti' },
      { k: 'book', t: 'Nuova prenotazione', s: 'Davide P. ha prenotato Yoga flow · 20:00' },
      { k: 'ok', t: 'Certificato caricato', s: 'Elena V. · certificato medico valido fino a marzo' },
      { k: 'new', t: 'Nuovo iscritto', s: 'Francesco T. si è iscritto a Arena Fitness Roma' }
    ];
    var fi = 0;
    function setFeed(e) {
      fAvatar.textContent = e.s.charAt(0);
      fAvatar.className = 'feed__avatar' + (e.k === 'ok' ? ' is-ok' : e.k === 'pay' ? ' is-pay' : '');
      fTitle.textContent = e.t;
      fMsg.textContent = e.s;
    }
    function nextFeed() {
      if (document.hidden) return;
      fi = (fi + 1) % events.length;
      if (reduce) return setFeed(events[fi]);
      feed.classList.add('is-swap');
      setTimeout(function () { setFeed(events[fi]); feed.classList.remove('is-swap'); }, 380);
    }
    setInterval(nextFeed, 6500);
  }

  // Anno nel footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
