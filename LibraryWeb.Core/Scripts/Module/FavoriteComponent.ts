import { checkIfFavoriteOrCartExists } from '../Utils/ValidationFavoriteAndCartUtils';

export default class Favorite {

    private static favoriteUrl = '/api/favorite';

    public static AddBookToFavorite(bookName: string) {
        checkIfFavoriteOrCartExists(bookName, `${this.favoriteUrl}/existFavorite`).then((result) => {
            if (result) {
                $('#btn-favorite-about-book').text('Удалить из избранного');
            } else {
                $.post(`${this.favoriteUrl}/addFavorite`, { 'nameBook': bookName, 'userID': sessionStorage.getItem('userid') }, () => {
                    window.location.reload();
                });
            }
        });
    }

    public static ShowListFavorite() {
        $.get(`${this.favoriteUrl}/getFavorite`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            var arr = [];
            data.forEach(data => {
                arr.push('<li>');
                arr.push(`<a class="btn text-align-center" href="/book/name?${encodeURIComponent(data.кодКнигиNavigation.название)}" id="a-redirect-about-book">${data.кодКнигиNavigation.название}</a>`);
                arr.push('</li>');
            });
            $('#div-favorite-list').append(arr.join(""));
        }));
    }

    public static RemoveFromFavorite(bookName: string) {
        $.post(`${this.favoriteUrl}/deleteFavorite`, { 'bookName': bookName }, () => {
            window.location.reload();
        });
    }
}