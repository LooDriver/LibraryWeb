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
        $('#img-cover-about-book').attr('src', `data:image/png;base64,${book.обложка}`);
        $('#h2-title-about-book').text(`${book.название}`);
        $('#p-author-about-book').text(`${book.автор}`);
        $('#p-genre-about-book').text(`Жанр - ${book.жанр}`);
        $('#p-available-about-book').text(`Цена - ${book.цена} руб.`);
        $('#p-quantity-about-book').text(`${book.наличие}`);
        $('#input-quantity-about-book').attr('max', `${book.наличие}`);
        this.showCommentsIfLoggedIn(book.название);
        if (sessionStorage.getItem('userid') !== undefined) {
            this.setupFavoriteButton(book.название, '/api/favorite/existFavorite');
            this.setupCartButton(book.название, '/api/cart/existCartItem');
        }
    }
    static showCommentsIfLoggedIn(bookTitle) {
        Comment.ShowAllComments(bookTitle);
        sessionStorage.getItem('userid').length == 0 ? $('#form-new-comments').hide() : $('#form-new-comments').show();
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
                        <div class="tile-book">${book.название}</div>
                        <button class="btn-about-book" ${book.наличие == 0 ? 'disabled="true"' : ''}>
                            <img src="data:image/png;base64,${book.обложка}" width="150" height="200" alt="${book.наличие == 0 ? 'Нету в наличии' : 'Обложка'} книги ${book.название}">
                        </button>
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
//# sourceMappingURL=BooksComponent.js.map