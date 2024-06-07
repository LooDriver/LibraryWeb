class Favorite {
    static AddBookToFavorite(bookName) {
        $.post(`${this.favoriteUrl}/addFavorite`, { 'nameBook': bookName, 'userID': sessionStorage.getItem('userid') }, () => {
            window.location.reload();
        });
    }
    static ShowListFavorite() {
        $.get(`${this.favoriteUrl}/getFavorite`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            const favoriteElement = data.map(favoriteData => `
                <li>
                    <a class="btn text-align-center" href="/book/name?${encodeURIComponent(favoriteData.кодКнигиNavigation.название)}" id="a-redirect-about-book">${favoriteData.кодКнигиNavigation.название}</a>
                </li>
            `);
            $('#div-favorite-list').append(favoriteElement.join(""));
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
