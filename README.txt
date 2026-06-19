The-Palace — Management Suite (static web app)
===============================================

HOW TO RUN IT
-------------

Option A — Just open it (easiest)
  1. Unzip this folder anywhere.
  2. Double-click  login.html  (it opens in your browser).
  3. Click "Sign in" to enter the app, then click around the sidebar.

  Note: needs an internet connection (it loads Bootstrap/jQuery/DataTables
  from a CDN). The "Capture Image" camera buttons only work over a local
  server (Option B), not when opened as a file.

Option B — Run a local server (full functionality, recommended)
  Open a terminal in this folder and run ONE of these:

    Python:   python3 -m http.server 8000
    Node:     npx serve .

  Then open:  http://localhost:8000/login.html


WHAT'S INSIDE
-------------
  login.html ............ sign-in screen (entry point)
  index.html ............ dashboard home

  Operations:
    match.html, ticket.html, expenses.html, report.html,
    customer.html, employee.html

  Accounting:
    game.html, acc-expenses.html, cash-verification.html,
    all-reports.html, summary.html, insert-game.html, note.html

  System:
    admin.html, select-store.html

  assets/css/styles.css ... the design system
  assets/js/shared.js ..... sidebar/topbar shell + shared helpers

This is a front-end demo: forms show a "demo — no backend" message
instead of saving data.
