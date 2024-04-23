export function checkIfFavoriteOrCartExists(currentBook, url) {
    return new Promise((resolve) => {
        $.get(url, { 'userID': sessionStorage.getItem('userid'), 'bookName': currentBook }, () => {
            resolve(true);
        }).fail(() => {
            resolve(false);
        });
    });
}
//# sourceMappingURL=ValidationFavoriteAndCartUtils.js.map