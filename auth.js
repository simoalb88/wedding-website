// Identity gate — add to all gated pages.
// Guests are identified by a name lookup on welcome.html, which stores their
// profile in sessionStorage. If no profile is present, send them to welcome.html.
(function () {
    const KEY = 'wedding_guest';
    let valid = false;
    try {
        const raw = sessionStorage.getItem(KEY);
        valid = !!(raw && JSON.parse(raw) && JSON.parse(raw).firstName);
    } catch (e) {
        valid = false;
    }
    if (!valid) {
        window.location.href = 'welcome.html';
    }
})();
