export function checkIfFavoriteOrCartExists(currentBook: string, url: string) {
    return new Promise<boolean>((resolve) => {
        $.get(url, { 'userID': sessionStorage.getItem('userid'), 'bookName': currentBook }, () => {
            resolve(true);
        }).fail(() => {
            resolve(false);
        });
    });
}