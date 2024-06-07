export default class Favorite {

    private static favoriteUrl = '/api/favorite';

    public static AddBookToFavorite(bookName: string) {
        $.post(`${this.favoriteUrl}/addFavorite`, { 'nameBook': bookName, 'userID': sessionStorage.getItem('userid') }, () => {
            window.location.reload();
        });
    }

    public static ShowListFavorite() {
        $.get(`${this.favoriteUrl}/getFavorite`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            const favoriteElement = data.map(favoriteData => `
                <li>
                    <a class="btn text-align-center" href="/book/name?${encodeURIComponent(favoriteData.кодКнигиNavigation.название)}" id="a-redirect-about-book">${favoriteData.кодКнигиNavigation.название}</a>
                </li>
            `);
            $('#div-favorite-list').append(favoriteElement.join(""));
        }));
    }

    public static RemoveFromFavorite(bookName: string) {
        $.post(`${this.favoriteUrl}/deleteFavorite`, { 'bookName': bookName }, () => {
            window.location.reload();
        });
    }
}