import * as Book from './Module/BooksComponent';
document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.href.substring((window.location.href.indexOf('8') + 1));
    if (window.location.href.includes('/book/name'))
        Book.createAboutBook(JSON.parse(sessionStorage.getItem('bookData')));
    switch (currentUrl) {
        case '/': {
            Book.GetAllBooks();
            if (window.location.href.includes('/book/name'))
                Book.createAboutBook(JSON.parse(sessionStorage.getItem('bookData')));
            break;
        }
        case '/cart': {
            break;
        }
        case '/profile': {
            break;
        }
        case '/pickup-point': {
            break;
        }
        case '/profileComment': {
            break;
        }
    }
    document.addEventListener('click', (event) => {
        const target = event.target.closest('a-redirect-cart-about-book, a-redirect-profile-book, a-redirect-about-book');
        if (!target)
            return;
        event.preventDefault();
        const rawHref = target.getAttribute('href');
        if (rawHref) {
            Book.GetCurrentBookByName(Book.clearUrlBook(decodeURI(rawHref)));
        }
    });
    document.addEventListener('click', (event) => {
        var _a, _b, _c;
        const target = event.target.closest('div-book-tiles, .btn-book-tiles');
        if (!target)
            return;
        const bookTile = (_c = (_b = (_a = target.closest('.tile')) === null || _a === void 0 ? void 0 : _a.querySelector('.tile-book')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim();
        Book.GetCurrentBookByName(bookTile);
    });
});
//# sourceMappingURL=main.js.map