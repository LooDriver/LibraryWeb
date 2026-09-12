var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const COMMENT_API_ENDPOINT = '/api/comment';
function PostNewComment(comments) {
    $.post(`${this.commentUrl}/addComment`, { 'comment': comments, 'userID': sessionStorage.getItem('userid'), 'bookName': $('#h2-title-about-book').text() }, () => {
        $('#textarea-user-comment').empty();
        window.location.reload();
    });
}
export function ShowAllComments(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryParams = new URLSearchParams({ bookname: book }).toString();
            const response = yield fetch(`${COMMENT_API_ENDPOINT}?${queryParams}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const comments = yield response.json();
            createComments(comments);
        }
        catch (error) {
            console.error(`Сетевая ошибка или сбой запроса: ${error}`);
        }
    });
}
function createComments(comments) {
    const commentHtmlView = comments.map(comment => `
                <div class="comment">
                    <a class="btn a-redirect-comment-user-profile"><span class="author">${comment.кодПользователяNavigation.логин}</span></a>
                    <div class="content">${comment.текстКомментария}</div>
                </div>`);
    $('#section-users-comments').append(commentHtmlView.join(''));
}
//# sourceMappingURL=CommentComponent.js.map