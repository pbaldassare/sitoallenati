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

  // Toast di esempio: ogni tanto compare una notifica come quelle che riceve il gestore
  var toast = document.getElementById('toast');
  if (toast && !reduce) {
    var tAvatar = document.getElementById('toast-avatar');
    var tTitle = document.getElementById('toast-title');
    var tText = document.getElementById('toast-text');
    var events = [
      { k: 'new', i: 'MF', t: 'Nuovo iscritto', s: 'Marta F. si è iscritta a CrossBox Milano' },
      { k: 'book', i: 'LB', t: 'Nuova prenotazione', s: 'Luca B. ha prenotato Functional training · 18:00' },
      { k: 'pay', i: 'GR', t: 'Abbonamento attivato', s: 'Giulia R. · Mensile illimitato · 49,00 €' },
      { k: 'ok', i: 'AC', t: 'Posto liberato', s: 'Andrea C. è entrato in Boxe 19:00 dalla lista d\'attesa' },
      { k: 'new', i: 'SM', t: 'Nuovo iscritto', s: 'Sara M. si è iscritta a Fit Lab Torino' },
      { k: 'pay', i: '10', t: 'Pagamento ricevuto', s: 'Pacchetto 10 crediti · 90,00 €' },
      { k: 'book', i: 'DP', t: 'Nuova prenotazione', s: 'Davide P. ha prenotato Yoga flow · 20:00' },
      { k: 'ok', i: 'EV', t: 'Certificato caricato', s: 'Elena V. · certificato medico valido fino a marzo' },
      { k: 'new', i: 'FT', t: 'Nuovo iscritto', s: 'Francesco T. si è iscritto a Arena Fitness Roma' }
    ];
    var order = events.slice().sort(function () { return Math.random() - .5; });
    var idx = 0, shown = 0, maxShown = 6, hideTimer = null, nextTimer = null, closed = false;

    function hideToast() {
      toast.classList.remove('is-on');
      setTimeout(function () { if (!toast.classList.contains('is-on')) toast.hidden = true; }, 500);
    }
    function showToast() {
      if (closed || document.hidden || shown >= maxShown) return schedule();
      var e = order[idx++ % order.length];
      tAvatar.textContent = e.i;
      tAvatar.className = 'toast__avatar' + (e.k === 'ok' ? ' is-ok' : e.k === 'pay' ? ' is-pay' : '');
      tTitle.textContent = e.t;
      tText.textContent = e.s;
      toast.hidden = false;
      setTimeout(function () { toast.classList.add('is-on'); }, 30);
      shown++;
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hideToast, 6000);
      schedule();
    }
    function schedule() {
      clearTimeout(nextTimer);
      if (closed || shown >= maxShown) return;
      nextTimer = setTimeout(showToast, 14000 + Math.random() * 10000);
    }
    document.getElementById('toast-close').addEventListener('click', function () {
      closed = true; clearTimeout(nextTimer); hideToast();
    });
    nextTimer = setTimeout(showToast, 7000);
  }

  // Anno nel footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
