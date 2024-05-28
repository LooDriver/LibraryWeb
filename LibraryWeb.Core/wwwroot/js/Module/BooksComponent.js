import { checkIfFavoriteOrCartExists } from '../Utils/ValidationFavoriteAndCartUtils';
import Comment from './CommentComponent';
class Book {
    static GetCurrentBookByName(bookTitle) {
        $.get(this.bookUrl, { 'name': bookTitle })
            .done(data => {
            sessionStorage.setItem('bookData', JSON.stringify(data));
            window.location.href = `/book/name?${data.название}`;
        });
    }
    static GetAllBooks() {
        $.get(`${this.bookUrl}/allBooks`)
            .done(data => this.createTileBooks(data));
    }
    static createAboutBook(book) {
        this.setupBookElements(book);
        this.showCommentsIfLoggedIn(book.название);
        if (sessionStorage.getItem('userid') !== undefined) {
            this.setupFavoriteButton(book.название, '/api/favorite/existFavorite');
            this.setupCartButton(book.название, '/api/cart/existCartItem');
        }
    }
    static setupBookElements(book) {
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
    static showCommentsIfLoggedIn(bookTitle) {
        Comment.ShowAllComments(bookTitle);
        sessionStorage.getItem('userid') === null ? $('#form-new-comments').hide() : $('#form-new-comments').show();
    }
    static setupFavoriteButton(bookTitle, url) {
        this.setupButton('#btn-favorite-about-book', bookTitle, url, 'Удалить из избранного', 'Добавить в избранное');
    }
    static setupCartButton(bookTitle, url) {
        this.setupButton('#btn-cart-book', bookTitle, url, 'Удалить из корзины', 'Добавить в корзину');
    }
    static setupButton(buttonId, bookTitle, url, successText, failureText) {
        checkIfFavoriteOrCartExists(bookTitle, url)
            .then(result => $(buttonId).text(result ? successText : failureText));
    }
    static createTileBooks(books) {
        const bookTiles = books.map(book => `
            <div class="col-md-2 mt-3">
                <div class="tile">
                    <div class="tile-content">
                     <div class="tile-book" style="display:none;">${book.название}</div>
                        <figure>
                        <button class="btn-about-book" ${book.наличие == 0 ? 'disabled="true"' : ''}>
                            <img src="data:image/png;base64,${book.обложка}" width="150" height="200">
                        </button>
                            <figcaption>${book.наличие == 0 ? 'Нету в наличии книги' : ''} ${book.название}</figcaption>
                        </figure>
                    </div>
                </div>
            </div>`);
        $('#tileContainer').append('<div class="row">' + bookTiles.join('') + '</div>');
    }
    static clearUrlBook(bookUrl) {
        return bookUrl.substr((bookUrl.indexOf('?') + 1));
    }
}
Book.bookUrl = '/api/books';
export default Book;
