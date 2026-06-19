/* ============================================================
   The-Palace — Shared Application Shell
   Renders the unified sidebar + topbar and shared helpers.
   Exposed as window.App  (alias: window.GameManager)
   ============================================================ */

var App = (function () {

  /* --------------------------------------------------------
     Icons (Feather-style inline SVG paths)
  -------------------------------------------------------- */
  var icons = {
    home:     '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
    match:    '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>',
    ticket:   '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>',
    dollar:   '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    report:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
    customer: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
    employee: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
    grid:     '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
    check:    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
    bar:      '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>',
    pie:      '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>',
    plus:     '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>',
    note:     '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>',
    settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',
    store:    '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>',
    logout:   '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>',
    clock:    '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
    menu:     '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>'
  };

  function svg(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (icons[name] || '') + '</svg>';
  }

  /* --------------------------------------------------------
     Navigation model — two grouped sections
  -------------------------------------------------------- */
  var NAV = {
    operations: [
      { key: 'home',       href: 'index.html',     icon: 'home',     label: 'Home' },
      { key: 'match',      href: 'match.html',     icon: 'match',    label: 'Matches' },
      { key: 'ticket',     href: 'ticket.html',    icon: 'ticket',   label: 'Tickets' },
      { key: 'expenses',   href: 'expenses.html',  icon: 'dollar',   label: 'Bank Expenses' },
      { key: 'report',     href: 'report.html',    icon: 'report',   label: 'Reports' },
      { key: 'customer',   href: 'customer.html',  icon: 'customer', label: 'Customers' },
      { key: 'employee',   href: 'employee.html',  icon: 'employee', label: 'Employees' }
    ],
    accounting: [
      { key: 'game',        href: 'game.html',             icon: 'grid',   label: 'Game' },
      { key: 'acc-expenses',href: 'acc-expenses.html',     icon: 'dollar', label: 'Expenses' },
      { key: 'cash',        href: 'cash-verification.html',icon: 'check',  label: 'Cash Verification' },
      { key: 'all-reports', href: 'all-reports.html',      icon: 'bar',    label: 'All Reports' },
      { key: 'summary',     href: 'summary.html',          icon: 'pie',    label: 'Summary' },
      { key: 'insert',      href: 'insert-game.html',      icon: 'plus',   label: 'Insert Data' },
      { key: 'note',        href: 'note.html',             icon: 'note',   label: 'Note' }
    ]
  };

  function navList(items, active) {
    return items.map(function (it) {
      var cls = 'sidebar-link' + (it.key === active ? ' active' : '');
      return '<a class="' + cls + '" href="' + it.href + '">' + svg(it.icon) + '<span>' + it.label + '</span></a>';
    }).join('');
  }

  /* --------------------------------------------------------
     initShell({ active, title, store })
     Injects sidebar + topbar, wires mobile toggle & modals.
  -------------------------------------------------------- */
  function initShell(opts) {
    opts = opts || {};
    var active = opts.active || '';
    var title  = opts.title || '';
    var store  = opts.store || 'THEPALACE';
    var user   = opts.user || 'zee';

    /* ---- Sidebar ---- */
    var sidebar = document.createElement('aside');
    sidebar.className = 'app-sidebar';
    sidebar.innerHTML =
      '<a class="sidebar-brand" href="index.html">' +
        '<span class="brand-mark">TP</span>' +
        '<span>The-Palace<small>Management Suite</small></span>' +
      '</a>' +
      '<nav class="sidebar-nav">' +
        '<div class="sidebar-group-label">Operations</div>' +
        navList(NAV.operations, active) +
        '<div class="sidebar-group-label">Accounting</div>' +
        navList(NAV.accounting, active) +
        '<div class="sidebar-group-label">System</div>' +
        '<a class="sidebar-link' + (active === 'admin' ? ' active' : '') + '" href="admin.html">' + svg('settings') + '<span>Admin</span></a>' +
        '<a class="sidebar-link' + (active === 'store' ? ' active' : '') + '" href="select-store.html">' + svg('store') + '<span>Select Store</span></a>' +
      '</nav>';
    document.body.insertBefore(sidebar, document.body.firstChild);

    /* ---- Overlay (mobile) ---- */
    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);

    /* ---- Topbar ---- */
    var main = document.querySelector('.app-main');
    if (main) {
      var topbar = document.createElement('header');
      topbar.className = 'app-topbar';
      topbar.innerHTML =
        '<button class="sidebar-toggle" aria-label="Menu">' + svg('menu') + '</button>' +
        '<h1 class="topbar-title">' + title + '</h1>' +
        '<div class="topbar-spacer"></div>' +
        '<span class="store-badge"><span class="dot"></span>' + store + '</span>' +
        '<div class="dropdown">' +
          '<button class="user-chip" data-bs-toggle="dropdown" aria-expanded="false">' +
            '<span class="user-avatar">' + user.charAt(0).toUpperCase() + '</span>' + user +
          '</button>' +
          '<ul class="dropdown-menu dropdown-menu-end">' +
            '<li><button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#logoutModal">Clock-out</button></li>' +
            '<li><a class="dropdown-item" href="admin.html">Admin</a></li>' +
            '<li><a class="dropdown-item" href="select-store.html">Switch Store</a></li>' +
            '<li><hr class="dropdown-divider"></li>' +
            '<li><button class="dropdown-item text-danger" onclick="App.demo()">Logout</button></li>' +
          '</ul>' +
        '</div>';
      main.insertBefore(topbar, main.firstChild);
      topbar.querySelector('.sidebar-toggle').addEventListener('click', openSidebar);
    }

    renderModals();
  }

  function openSidebar()  { document.body.classList.add('sidebar-open'); }
  function closeSidebar() { document.body.classList.remove('sidebar-open'); }

  /* --------------------------------------------------------
     Demo helper
  -------------------------------------------------------- */
  function demo() { alert('This is a demo — no backend connected.'); }

  /* --------------------------------------------------------
     Shared modals (Clock-out, Open Store, Close Store)
  -------------------------------------------------------- */
  function renderModals() {
    if (document.getElementById('logoutModal')) return;
    var html =
      modal('logoutModal', 'Closing Balance',
        '<div class="mb-3"><label class="form-label">Enter Closing Balance Amount</label>' +
        '<input type="number" class="form-control" placeholder="0.00" min="0" step="0.01"></div>' +
        '<button type="submit" class="btn btn-primary w-100">Clock-Out</button>') +
      modal('openStoreModal', 'Set Password',
        '<div class="mb-3"><label class="form-label">Store Password</label>' +
        '<input type="text" class="form-control" placeholder="Enter store password"></div>' +
        '<button type="submit" class="btn btn-success w-100">Open Store</button>') +
      modal('closeStoreModal', 'Enter Password to Close Store',
        '<div class="mb-3"><label class="form-label">Store Password</label>' +
        '<input type="text" class="form-control" placeholder="Enter password"></div>' +
        '<div class="d-flex gap-2"><button type="submit" class="btn btn-danger flex-fill">YES — Close</button>' +
        '<button type="button" class="btn btn-secondary flex-fill" data-bs-dismiss="modal">NO</button></div>');
    var w = document.createElement('div');
    w.innerHTML = html;
    while (w.firstChild) document.body.appendChild(w.firstChild);
  }

  function modal(id, titleText, bodyInner) {
    return '<div class="modal fade" id="' + id + '" tabindex="-1" aria-hidden="true">' +
      '<div class="modal-dialog modal-dialog-centered"><div class="modal-content">' +
      '<div class="modal-header"><h5 class="modal-title">' + titleText + '</h5>' +
      '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
      '<div class="modal-body"><form onsubmit="event.preventDefault(); App.demo()">' + bodyInner + '</form></div>' +
      '</div></div></div>';
  }

  /* --------------------------------------------------------
     Popup backdrop + detail popup
  -------------------------------------------------------- */
  function showPopupBackdrop() { var b = document.getElementById('popupBackdrop'); if (b) b.style.display = 'block'; }
  function hidePopupBackdrop() { var b = document.getElementById('popupBackdrop'); if (b) b.style.display = 'none'; }

  function showDetailPopup() { var p = document.getElementById('detailPopup'); if (p) p.style.display = 'block'; showPopupBackdrop(); }
  function hideDetailPopup() { var p = document.getElementById('detailPopup'); if (p) p.style.display = 'none'; hidePopupBackdrop(); }

  /* Build detail popup body from column/value pairs */
  function fillDetail(targetId, columns, row) {
    var html = columns.map(function (col, i) {
      var v = (row[i] === '' || row[i] == null) ? '—' : row[i];
      return '<div class="popup-field"><label>' + col + '</label><span>' + v + '</span></div>';
    }).join('');
    var t = document.getElementById(targetId);
    if (t) t.innerHTML = html;
  }

  /* --------------------------------------------------------
     Camera / capture helpers
  -------------------------------------------------------- */
  var _stream = null;

  function stopStream() {
    if (_stream) { _stream.getTracks().forEach(function (t) { t.stop(); }); _stream = null; }
  }

  function startCamera(videoId, popupId) {
    showPopupBackdrop();
    var popup = document.getElementById(popupId);
    if (popup) popup.style.display = 'block';
    var video = document.getElementById(videoId);
    if (!video) return;
    var captured = document.getElementById('capturedImage');
    if (captured) captured.style.display = 'none';
    video.style.display = 'block';
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) { _stream = stream; video.srcObject = stream; video.play(); })
      .catch(function (err) { alert('Camera unavailable: ' + err.message); hideCamera(popupId); });
  }

  function captureImage(videoId, canvasId, capturedId) {
    var video = document.getElementById(videoId);
    var canvas = document.getElementById(canvasId);
    var captured = document.getElementById(capturedId);
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    if (captured) { captured.src = canvas.toDataURL('image/png'); captured.style.display = 'block'; }
    video.style.display = 'none';
    stopStream();
  }

  function restartCamera(videoId, canvasId, capturedId, popupId) {
    var captured = document.getElementById(capturedId);
    var video = document.getElementById(videoId);
    if (captured) captured.style.display = 'none';
    if (video) video.style.display = 'block';
    startCamera(videoId, popupId);
  }

  function savePopup(popupId, displayId, hiddenInputId) {
    var canvas = document.getElementById('cameraCanvas');
    var dataUrl = canvas ? canvas.toDataURL('image/png') : '';
    var display = document.getElementById(displayId);
    if (display && dataUrl) { display.src = dataUrl; display.style.display = 'block'; }
    var hidden = document.getElementById(hiddenInputId);
    if (hidden) hidden.value = dataUrl;
    hideCamera(popupId);
  }

  function hideCamera(popupId) {
    stopStream();
    var popup = document.getElementById(popupId);
    if (popup) popup.style.display = 'none';
    hidePopupBackdrop();
  }

  /* --------------------------------------------------------
     Public API
  -------------------------------------------------------- */
  return {
    initShell: initShell,
    demo: demo,
    svg: svg,
    showDetailPopup: showDetailPopup,
    hideDetailPopup: hideDetailPopup,
    fillDetail: fillDetail,
    showPopupBackdrop: showPopupBackdrop,
    hidePopupBackdrop: hidePopupBackdrop,
    startCamera: startCamera,
    captureImage: captureImage,
    restartCamera: restartCamera,
    savePopup: savePopup,
    stopStream: stopStream,
    hideCamera: hideCamera
  };

}());

/* Backward-compatible alias */
window.GameManager = App;
