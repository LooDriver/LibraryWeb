/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/js/Module/BooksComponent.js":
/*!*********************************************!*\
  !*** ./wwwroot/js/Module/BooksComponent.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GetAllBooks: () => (/* binding */ GetAllBooks),
/* harmony export */   GetCurrentBookByName: () => (/* binding */ GetCurrentBookByName),
/* harmony export */   clearUrlBook: () => (/* binding */ clearUrlBook),
/* harmony export */   createAboutBook: () => (/* binding */ createAboutBook)
/* harmony export */ });
/* harmony import */ var _Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/ValidationFavoriteAndCartUtils */ "./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js");
/* harmony import */ var _CommentComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentComponent */ "./wwwroot/js/Module/CommentComponent.js");
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


const BOOK_API_ENDPOINT = '/api/books';
function GetCurrentBookByName(bookTitle) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const queryParams = new URLSearchParams({
        name: bookTitle
      }).toString();
      const response = yield fetch(`${BOOK_API_ENDPOINT}?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const bookData = yield response.json();
      sessionStorage.setItem('bookData', JSON.stringify(bookData));
      window.location.href = `/book/name?${encodeURIComponent(bookData.название)}`;
    } catch (error) {
      console.error(`Сетевая ошибка или сбой запроса: ${error}`);
    }
  });
}
function GetAllBooks() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const response = yield fetch(`${BOOK_API_ENDPOINT}/allBooks`);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const books = yield response.json();
      createTileBooks(books);
    } catch (error) {
      console.error(`Сетевая ошибка или сбой запроса: ${error}`);
    }
  });
}
function createAboutBook(book) {
  setupBookElements(book);
  showCommentsIfLoggedIn(book.название);
}
function setupBookElements(book) {
  setText('span-information-quantity', '0');
  setText('h2-title-about-book', `${book.название}`);
  setText('p-author-about-book', `Автор - ${book.автор}`);
  setText('p-genre-about-book', `Жанр - ${book.жанр}`);
  setText('p-publisher-about-book', `Издательство - ${book.кодИздательстваNavigation.название}`);
  setText('p-available-about-book', `Цена - ${book.цена} руб.`);
  setText('p-quantity-about-book', `${book.наличие}`);
  setText('p-description-about-book', `${book.описание}`);
  setAttr('img-cover-about-book', 'src', `data:image/png;base64,${book.обложка}`);
  setAttr('input-range-quantity-about-book', 'max', `${book.наличие}`);
}
function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}
function setAttr(id, attrName, newAttr) {
  const element = document.getElementById(id);
  if (element) {
    element.setAttribute(attrName, newAttr);
  }
}
function showCommentsIfLoggedIn(bookTitle) {
  _CommentComponent__WEBPACK_IMPORTED_MODULE_1__.ShowAllComments(bookTitle);
  const isLoggedIn = sessionStorage.getItem('userid') !== null;
  const commentsForm = document.getElementById('form-new-comments');
  if (commentsForm) {
    commentsForm.style.display = isLoggedIn ? '' : 'none';
  }
}
function setupFavoriteButton(bookTitle, url) {
  this.setupButton('#btn-favorite-about-book', bookTitle, url, 'Удалить из избранного', 'Добавить в избранное');
}
function setupCartButton(bookTitle, url) {
  this.setupButton('#btn-cart-book', bookTitle, url, 'Удалить из корзины', 'Добавить в корзину');
}
function setupButton(buttonId, bookTitle, url, successText, failureText) {
  (0,_Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__.checkIfFavoriteOrCartExists)(bookTitle, url).then(result => $(buttonId).text(result ? successText : failureText));
}
function createTileBooks(books) {
  const bookTiles = books.map(book => `
            <div class="col-md-2 mt-3">
                <div class="tile">
                    <div class="tile-content">
                     <div class="tile-book" style="display:none;">${book.название}</div>
                        <figure>
                        <button class="btn-book-tiles" ${book.наличие == 0 ? 'disabled="true"' : ''}>
                            <img src="data:image/png;base64,${book.обложка}" width="150" height="200">
                        </button>
                            <figcaption>${book.наличие == 0 ? 'Нету в наличии книги' : ''} ${book.название}</figcaption>
                        </figure>
                    </div>
                </div>
            </div>`);
  document.getElementById('div-book-tiles').insertAdjacentHTML('beforeend', '<div class="row">' + bookTiles.join('') + '</div>');
}
function clearUrlBook(bookUrl) {
  return bookUrl.substr(bookUrl.indexOf('?') + 1);
}

/***/ }),

/***/ "./wwwroot/js/Module/CommentComponent.js":
/*!***********************************************!*\
  !*** ./wwwroot/js/Module/CommentComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShowAllComments: () => (/* binding */ ShowAllComments)
/* harmony export */ });
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const COMMENT_API_ENDPOINT = '/api/comment';
function PostNewComment(comments) {
  $.post(`${this.commentUrl}/addComment`, {
    'comment': comments,
    'userID': sessionStorage.getItem('userid'),
    'bookName': $('#h2-title-about-book').text()
  }, () => {
    $('#textarea-user-comment').empty();
    window.location.reload();
  });
}
function ShowAllComments(book) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      const queryParams = new URLSearchParams({
        bookname: book
      }).toString();
      const response = yield fetch(`${COMMENT_API_ENDPOINT}/getAllComments?${queryParams}`);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const comments = yield response.json();
      createComments(comments);
    } catch (error) {
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
  document.getElementById('section-users-comments').insertAdjacentHTML('beforeend', commentHtmlView.join(''));
}

/***/ }),

/***/ "./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js":
/*!************************************************************!*\
  !*** ./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkIfFavoriteOrCartExists: () => (/* binding */ checkIfFavoriteOrCartExists)
/* harmony export */ });
function checkIfFavoriteOrCartExists(currentBook, url) {
  return new Promise(resolve => {
    $.get(url, {
      'userID': sessionStorage.getItem('userid'),
      'bookName': currentBook
    }, () => {
      resolve(true);
    }).fail(() => {
      resolve(false);
    });
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./wwwroot/js/main.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Module/BooksComponent */ "./wwwroot/js/Module/BooksComponent.js");

document.addEventListener('DOMContentLoaded', () => {
  const currentUrl = window.location.href.substring(window.location.href.indexOf('8') + 1);
  if (window.location.href.includes('/book/name')) _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.createAboutBook(JSON.parse(sessionStorage.getItem('bookData')));
  switch (currentUrl) {
    case '/':
      {
        _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.GetAllBooks();
        if (window.location.href.includes('/book/name')) _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.createAboutBook(JSON.parse(sessionStorage.getItem('bookData')));
        break;
      }
    case '/cart':
      {
        break;
      }
    case '/profile':
      {
        break;
      }
    case '/pickup-point':
      {
        break;
      }
    case '/profileComment':
      {
        break;
      }
  }
  document.addEventListener('click', event => {
    const target = event.target.closest('a-redirect-cart-about-book, a-redirect-profile-book, a-redirect-about-book');
    if (!target) return;
    event.preventDefault();
    const rawHref = target.getAttribute('href');
    if (rawHref) {
      _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.GetCurrentBookByName(_Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.clearUrlBook(decodeURI(rawHref)));
    }
  });
  document.addEventListener('click', event => {
    var _a, _b, _c;
    const target = event.target.closest('div-book-tiles, .btn-book-tiles');
    if (!target) return;
    const bookTile = (_c = (_b = (_a = target.closest('.tile')) === null || _a === void 0 ? void 0 : _a.querySelector('.tile-book')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim();
    _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.GetCurrentBookByName(bookTile);
  });
});
})();

/******/ })()
;
//# sourceMappingURL=main_bundle.js.map