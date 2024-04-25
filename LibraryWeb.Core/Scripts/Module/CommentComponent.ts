export default class Comments {

    private static commentUrl = '/api/comment'

    public static PostNewComment(comments: string) {
        $.post(`${this.commentUrl}/addComment`, { 'comment': comments, 'userID': sessionStorage.getItem('userid'), 'bookName': $('#h2-title-about-book').text() }, () => {
            $('#textarea-user-comment').empty();
            window.location.reload();
        });
    }

    public static ShowAllComments(book: string) {
        $.get(`${this.commentUrl}/getAllComments`, { 'bookName': book }, (data) => {
            this.createComments(data);
        });
    }

    private static createComments(comments) {
        var commentArr = [];
        comments.forEach(comments => {
            commentArr.push('<div class="comment">');
            commentArr.push(`<a class="btn a-redirect-comment-user-profile"><span class="author">${comments.кодПользователяNavigation.логин}</span></a>`);
            commentArr.push(`<div class="content">'${comments.текстКомментария}</div>`);
            commentArr.push('</div>');
        });
        $('#section-users-comments').append(commentArr.join('\n'));
    }
}