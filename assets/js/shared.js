/* ============================================================
   GameManager – Shared JavaScript
   ============================================================ */

var GameManager = (function () {

  /* --------------------------------------------------------
     NAV ICONS (inline SVG paths)
  -------------------------------------------------------- */
  var icons = {
    home:      '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
    match:     '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>',
    ticket:    '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>',
    expenses:  '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    report:    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
    customer:  '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
    employee:  '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'
  };

  function svgIcon(name) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' + icons[name] + '</svg>';
  }

  function navLink(href, iconName, label, activePage, pageKey) {
    var activeClass = (activePage === pageKey) ? ' active' : '';
    return '<a class="nav-link' + activeClass + '" href="' + href + '">' + svgIcon(iconName) + ' ' + label + '</a>';
  }

  /* --------------------------------------------------------
     renderNavbar(activePage, username)
     Injects the full navbar into <body> as first child.
  -------------------------------------------------------- */
  function renderNavbar(activePage, username) {
    username = username || 'zee';

    var html = [
      '<nav class="navbar navbar-expand-lg navbar-dark navbar-custom">',
      '  <div class="container-fluid">',
      '    <a class="navbar-brand" href="index.html">The-Palace</a>',
      '    <button class="navbar-toggler" type="button"',
      '            data-bs-toggle="collapse" data-bs-target="#navbarNav"',
      '            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">',
      '      <span class="navbar-toggler-icon"></span>',
      '    </button>',
      '    <div class="collapse navbar-collapse" id="navbarNav">',
      '      <ul class="navbar-nav me-auto mb-2 mb-lg-0">',
      '        <li class="nav-item">' + navLink('index.html',    'home',     'Home',          activePage, 'home')     + '</li>',
      '        <li class="nav-item">' + navLink('match.html',    'match',    'Matches',       activePage, 'match')    + '</li>',
      '        <li class="nav-item">' + navLink('ticket.html',   'ticket',   'Tickets',       activePage, 'ticket')   + '</li>',
      '        <li class="nav-item">' + navLink('expenses.html', 'expenses', 'Bank Expenses', activePage, 'expenses') + '</li>',
      '        <li class="nav-item">' + navLink('report.html',   'report',   'Reports',       activePage, 'report')   + '</li>',
      '        <li class="nav-item">' + navLink('customer.html', 'customer', 'Customer',      activePage, 'customer') + '</li>',
      '        <li class="nav-item">' + navLink('employee.html', 'employee', 'Employees',     activePage, 'employee') + '</li>',
      '      </ul>',
      '      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-2">',
      '        <li class="nav-item">',
      '          <span class="nav-link username-display">' + username + '</span>',
      '        </li>',
      '        <li class="nav-item">',
      '          <button class="btn btn-sm btn-outline-warning"',
      '                  data-bs-toggle="modal" data-bs-target="#logoutModal">Clock-out</button>',
      '        </li>',
      '        <li class="nav-item">',
      '          <button class="btn btn-sm btn-outline-danger"',
      '                  onclick="alert(\'This is a demo — no backend connected\')">Logout</button>',
      '        </li>',
      '      </ul>',
      '    </div>',
      '  </div>',
      '</nav>'
    ].join('\n');

    var navEl = document.createElement('div');
    navEl.innerHTML = html;
    document.body.insertBefore(navEl.firstElementChild, document.body.firstChild);
  }

  /* --------------------------------------------------------
     renderNavbarModals()
     Appends the three modals (Clock-out, Open Store, Close Store).
  -------------------------------------------------------- */
  function renderNavbarModals() {
    var html = [
      /* ---------- Clock-out modal ---------- */
      '<div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">',
      '  <div class="modal-dialog modal-dialog-centered">',
      '    <div class="modal-content">',
      '      <div class="modal-header">',
      '        <h5 class="modal-title" id="logoutModalLabel">Closing Balance</h5>',
      '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>',
      '      </div>',
      '      <div class="modal-body">',
      '        <form id="clockOutForm" onsubmit="event.preventDefault(); alert(\'This is a demo — no backend connected\')">',
      '          <div class="mb-3">',
      '            <label for="closingBalance" class="form-label">Enter Closing Balance Amount</label>',
      '            <input type="number" class="form-control" id="closingBalance" placeholder="0.00" min="0" step="0.01">',
      '          </div>',
      '          <button type="submit" class="btn btn-primary w-100">Clock-Out</button>',
      '        </form>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',

      /* ---------- Open Store modal ---------- */
      '<div class="modal fade" id="openStoreModal" tabindex="-1" aria-labelledby="openStoreModalLabel" aria-hidden="true">',
      '  <div class="modal-dialog modal-dialog-centered">',
      '    <div class="modal-content">',
      '      <div class="modal-header">',
      '        <h5 class="modal-title" id="openStoreModalLabel">Set Password</h5>',
      '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>',
      '      </div>',
      '      <div class="modal-body">',
      '        <form id="openStoreForm" onsubmit="event.preventDefault(); alert(\'This is a demo — no backend connected\')">',
      '          <div class="mb-3">',
      '            <label for="storePassword" class="form-label">Store Password</label>',
      '            <input type="text" class="form-control" id="storePassword" placeholder="Enter store password">',
      '          </div>',
      '          <button type="submit" class="btn btn-success w-100">Open Store</button>',
      '        </form>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',

      /* ---------- Close Store modal ---------- */
      '<div class="modal fade" id="closeStoreModal" tabindex="-1" aria-labelledby="closeStoreModalLabel" aria-hidden="true">',
      '  <div class="modal-dialog modal-dialog-centered">',
      '    <div class="modal-content">',
      '      <div class="modal-header">',
      '        <h5 class="modal-title" id="closeStoreModalLabel">Enter Password to Close Store</h5>',
      '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>',
      '      </div>',
      '      <div class="modal-body">',
      '        <form id="closeStoreForm" onsubmit="event.preventDefault(); alert(\'This is a demo — no backend connected\')">',
      '          <div class="mb-3">',
      '            <label for="closeStorePassword" class="form-label">Store Password</label>',
      '            <input type="text" class="form-control" id="closeStorePassword" placeholder="Enter password">',
      '          </div>',
      '          <div class="d-flex gap-2">',
      '            <button type="submit" class="btn btn-danger flex-fill">YES – Close Store</button>',
      '            <button type="button" class="btn btn-secondary flex-fill" data-bs-dismiss="modal">NO</button>',
      '          </div>',
      '        </form>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');

    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    while (wrapper.firstChild) {
      document.body.appendChild(wrapper.firstChild);
    }
  }

  /* --------------------------------------------------------
     Popup backdrop helpers
  -------------------------------------------------------- */
  function showPopupBackdrop() {
    var bd = document.getElementById('popupBackdrop');
    if (bd) bd.style.display = 'block';
  }

  function hidePopupBackdrop() {
    var bd = document.getElementById('popupBackdrop');
    if (bd) bd.style.display = 'none';
  }

  /* --------------------------------------------------------
     Detail popup helpers
  -------------------------------------------------------- */
  function showDetailPopup() {
    var popup = document.getElementById('detailPopup');
    if (popup) popup.style.display = 'block';
    showPopupBackdrop();
  }

  function hideDetailPopup() {
    var popup = document.getElementById('detailPopup');
    if (popup) popup.style.display = 'none';
    hidePopupBackdrop();
  }

  /* --------------------------------------------------------
     Camera / capture helpers
  -------------------------------------------------------- */
  var _stream = null;

  function stopStream() {
    if (_stream) {
      _stream.getTracks().forEach(function (t) { t.stop(); });
      _stream = null;
    }
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
      .then(function (stream) {
        _stream = stream;
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        alert('Camera access denied or unavailable: ' + err.message);
        hideCamera(popupId);
      });
  }

  function captureImage(videoId, canvasId, capturedId) {
    var video   = document.getElementById(videoId);
    var canvas  = document.getElementById(canvasId);
    var captured = document.getElementById(capturedId);

    if (!video || !canvas) return;

    canvas.width  = video.videoWidth  || 320;
    canvas.height = video.videoHeight || 240;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    var dataUrl = canvas.toDataURL('image/png');
    if (captured) {
      captured.src = dataUrl;
      captured.style.display = 'block';
    }
    video.style.display = 'none';
    stopStream();
  }

  function restartCamera(videoId, canvasId, capturedId, popupId) {
    var captured = document.getElementById(capturedId);
    var video    = document.getElementById(videoId);
    if (captured) captured.style.display = 'none';
    if (video)    video.style.display    = 'block';
    startCamera(videoId, popupId);
  }

  function savePopup(popupId, displayId, hiddenInputId) {
    var canvas  = document.getElementById('cameraCanvas');
    var dataUrl = canvas ? canvas.toDataURL('image/png') : '';

    var display = document.getElementById(displayId);
    if (display && dataUrl) {
      display.src = dataUrl;
      display.style.display = 'block';
    }

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
    renderNavbar:       renderNavbar,
    renderNavbarModals: renderNavbarModals,
    showDetailPopup:    showDetailPopup,
    hideDetailPopup:    hideDetailPopup,
    showPopupBackdrop:  showPopupBackdrop,
    hidePopupBackdrop:  hidePopupBackdrop,
    startCamera:        startCamera,
    captureImage:       captureImage,
    restartCamera:      restartCamera,
    savePopup:          savePopup,
    stopStream:         stopStream,
    hideCamera:         hideCamera
  };

}());
