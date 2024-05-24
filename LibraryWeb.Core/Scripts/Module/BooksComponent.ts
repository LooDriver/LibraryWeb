import { checkIfFavoriteOrCartExists } from '../Utils/ValidationFavoriteAndCartUtils';
import Comment from './CommentComponent';

export default class Book {

    private static bookUrl = '/api/books';

    public static GetCurrentBookByName(bookTitle: string) {
        $.get(this.bookUrl, { 'name': bookTitle })
            .done(data => {
                sessionStorage.setItem('bookData', JSON.stringify(data));
                window.location.href = `/book/name?${data.название}`;
            });
    }

    public static GetAllBooks() {
        $.get(`${this.bookUrl}/allBooks`)
            .done(data => this.createTileBooks(data));
    }

    public static createAboutBook(book) {

        $('#span-information-quantity').text('0');
        $('#h2-title-about-book').text(`${book.название}`);
        $('#p-author-about-book').text(`${book.автор}`);
        $('#p-genre-about-book').text(`Жанр - ${book.жанр}`);
        $('#p-available-about-book').text(`Цена - ${book.цена} руб.`);
        $('#p-quantity-about-book').text(`${book.наличие}`);

        $('#img-cover-about-book').attr('src', `data:image/png;base64,${book.обложка}`);
        $('#input-range-quantity-about-book').attr('max', `${book.наличие}`);

        this.showCommentsIfLoggedIn(book.название);

        if (sessionStorage.getItem('userid') !== undefined) {
            this.setupFavoriteButton(book.название, '/api/favorite/existFavorite');
            this.setupCartButton(book.название, '/api/cart/existCartItem');
        }
    }

    private static showCommentsIfLoggedIn(bookTitle: string) {
        Comment.ShowAllComments(bookTitle);
        sessionStorage.getItem('userid') === null ? $('#form-new-comments').hide() : $('#form-new-comments').show();
    }


    private static setupFavoriteButton(bookTitle: string, url:string) {
        this.setupButton('#btn-favorite-about-book', bookTitle, url, 'Удалить из избранного', 'Добавить в избранное');
    }

    private static setupCartButton(bookTitle: string, url:string) {
        this.setupButton('#btn-cart-book', bookTitle, url, 'Удалить из корзины', 'Добавить в корзину');
    }

    private static setupButton(buttonId: string, bookTitle: string, url: string, successText: string, failureText: string) {
        checkIfFavoriteOrCartExists(bookTitle, url)
            .then(result => $(buttonId).text(result ? successText : failureText));
    }

    private static createTileBooks(books) {
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

    public static clearUrlBook(bookUrl: string) {
        return bookUrl.substr((bookUrl.indexOf('?') + 1));
    }
}