/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./wwwroot/js/Module/BooksComponent.js":
/*!*********************************************!*\
  !*** ./wwwroot/js/Module/BooksComponent.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GetAllBooks: () => (/* binding */ GetAllBooks),\n/* harmony export */   GetCurrentBookByName: () => (/* binding */ GetCurrentBookByName),\n/* harmony export */   clearUrlBook: () => (/* binding */ clearUrlBook),\n/* harmony export */   createAboutBook: () => (/* binding */ createAboutBook)\n/* harmony export */ });\n/* harmony import */ var _Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/ValidationFavoriteAndCartUtils */ \"./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js\");\n/* harmony import */ var _CommentComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentComponent */ \"./wwwroot/js/Module/CommentComponent.js\");\nvar __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\n\nconst BOOK_API_ENDPOINT = '/api/books';\nfunction GetCurrentBookByName(bookTitle) {\n  $.get(this.bookUrl, {\n    'name': bookTitle\n  }).done(data => {\n    sessionStorage.setItem('bookData', JSON.stringify(data));\n    window.location.href = `/book/name?${data.название}`;\n  });\n}\nfunction GetAllBooks() {\n  return __awaiter(this, void 0, void 0, function* () {\n    try {\n      const response = yield fetch(`${BOOK_API_ENDPOINT}/allBooks`);\n      if (!response.ok) {\n        throw new Error(`Ошибка HTTP: ${response.status}`);\n      }\n      const books = yield response.json();\n      createTileBooks(books);\n    } catch (error) {\n      console.error(`Сетевая ошибка или сбой запроса: ${error}`);\n    }\n  });\n}\nfunction createAboutBook(book) {\n  this.setupBookElements(book);\n  this.showCommentsIfLoggedIn(book.название);\n  if (sessionStorage.getItem('userid') !== undefined) {\n    this.setupFavoriteButton(book.название, '/api/favorite/existFavorite');\n    this.setupCartButton(book.название, '/api/cart/existCartItem');\n  }\n}\nfunction setupBookElements(book) {\n  $('#span-information-quantity').text('0');\n  $('#h2-title-about-book').text(`${book.название}`);\n  $('#p-author-about-book').text(`Автор - ${book.автор}`);\n  $('#p-genre-about-book').text(`Жанр - ${book.жанр}`);\n  $('#p-publisher-about-book').text(`Издательство - ${book.кодИздательстваNavigation.название}`);\n  $('#p-available-about-book').text(`Цена - ${book.цена} руб.`);\n  $('#p-quantity-about-book').text(`${book.наличие}`);\n  $('#p-description-about-book').text(`${book.описание}`);\n  $('#img-cover-about-book').attr('src', `data:image/png;base64,${book.обложка}`);\n  $('#input-range-quantity-about-book').attr('max', `${book.наличие}`);\n}\nfunction showCommentsIfLoggedIn(bookTitle) {\n  _CommentComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ShowAllComments(bookTitle);\n  sessionStorage.getItem('userid') === null ? $('#form-new-comments').hide() : $('#form-new-comments').show();\n}\nfunction setupFavoriteButton(bookTitle, url) {\n  this.setupButton('#btn-favorite-about-book', bookTitle, url, 'Удалить из избранного', 'Добавить в избранное');\n}\nfunction setupCartButton(bookTitle, url) {\n  this.setupButton('#btn-cart-book', bookTitle, url, 'Удалить из корзины', 'Добавить в корзину');\n}\nfunction setupButton(buttonId, bookTitle, url, successText, failureText) {\n  (0,_Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__.checkIfFavoriteOrCartExists)(bookTitle, url).then(result => $(buttonId).text(result ? successText : failureText));\n}\nfunction createTileBooks(books) {\n  const bookTiles = books.map(book => `\n            <div class=\"col-md-2 mt-3\">\n                <div class=\"tile\">\n                    <div class=\"tile-content\">\n                     <div class=\"tile-book\" style=\"display:none;\">${book.название}</div>\n                        <figure>\n                        <button class=\"btn-book-tiles\" ${book.наличие == 0 ? 'disabled=\"true\"' : ''}>\n                            <img src=\"data:image/png;base64,${book.обложка}\" width=\"150\" height=\"200\">\n                        </button>\n                            <figcaption>${book.наличие == 0 ? 'Нету в наличии книги' : ''} ${book.название}</figcaption>\n                        </figure>\n                    </div>\n                </div>\n            </div>`);\n  document.getElementById('div-book-tiles').insertAdjacentHTML('beforeend', '<div class=\"row\">' + bookTiles.join('') + '</div>');\n}\nfunction clearUrlBook(bookUrl) {\n  return bookUrl.substr(bookUrl.indexOf('?') + 1);\n}\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/BooksComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Module/CommentComponent.js":
