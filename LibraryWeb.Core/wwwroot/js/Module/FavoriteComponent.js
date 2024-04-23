import { checkIfFavoriteOrCartExists } from '../Utils/ValidationFavoriteAndCartUtils';
class Favorite {
    static AddBookToFavorite(bookName) {
        checkIfFavoriteOrCartExists(bookName, `${this.favoriteUrl}/existFavorite`).then((result) => {
            if (result) {
                $('#btn-favorite-about-book').text('Удалить из избранного');
            }
            else {
                $.post(`${this.favoriteUrl}/addFavorite`, { 'nameBook': bookName, 'userID': sessionStorage.getItem('userid') }, () => {
                    window.location.reload();
                });
            }
        });
    }
    static ShowListFavorite() {
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
    static RemoveFromFavorite(bookName) {
        $.post(`${this.favoriteUrl}/deleteFavorite`, { 'bookName': bookName }, () => {
            window.location.reload();
        });
    }
}
Favorite.favoriteUrl = '/api/favorite';
export default Favorite;
//# sourceMappingURL=FavoriteComponent.js.map