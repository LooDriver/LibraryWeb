

const COMMENT_API_ENDPOINT = '/api/comment'

function PostNewComment(comments: string) {
    $.post(`${this.commentUrl}/addComment`, { 'comment': comments, 'userID': sessionStorage.getItem('userid'), 'bookName': $('#h2-title-about-book').text() }, () => {
        $('#textarea-user-comment').empty();
        window.location.reload();
    });
}

export async function ShowAllComments(book: string): Promise<void> {
    try {
        const queryParams = new URLSearchParams({ bookname: book }).toString();
        const response = await fetch(`${COMMENT_API_ENDPOINT}?${queryParams}`);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const comments = await response.json();

        createComments(comments);
    } catch (error) {
        console.error(`Сетевая ошибка или сбой запроса: ${error}`);
    }
}

function createComments(comments) {
    const commentHtmlView = comments.map(comment => `
                <div class="comment">
                    <a class="btn a-redirect-comment-user-profile"><span class="author">${comment.кодПользователяNavigation.логин}</span></a>
                    <div class="content">${comment.текстКомментария}</div>
                </div>`);
    $('#section-users-comments').append(commentHtmlView.join(''));
}