/*!***********************************************!*\
  !*** ./wwwroot/js/Module/CommentComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Comments {\n  static PostNewComment(comments) {\n    $.post(`${this.commentUrl}/addComment`, {\n      'comment': comments,\n      'userID': sessionStorage.getItem('userid'),\n      'bookName': $('#h2-title-about-book').text()\n    }, () => {\n      $('#textarea-user-comment').empty();\n      window.location.reload();\n    });\n  }\n  static ShowAllComments(book) {\n    $.get(`${this.commentUrl}/getAllComments`, {\n      'bookName': book\n    }, data => {\n      this.createComments(data);\n    });\n  }\n  static createComments(comments) {\n    const commentHtmlView = comments.map(comment => `\n                <div class=\"comment\">\n                    <a class=\"btn a-redirect-comment-user-profile\"><span class=\"author\">${comment.кодПользователяNavigation.логин}</span></a>\n                    <div class=\"content\">${comment.текстКомментария}</div>\n                </div>`);\n    $('#section-users-comments').append(commentHtmlView.join(''));\n  }\n}\nComments.commentUrl = '/api/comment';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comments);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/CommentComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js":
/*!************************************************************!*\
  !*** ./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkIfFavoriteOrCartExists: () => (/* binding */ checkIfFavoriteOrCartExists)\n/* harmony export */ });\nfunction checkIfFavoriteOrCartExists(currentBook, url) {\n  return new Promise(resolve => {\n    $.get(url, {\n      'userID': sessionStorage.getItem('userid'),\n      'bookName': currentBook\n    }, () => {\n      resolve(true);\n    }).fail(() => {\n      resolve(false);\n    });\n  });\n}\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js?");

/***/ }),

/***/ "./wwwroot/js/main.js":
/*!****************************!*\
  !*** ./wwwroot/js/main.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Module/BooksComponent */ \"./wwwroot/js/Module/BooksComponent.js\");\n\nfunction readFileAsByteArray(input, callback) {\n  const reader = new FileReader();\n  const files = $(input).prop('files');\n  if (files && files.length > 0) {\n    const file = files[0];\n    reader.onload = event => {\n      var _a;\n      const arrayBuffer = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;\n      const byteArray = new Uint8Array(arrayBuffer);\n      callback(byteArray);\n    };\n    reader.readAsArrayBuffer(file);\n  }\n}\nfunction byteArrayToBase64(byteArray) {\n  return new Promise(resolve => {\n    const blob = new Blob([byteArray], {\n      type: 'application/octet-stream'\n    });\n    const reader = new FileReader();\n    reader.onload = () => {\n      if (typeof reader.result === 'string') {\n        resolve(reader.result.split(',')[1]);\n      } else {\n        resolve(null);\n      }\n    };\n    reader.readAsDataURL(blob);\n  });\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  const currentUrl = window.location.href.substring(window.location.href.indexOf('8') + 1);\n  switch (currentUrl) {\n    case '/':\n      {\n        _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.GetAllBooks();\n        break;\n      }\n    case '/cart':\n      {\n        break;\n      }\n    case '/profile':\n      {\n        break;\n      }\n    case '/pickup-point':\n      {\n        break;\n      }\n    case '/profileComment':\n      {\n        break;\n      }\n  }\n  document.addEventListener('click', event => {\n    const target = event.target.closest('a-redirect-cart-about-book, a-redirect-profile-book, a-redirect-about-book');\n    if (!target) return;\n    event.preventDefault();\n    const rawHref = target.getAttribute('href');\n    if (rawHref) {\n      _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.GetCurrentBookByName(_Module_BooksComponent__WEBPACK_IMPORTED_MODULE_0__.clearUrlBook(decodeURI(rawHref)));\n    }\n  });\n});\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/main.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/js/main.js");
/******/ 	
/******/ })()
;