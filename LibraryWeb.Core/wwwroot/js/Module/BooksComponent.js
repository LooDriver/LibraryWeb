var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkIfFavoriteOrCartExists } from '../Utils/ValidationFavoriteAndCartUtils';
import Comment from './CommentComponent';
const BOOK_API_ENDPOINT = '/api/books';
export function GetCurrentBookByName(bookTitle) {
    $.get(this.bookUrl, { 'name': bookTitle })
        .done(data => {
        sessionStorage.setItem('bookData', JSON.stringify(data));
        window.location.href = `/book/name?${data.название}`;
    });
}
export function GetAllBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${BOOK_API_ENDPOINT}/allBooks`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const books = yield response.json();
            createTileBooks(books);
        }
        catch (error) {
            console.error(`Сетевая ошибка или сбой запроса: ${error}`);
        }
    });
}
export function createAboutBook(book) {
    this.setupBookElements(book);
    this.showCommentsIfLoggedIn(book.название);
    if (sessionStorage.getItem('userid') !== undefined) {
        this.setupFavoriteButton(book.название, '/api/favorite/existFavorite');
        this.setupCartButton(book.название, '/api/cart/existCartItem');
    }
}
function setupBookElements(book) {
    $('#span-information-quantity').text('0');
    $('#h2-title-about-book').text(`${book.название}`);
    $('#p-author-about-book').text(`Автор - ${book.автор}`);
    $('#p-genre-about-book').text(`Жанр - ${book.жанр}`);
    $('#p-publisher-about-book').text(`Издательство - ${book.кодИздательстваNavigation.название}`);
    $('#p-available-about-book').text(`Цена - ${book.цена} руб.`);
    $('#p-quantity-about-book').text(`${book.наличие}`);
    $('#p-description-about-book').text(`${book.описание}`);
    $('#img-cover-about-book').attr('src', `data:image/png;base64,${book.обложка}`);
    $('#input-range-quantity-about-book').attr('max', `${book.наличие}`);
}
function showCommentsIfLoggedIn(bookTitle) {
    Comment.ShowAllComments(bookTitle);
    sessionStorage.getItem('userid') === null ? $('#form-new-comments').hide() : $('#form-new-comments').show();
}
function setupFavoriteButton(bookTitle, url) {
    this.setupButton('#btn-favorite-about-book', bookTitle, url, 'Удалить из избранного', 'Добавить в избранное');
}
function setupCartButton(bookTitle, url) {
    this.setupButton('#btn-cart-book', bookTitle, url, 'Удалить из корзины', 'Добавить в корзину');
}
function setupButton(buttonId, bookTitle, url, successText, failureText) {
    checkIfFavoriteOrCartExists(bookTitle, url)
        .then(result => $(buttonId).text(result ? successText : failureText));
}
function createTileBooks(books) {
    const bookTiles = books.map(book => `
            <div class="col-md-2 mt-3">
                <div class="tile">
                    <div class="tile-content">
                     <div class="tile-book" style="display:none;">${book.название}</div>
                        <figure>
                        <button class="btn-book-tiles" ${book.наличие == 0 ? 'disabled="true"' : ''}>
                            <img src="data:image/png;base64,${book.обложка}" width="150" height="200">
                        </button>
                            <figcaption>${book.наличие == 0 ? 'Нету в наличии книги' : ''} ${book.название}</figcaption>
                        </figure>
                    </div>
                </div>
            </div>`);
    document.getElementById('div-book-tiles').insertAdjacentHTML('beforeend', '<div class="row">' + bookTiles.join('') + '</div>');
}
export function clearUrlBook(bookUrl) {
    return bookUrl.substr((bookUrl.indexOf('?') + 1));
}
//# sourceMappingURL=BooksComponent.js.map