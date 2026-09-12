import * as Book from './Module/BooksComponent';
function readFileAsByteArray(input, callback) {
    const reader = new FileReader();
    const files = $(input).prop('files');
    if (files && files.length > 0) {
        const file = files[0];
        reader.onload = (event) => {
            var _a;
            const arrayBuffer = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const byteArray = new Uint8Array(arrayBuffer);
            callback(byteArray);
        };
        reader.readAsArrayBuffer(file);
    }
}
function byteArrayToBase64(byteArray) {
    return new Promise((resolve) => {
        const blob = new Blob([byteArray], { type: 'application/octet-stream' });
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            }
            else {
                resolve(null);
            }
        };
        reader.readAsDataURL(blob);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.href.substring((window.location.href.indexOf('8') + 1));
    switch (currentUrl) {
        case '/': {
            Book.GetAllBooks();
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
});
//# sourceMappingURL=main.js.map