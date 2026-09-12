import { checkIfFavoriteOrCartExists } from '../Utils/ValidationFavoriteAndCartUtils';
import Comment from './CommentComponent';

const BOOK_API_ENDPOINT = '/api/books';

export function GetCurrentBookByName(bookTitle: string) {
    $.get(this.bookUrl, { 'name': bookTitle })
        .done(data => {
            sessionStorage.setItem('bookData', JSON.stringify(data));
            window.location.href = `/book/name?${data.название}`;
        });
}

export async function GetAllBooks(): Promise <void> {
    try {
        const response = await fetch(`${BOOK_API_ENDPOINT}/allBooks`);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const books = await response.json();
        createTileBooks(books);
    } catch (error) {
        console.error(`Сетевая ошибка или сбой запроса: ${error}`);
    }   
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

    function showCommentsIfLoggedIn(bookTitle: string) {
    Comment.ShowAllComments(bookTitle);
    sessionStorage.getItem('userid') === null ? $('#form-new-comments').hide() : $('#form-new-comments').show();
}

    function setupFavoriteButton(bookTitle: string, url: string) {
    this.setupButton('#btn-favorite-about-book', bookTitle, url, 'Удалить из избранного', 'Добавить в избранное');
}

    function setupCartButton(bookTitle: string, url: string) {
    this.setupButton('#btn-cart-book', bookTitle, url, 'Удалить из корзины', 'Добавить в корзину');
}

    function setupButton(buttonId: string, bookTitle: string, url: string, successText: string, failureText: string) {
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

export function clearUrlBook(bookUrl: string) {
    return bookUrl.substr((bookUrl.indexOf('?') + 1));
}