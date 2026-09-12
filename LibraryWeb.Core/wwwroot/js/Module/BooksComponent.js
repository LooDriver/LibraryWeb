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
import * as Comment from './CommentComponent';
const BOOK_API_ENDPOINT = '/api/books';
export function GetCurrentBookByName(bookTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryParams = new URLSearchParams({ name: bookTitle }).toString();
            const response = yield fetch(`${BOOK_API_ENDPOINT}?${queryParams}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const bookData = yield response.json();
            sessionStorage.setItem('bookData', JSON.stringify(bookData));
            window.location.href = `/book/name?${encodeURIComponent(bookData.название)}`;
        }
        catch (error) {
            console.error(`Сетевая ошибка или сбой запроса: ${error}`);
        }
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
    setupBookElements(book);
    showCommentsIfLoggedIn(book.название);
}
function setupBookElements(book) {
    setText('span-information-quantity', '0');
    setText('h2-title-about-book', `${book.название}`);
    setText('p-author-about-book', `Автор - ${book.автор}`);
    setText('p-genre-about-book', `Жанр - ${book.жанр}`);
    setText('p-publisher-about-book', `Издательство - ${book.кодИздательстваNavigation.название}`);
    setText('p-available-about-book', `Цена - ${book.цена} руб.`);
    setText('p-quantity-about-book', `${book.наличие}`);
    setText('p-description-about-book', `${book.описание}`);
    setAttr('img-cover-about-book', 'src', `data:image/png;base64,${book.обложка}`);
    setAttr('input-range-quantity-about-book', 'max', `${book.наличие}`);
}
function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}
function setAttr(id, attrName, newAttr) {
    const element = document.getElementById(id);
    if (element) {
        element.setAttribute(attrName, newAttr);
    }
}
function showCommentsIfLoggedIn(bookTitle) {
    Comment.ShowAllComments(bookTitle);
    const isLoggedIn = sessionStorage.getItem('userid') !== null;
    const commentsForm = document.getElementById('form-new-comments');
    if (commentsForm) {
        commentsForm.style.display = isLoggedIn ? '' : 'none';
    }
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