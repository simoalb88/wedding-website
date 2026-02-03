// Password protection check - add to all pages
(function() {
    const STORAGE_KEY = 'wedding_authenticated';
    if (sessionStorage.getItem(STORAGE_KEY) !== 'true') {
        window.location.href = 'password.html';
    }
})();
