class Comments {
    static PostNewComment(comments) {
        $.post(`${this.commentUrl}/addComment`, { 'comment': comments, 'userID': sessionStorage.getItem('userid'), 'bookName': $('#h2-title-about-book').text() }, () => {
            $('#textarea-user-comment').empty();
            window.location.reload();
        });
    }
    static ShowAllComments(book) {
        $.get(`${this.commentUrl}/getAllComments`, { 'bookName': book }, (data) => {
            this.createComments(data);
        });
    }
    static createComments(comments) {
        const commentHtmlView = comments.map(comment => `
                <div class="comment">
                    <a class="btn a-redirect-comment-user-profile"><span class="author">${comment.кодПользователяNavigation.логин}</span></a>
                    <div class="content">${comment.текстКомментария}</div>
                </div>`);
        $('#section-users-comments').append(commentHtmlView.join(''));
    }
}
Comments.commentUrl = '/api/comment';
export default Comments;
