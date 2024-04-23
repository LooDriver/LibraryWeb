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

/***/ "./wwwroot/js/Module/AuthorizationComponent.js":
/*!*****************************************************!*\
  !*** ./wwwroot/js/Module/AuthorizationComponent.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/cookieUtils */ \"./wwwroot/js/Utils/cookieUtils.js\");\n\nclass AuthFacade {\n  static Login(username, password) {\n    $.post(`${this.authUrl}/login`, {\n      'username': username,\n      'password': password\n    }, data => {\n      (0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_0__.setCookie)(\"auth_key\", data.auth_key);\n      (0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_0__.setCookie)(\"permission\", data.role);\n      sessionStorage.setItem('userlogin', username);\n      sessionStorage.setItem('userid', data.userID);\n      this.handleSuccess();\n    }).fail(error => {\n      this.handleError(error.responseText, $('#span-login-error'));\n    });\n  }\n  static Register(surname, name, username, password) {\n    $.post(`${this.authUrl}/register`, {\n      'surname': surname,\n      'name': name,\n      'username': username,\n      'password': password\n    }, () => {\n      window.location.reload();\n    }).fail(error => {\n      this.handleError(error.responseText, $('#span-login-error'));\n    });\n  }\n  static handleError(errorMessage, errorElement) {\n    errorElement.text(errorMessage).css('color', 'red');\n  }\n  static handleSuccess() {\n    if ((0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_0__.getCookie)('permisson') == \"1\") {\n      $('#a-admin-panel').css('display', 'inline');\n    }\n    $('#div-login-modal').modal('hide');\n    window.location.reload();\n  }\n}\nAuthFacade.authUrl = '/api/auth';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthFacade);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/AuthorizationComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Module/BooksComponent.js":
/*!*********************************************!*\
  !*** ./wwwroot/js/Module/BooksComponent.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/ValidationFavoriteAndCartUtils */ \"./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js\");\n/* harmony import */ var _CommentComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommentComponent */ \"./wwwroot/js/Module/CommentComponent.js\");\n\n\nclass Book {\n  static GetCurrentBookByName(bookTitle) {\n    $.get(this.bookUrl, {\n      'name': bookTitle\n    }).done(data => {\n      sessionStorage.setItem('bookData', JSON.stringify(data));\n      window.location.href = `/book/name?${data.название}`;\n    });\n  }\n  static GetAllBooks() {\n    $.get(`${this.bookUrl}/allBooks`).done(data => this.createTileBooks(data));\n  }\n  static createAboutBook(book) {\n    $('#img-cover-about-book').attr('src', `data:image/png;base64,${book.обложка}`);\n    $('#h2-title-about-book').text(`${book.название}`);\n    $('#p-author-about-book').text(`${book.автор}`);\n    $('#p-genre-about-book').text(`Жанр - ${book.жанр}`);\n    $('#p-available-about-book').text(`Цена - ${book.цена} руб.`);\n    $('#p-quantity-about-book').text(`${book.наличие}`);\n    $('#input-quantity-about-book').attr('max', `${book.наличие}`);\n    this.showCommentsIfLoggedIn(book.название);\n    if (sessionStorage.getItem('userid') !== undefined) {\n      this.setupFavoriteButton(book.название, '/api/favorite/existFavorite');\n      this.setupCartButton(book.название, '/api/cart/existCartItem');\n    }\n  }\n  static showCommentsIfLoggedIn(bookTitle) {\n    _CommentComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"].ShowAllComments(bookTitle);\n    sessionStorage.getItem('userid').length == 0 ? $('#form-new-comments').hide() : $('#form-new-comments').show();\n  }\n  static setupFavoriteButton(bookTitle, url) {\n    this.setupButton('#btn-favorite-about-book', bookTitle, url, 'Удалить из избранного', 'Добавить в избранное');\n  }\n  static setupCartButton(bookTitle, url) {\n    this.setupButton('#btn-cart-book', bookTitle, url, 'Удалить из корзины', 'Добавить в корзину');\n  }\n  static setupButton(buttonId, bookTitle, url, successText, failureText) {\n    (0,_Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__.checkIfFavoriteOrCartExists)(bookTitle, url).then(result => $(buttonId).text(result ? successText : failureText));\n  }\n  static createTileBooks(books) {\n    const bookTiles = books.map(book => `\n            <div class=\"col-md-2 mt-3\">\n                <div class=\"tile\">\n                    <div class=\"tile-content\">\n                        <div class=\"tile-book\">${book.название}</div>\n                        <button class=\"btn-about-book\" ${book.наличие == 0 ? 'disabled=\"true\"' : ''}>\n                            <img src=\"data:image/png;base64,${book.обложка}\" width=\"150\" height=\"200\" alt=\"${book.наличие == 0 ? 'Нету в наличии' : 'Обложка'} книги ${book.название}\">\n                        </button>\n                    </div>\n                </div>\n            </div>`);\n    $('#tileContainer').append('<div class=\"row\">' + bookTiles.join('') + '</div>');\n  }\n  static clearUrlBook(bookUrl) {\n    return bookUrl.substr(bookUrl.indexOf('?') + 1);\n  }\n}\nBook.bookUrl = '/api/books';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Book);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/BooksComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Module/CartComponent.js":
/*!********************************************!*\
  !*** ./wwwroot/js/Module/CartComponent.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/ValidationFavoriteAndCartUtils */ \"./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js\");\n\nclass Cart {\n  static AddNewCartItem(orderName, quantity = 0) {\n    const maxQuantity = Number.parseInt($('#p-quantity-about-book').text().toString());\n    (0,_Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__.checkIfFavoriteOrCartExists)(orderName, `${this.cartUrl}/existCartItem`).then(result => {\n      if (result) {\n        $('#btn-cart-book').text('Удалить из корзины');\n      } else {\n        if (quantity > maxQuantity || quantity <= 0) {\n          $('#span-information-quantity').text(`Количество не может быть больше максимального значения ${$('#input-quantity-about-book').attr('max')} или меньше нуля`).css('color', 'red');\n          $('#input-quantity-about-book').val('1');\n        } else {\n          $.post(`${this.cartUrl}/addCartItem`, {\n            'bookName': orderName,\n            'userID': sessionStorage.getItem('userid'),\n            'quantity': quantity\n          }, () => {\n            window.location.reload();\n          });\n        }\n      }\n    });\n  }\n  static ShowCartList() {\n    $.get(`${this.cartUrl}/allCartItems`, {\n      'userID': sessionStorage.getItem('userid')\n    }, data => {\n      this.cartElementsCreate(data);\n    });\n  }\n  static DeleteCartItem(orderDelete) {\n    $.post(`${this.cartUrl}/deleteCartItem`, {\n      'cartItemDelete': orderDelete\n    }, () => {\n      window.location.reload();\n    });\n  }\n  static ClearCart() {\n    $.post(`${this.cartUrl}/clearCart`, {\n      'userID': sessionStorage.getItem('userid')\n    }, () => {\n      window.location.reload();\n    });\n  }\n  static cartElementsCreate(cart) {\n    var arr = [];\n    var sumCostBook = 0;\n    var countCartBooks = 1;\n    cart.forEach(cart => {\n      sumCostBook += cart.кодКнигиNavigation.цена * cart.количество;\n      arr.push('<tr>');\n      arr.push(`<th scope=\"row\">${countCartBooks++}</th>`);\n      arr.push(`<td class=\"td-book-name\"><a class=\"btn\" id=\"a-redirect-cart-about-book\" href=\"/book/name?${cart.кодКнигиNavigation.название}\"</a>${cart.кодКнигиNavigation.название}</td>`);\n      arr.push(`<td>${cart.кодКнигиNavigation.цена} руб.</td>`);\n      arr.push(`<td>${cart.количество}</td>`);\n      arr.push(`<td><button type=\"button\" class=\"btn btn-sm btn-danger\" id=\"btn-delete-cart-item\">Удалить</button></td>`);\n      arr.push('</tr>');\n    });\n    $('#h4-final-sum').text(`Общая сумма - ${sumCostBook} руб.`);\n    $('#tbody-cart-items').append(arr.join(\"\"));\n  }\n  static selectFillPickupPoint() {\n    var arr = [];\n    var data = JSON.parse(sessionStorage.getItem('pickup_point_data'));\n    data.forEach(data => {\n      arr.push(`<option>${data.адрес} | ${data.название}</option>`);\n    });\n    $('#select-pickup-point').append(arr.join(\"\"));\n  }\n}\nCart.cartUrl = '/api/cart';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cart);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/CartComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Module/CommentComponent.js":
/*!***********************************************!*\
  !*** ./wwwroot/js/Module/CommentComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Comments {\n  static PostNewComment(comments) {\n    $.post(`${this.commentUrl}/addComment`, {\n      'comment': comments,\n      'userID': sessionStorage.getItem('userid'),\n      'bookName': $('#h2-title-about-book').text()\n    }, () => {\n      $('#textarea-user-comment').empty();\n      window.location.reload();\n    });\n  }\n  static ShowAllComments(book) {\n    $.get(`${this.commentUrl}/getAllComments`, {\n      'bookName': book\n    }, data => {\n      this.createComments(data);\n    });\n  }\n  static createComments(comments) {\n    var commentArr = [];\n    comments.forEach(comments => {\n      commentArr.push('<div class=\"comment\">');\n      commentArr.push(`<span class=\"author\">${comments.кодПользователяNavigation.логин}</span>`);\n      commentArr.push(`<div class=\"content\">'${comments.текстКомментария}</div>`);\n      commentArr.push('</div>');\n    });\n    $('#section-users-comments').append(commentArr.join('\\n'));\n  }\n}\nComments.commentUrl = '/api/comment';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comments);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/CommentComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Module/FavoriteComponent.js":
/*!************************************************!*\
  !*** ./wwwroot/js/Module/FavoriteComponent.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/ValidationFavoriteAndCartUtils */ \"./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js\");\n\nclass Favorite {\n  static AddBookToFavorite(bookName) {\n    (0,_Utils_ValidationFavoriteAndCartUtils__WEBPACK_IMPORTED_MODULE_0__.checkIfFavoriteOrCartExists)(bookName, `${this.favoriteUrl}/existFavorite`).then(result => {\n      if (result) {\n        $('#btn-favorite-about-book').text('Удалить из избранного');\n      } else {\n        $.post(`${this.favoriteUrl}/addFavorite`, {\n          'nameBook': bookName,\n          'userID': sessionStorage.getItem('userid')\n        }, () => {\n          window.location.reload();\n        });\n      }\n    });\n  }\n  static ShowListFavorite() {\n    $.get(`${this.favoriteUrl}/getFavorite`, {\n      'userID': sessionStorage.getItem('userid')\n    }, data => {\n      var arr = [];\n      data.forEach(data => {\n        arr.push('<li>');\n        arr.push(`<a class=\"btn text-align-center\" href=\"/book/name?${encodeURIComponent(data.кодКнигиNavigation.название)}\" id=\"a-redirect-about-book\">${data.кодКнигиNavigation.название}</a>`);\n        arr.push('</li>');\n      });\n      $('#div-favorite-list').append(arr.join(\"\"));\n    });\n  }\n  static RemoveFromFavorite(bookName) {\n    $.post(`${this.favoriteUrl}/deleteFavorite`, {\n      'bookName': bookName\n    }, () => {\n      window.location.reload();\n    });\n  }\n}\nFavorite.favoriteUrl = '/api/favorite';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Favorite);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/FavoriteComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Module/OrderComponent.js":
/*!*********************************************!*\
  !*** ./wwwroot/js/Module/OrderComponent.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _BooksComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BooksComponent */ \"./wwwroot/js/Module/BooksComponent.js\");\n\nclass Order {\n  static AddNewOrder(elementHref, pickupPoint) {\n    var orderBooks = [];\n    document.querySelectorAll(`${elementHref}`).forEach(links => {\n      orderBooks.push(_BooksComponent__WEBPACK_IMPORTED_MODULE_0__[\"default\"].clearUrlBook(decodeURI(links.getAttribute('href'))));\n    });\n    $.post(`${this.orderUrl}/addOrder`, {\n      'bookName': orderBooks,\n      'userID': sessionStorage.getItem('userid'),\n      'selectedPoint': pickupPoint\n    });\n  }\n  static ShowOrders() {\n    $.get(`${this.orderUrl}/getOrder`, {\n      'userID': sessionStorage.getItem('userid')\n    }, data => {\n      this.tableOrderFill(data);\n    });\n  }\n  static tableOrderFill(orders) {\n    var ordersUser = [];\n    var countOrders = 1;\n    orders.forEach(orders => {\n      var bookName = orders.кодКнигиNavigation.название;\n      ordersUser.push('<tr>');\n      ordersUser.push(`<th scope=\"row\">${countOrders++}</th>`);\n      ordersUser.push(`<td><a id=\"a-redirect-profile-book\" class=\"btn\" href=\"/book/name?${bookName}\"</a>${bookName}</td>`);\n      ordersUser.push(`<td>${orders.датаЗаказа}</td>`);\n      ordersUser.push(`<td>${orders.статус}</td>`);\n      ordersUser.push(`<td>${orders.кодПунктаВыдачиNavigation.название}</td>`);\n      ordersUser.push('</tr>');\n    });\n    $('#tbody-profile-table').append(ordersUser.join(\"\"));\n  }\n}\nOrder.orderUrl = '/api/order';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Order);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/OrderComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Module/PickupPointComponent.js":
/*!***************************************************!*\
  !*** ./wwwroot/js/Module/PickupPointComponent.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass PickupPoint {\n  static ShowPickupPoints() {\n    $.get(`${this.pickupUrl}/allPickupPoints`, data => {\n      const pickupElements = data.map(pickup => `\n                <div class=\"col-md-2 mt-3 card-wrapper\">\n                    <div class=\"card\">\n                        <div class=\"card-body\">\n                        <h5 class=\"card-title\">${pickup.название}</h5>\n                        <p class=\"card-text\">${pickup.адрес}</p>\n                        </div>\n                    </div>\n                </div>\n            `);\n      $('#div-show-pickup').append(pickupElements.join(\"\"));\n    });\n  }\n}\nPickupPoint.pickupUrl = '/api/pickup';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PickupPoint);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/PickupPointComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Module/ProfileComponent.js":
/*!***********************************************!*\
  !*** ./wwwroot/js/Module/ProfileComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main */ \"./wwwroot/js/main.js\");\n\nclass Profile {\n  static ShowProfileInfo() {\n    $.get(`${this.profileUrl}/profileInformation`, {\n      'userID': sessionStorage.getItem('userid')\n    }, data => {\n      $('#input-form-edit-login').val(`${data.login}`);\n      $('#input-form-edit-surname').val(`${data.surname}`);\n      $('#input-form-edit-name').val(`${data.name}`);\n      $('#img-photo-profile').attr('src', `data:image/png;base64,${data.photo}`);\n      $('#img-photo-edit-modal').attr('src', `data:image/png;base64,${data.photo}`);\n      $('#img-photo-edit-modal-medium').attr('src', `data:image/png;base64,${data.photo}`);\n      $('#img-photo-edit-modal-small').attr('src', `data:image/png;base64,${data.photo}`);\n    });\n  }\n  static EditProfileInfo(name, surname, username) {\n    $.post(`${this.profileUrl}/editProfile?userID=${sessionStorage.getItem('userid')}`, {\n      'name': name,\n      'surname': surname,\n      'username': username\n    }, () => {\n      window.location.reload();\n      sessionStorage.setItem('userlogin', username);\n    });\n  }\n  static EditProfilePhoto() {\n    $.post(`${this.profileUrl}/editPhoto`, {\n      'userID': sessionStorage.getItem('userid'),\n      'photoData': sessionStorage.getItem('imgData')\n    }, () => {\n      window.location.reload();\n    });\n  }\n  static EditProfilePassword(password) {\n    $.post(`${this.profileUrl}/editPassword`, {\n      'userID': sessionStorage.getItem('userid'),\n      'password': password\n    }, () => {\n      alert('Данные успешно изменены. Авторизуйтесь под новыми данными.');\n      $('#span-edit-error').empty();\n      (0,_main__WEBPACK_IMPORTED_MODULE_0__.Logout)();\n    }).fail(error => {\n      $('#span-edit-error').text(`${error.responseText}`).css('color', 'red');\n    });\n  }\n}\nProfile.profileUrl = '/api/profile';\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Profile);\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Module/ProfileComponent.js?");

/***/ }),

/***/ "./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js":
/*!************************************************************!*\
  !*** ./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkIfFavoriteOrCartExists: () => (/* binding */ checkIfFavoriteOrCartExists)\n/* harmony export */ });\nfunction checkIfFavoriteOrCartExists(currentBook, url) {\n  return new Promise(resolve => {\n    $.get(url, {\n      'userID': sessionStorage.getItem('userid'),\n      'bookName': currentBook\n    }, () => {\n      resolve(true);\n    }).fail(() => {\n      resolve(false);\n    });\n  });\n}\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Utils/ValidationFavoriteAndCartUtils.js?");

/***/ }),

/***/ "./wwwroot/js/Utils/cookieUtils.js":
/*!*****************************************!*\
  !*** ./wwwroot/js/Utils/cookieUtils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteCookie: () => (/* binding */ deleteCookie),\n/* harmony export */   getCookie: () => (/* binding */ getCookie),\n/* harmony export */   setCookie: () => (/* binding */ setCookie)\n/* harmony export */ });\nfunction setCookie(name, val) {\n  const date = new Date();\n  const value = val;\n  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);\n  document.cookie = name + \"=\" + value + \"; expires=\" + date.toUTCString() + \"; path=/\";\n}\nfunction getCookie(name) {\n  const value = \"; \" + document.cookie;\n  const parts = value.split(\"; \" + name + \"=\");\n  if (parts.length == 2) {\n    return parts.pop().split(\";\").shift();\n  } else {\n    return \"\";\n  }\n}\nfunction deleteCookie(name) {\n  const date = new Date();\n  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);\n  document.cookie = name + \"=; expires=\" + date.toUTCString() + \"; path=/\";\n}\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/Utils/cookieUtils.js?");

/***/ }),

/***/ "./wwwroot/js/main.js":
/*!****************************!*\
  !*** ./wwwroot/js/main.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Logout: () => (/* binding */ Logout)\n/* harmony export */ });\n/* harmony import */ var _Module_AuthorizationComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Module/AuthorizationComponent */ \"./wwwroot/js/Module/AuthorizationComponent.js\");\n/* harmony import */ var _Module_CommentComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Module/CommentComponent */ \"./wwwroot/js/Module/CommentComponent.js\");\n/* harmony import */ var _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Module/BooksComponent */ \"./wwwroot/js/Module/BooksComponent.js\");\n/* harmony import */ var _Module_FavoriteComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Module/FavoriteComponent */ \"./wwwroot/js/Module/FavoriteComponent.js\");\n/* harmony import */ var _Module_OrderComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Module/OrderComponent */ \"./wwwroot/js/Module/OrderComponent.js\");\n/* harmony import */ var _Module_PickupPointComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Module/PickupPointComponent */ \"./wwwroot/js/Module/PickupPointComponent.js\");\n/* harmony import */ var _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Module/CartComponent */ \"./wwwroot/js/Module/CartComponent.js\");\n/* harmony import */ var _Module_ProfileComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Module/ProfileComponent */ \"./wwwroot/js/Module/ProfileComponent.js\");\n/* harmony import */ var _Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Utils/cookieUtils */ \"./wwwroot/js/Utils/cookieUtils.js\");\n\n\n\n\n\n\n\n\n\nfunction readFileAsByteArray(input, callback) {\n  const reader = new FileReader();\n  const files = $(input).prop('files');\n  if (files && files.length > 0) {\n    const file = files[0];\n    reader.onload = event => {\n      var _a;\n      const arrayBuffer = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;\n      const byteArray = new Uint8Array(arrayBuffer);\n      callback(byteArray);\n    };\n    reader.readAsArrayBuffer(file);\n  }\n}\nfunction byteArrayToBase64(byteArray) {\n  return new Promise(resolve => {\n    const blob = new Blob([byteArray], {\n      type: 'application/octet-stream'\n    });\n    const reader = new FileReader();\n    reader.onload = () => {\n      if (typeof reader.result === 'string') {\n        resolve(reader.result.split(',')[1]);\n      } else {\n        resolve(null);\n      }\n    };\n    reader.readAsDataURL(blob);\n  });\n}\nfunction Logout() {\n  (0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_8__.deleteCookie)(\"auth_key\");\n  (0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_8__.deleteCookie)(\"permission\");\n  sessionStorage.clear();\n  window.location.href = \"/\";\n}\n$(function () {\n  $('#btn-new-comment').on('click', function (event) {\n    event.preventDefault();\n    if ((0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_8__.getCookie)('auth_key') != \"\") {\n      _Module_CommentComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"].PostNewComment($('#textarea-user-comment').val().toString());\n    } else {\n      alert(\"Войдите для того чтобы оставить комментарии\");\n    }\n  });\n  $('#btn-profile-photo-change').on('click', function (event) {\n    event.preventDefault();\n    readFileAsByteArray($('#input-photo-edit').get(0), byteArray => {\n      byteArrayToBase64(byteArray).then(base64String => {\n        sessionStorage.setItem('imgData', base64String);\n        _Module_ProfileComponent__WEBPACK_IMPORTED_MODULE_7__[\"default\"].EditProfilePhoto();\n      });\n    });\n  });\n  $('#btn-form-profile-edit').on('click', function (event) {\n    event.preventDefault();\n    if ($('#input-form-password-edit').val() == $('#input-form-password-edit-repeat').val()) {\n      _Module_ProfileComponent__WEBPACK_IMPORTED_MODULE_7__[\"default\"].EditProfilePassword($('#input-form-password-edit').val().toString());\n    } else {\n      $('#span-edit-error').text('Пароли должны быть одинаковыми.').css('color', 'red');\n    }\n  });\n  $('#btn-profile-information-edit').on('click', function (event) {\n    event.preventDefault();\n    _Module_ProfileComponent__WEBPACK_IMPORTED_MODULE_7__[\"default\"].EditProfileInfo($('#input-form-edit-name').val().toString(), $('#input-form-edit-surname').val().toString(), $('#input-form-edit-login').val().toString());\n  });\n  $('#btn-order-clear').on('click', function (event) {\n    event.preventDefault();\n    _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"].ClearCart();\n  });\n  $('#btn-logout-profile').on('click', function () {\n    Logout();\n  });\n  $('#btn-favorite-show').on('click', function (event) {\n    event.preventDefault();\n    if ((0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_8__.getCookie)(\"auth_key\") != \"\") {\n      $('#div-favorite-list').empty();\n      _Module_FavoriteComponent__WEBPACK_IMPORTED_MODULE_3__[\"default\"].ShowListFavorite();\n    } else {\n      $('#div-favorite-list').text('Здесь пока ничего нету, для того чтобы добавить книгу в избранное нужно зайти в свои профиль');\n    }\n  });\n  $('#btn-favorite-about-book').on('click', function (event) {\n    event.preventDefault();\n    if ((0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_8__.getCookie)(\"auth_key\") != \"\") {\n      var favorClass = new _Module_FavoriteComponent__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n      if ($('#btn-favorite-about-book').text().includes('Добавить')) {\n        _Module_FavoriteComponent__WEBPACK_IMPORTED_MODULE_3__[\"default\"].AddBookToFavorite($('#h2-title-about-book').text());\n      } else {\n        _Module_FavoriteComponent__WEBPACK_IMPORTED_MODULE_3__[\"default\"].RemoveFromFavorite($('#h2-title-about-book').text());\n      }\n    } else {\n      alert(\"Войдите в профиль для сохранение книги в избранное.\");\n    }\n  });\n  $('#btn-cart-book').on('click', function (event) {\n    event.preventDefault();\n    if ((0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_8__.getCookie)(\"auth_key\") != \"\") {\n      var cart = new _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"]();\n      if ($('#btn-cart-book').text().includes('Добавить')) {\n        _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"].AddNewCartItem($('#h2-title-about-book').text(), Number.parseInt($('#input-quantity-about-book').val().toString()));\n      } else {\n        _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"].DeleteCartItem($('#h2-title-about-book').text());\n      }\n    } else {\n      alert(\"Войдите в профиль для сохранение книги в корзину.\");\n    }\n  });\n  $(document).ready(function () {\n    const permission = (0,_Utils_cookieUtils__WEBPACK_IMPORTED_MODULE_8__.getCookie)('permission');\n    const userLogin = sessionStorage.getItem('userlogin');\n    const currentUrl = window.location.href.substring(window.location.href.indexOf('8') + 1);\n    if (permission === '1') $('#a-admin-panel').removeAttr('style');\n    $('#p-user-login').text(userLogin ? `Добро пожаловать - ${userLogin}` : 'Войти');\n    if (window.location.href.includes('/book/name')) _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"].createAboutBook(JSON.parse(sessionStorage.getItem('bookData')));\n    if (userLogin) $('#btn-login').removeAttr('data-bs-toggle data-bs-target').attr('href', '/profile');\n    if (!sessionStorage.getItem('pickup_point_data')) {\n      $.get(`/api/pickup/allPickupPoints`, data => {\n        sessionStorage.setItem('pickup_point_data', JSON.stringify(data));\n      });\n    }\n    switch (currentUrl) {\n      case '/':\n        {\n          _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"].GetAllBooks();\n          break;\n        }\n      case '/cart':\n        {\n          _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"].ShowCartList();\n          _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"].selectFillPickupPoint();\n          break;\n        }\n      case '/profile':\n        {\n          _Module_OrderComponent__WEBPACK_IMPORTED_MODULE_4__[\"default\"].ShowOrders();\n          _Module_ProfileComponent__WEBPACK_IMPORTED_MODULE_7__[\"default\"].ShowProfileInfo();\n          break;\n        }\n      case '/pickup-point':\n        {\n          _Module_PickupPointComponent__WEBPACK_IMPORTED_MODULE_5__[\"default\"].ShowPickupPoints();\n          break;\n        }\n    }\n  });\n  $(document).on('click', '#a-redirect-cart-about-book, #a-redirect-profile-book, #a-redirect-about-book', function (event) {\n    event.preventDefault();\n    _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"].GetCurrentBookByName(_Module_BooksComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"].clearUrlBook(decodeURI(this.getAttribute('href'))));\n  });\n  $('#tbody-cart-items').on('click', '#btn-delete-cart-item', function (event) {\n    event.preventDefault();\n    _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"].DeleteCartItem($(this).closest('tr').find('.td-book-name').text());\n  });\n  $('#tileContainer').on('click', '.btn-about-book', function (event) {\n    event.preventDefault();\n    _Module_BooksComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"].GetCurrentBookByName($(this).closest('.tile').find('.tile-book').text());\n  });\n  $('#btn-order-success').on('click', function (event) {\n    event.preventDefault();\n    _Module_OrderComponent__WEBPACK_IMPORTED_MODULE_4__[\"default\"].AddNewOrder('#a-redirect-cart-about-book', $('#select-pickup-point option:selected').index() + 1);\n    _Module_CartComponent__WEBPACK_IMPORTED_MODULE_6__[\"default\"].ClearCart();\n  });\n  $('#btn-form-login').on('click', function (event) {\n    event.preventDefault();\n    _Module_AuthorizationComponent__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Login($('#input-form-login-auth').val().toString(), $('#input-form-password-auth').val().toString());\n  });\n  $('#btn-form-register').on('click', function (event) {\n    event.preventDefault();\n    if ($('#input-form-password-register').val() == $('#input-form-password-repeat').val()) {\n      _Module_AuthorizationComponent__WEBPACK_IMPORTED_MODULE_0__[\"default\"].Register($('#input-form-surname-register').val().toString(), $('#input-form-name-register').val().toString(), $('#input-form-username-register').val().toString(), $('#input-form-password-register').val().toString());\n    } else {\n      $('#span-register-error').text(\"Пароли должны быть одинаковые\").css('color', 'red');\n    }\n  });\n});\n\n//# sourceURL=webpack://asp.net/./wwwroot/js/main.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./wwwroot/js/main.js");
/******/ 	
/******/ })()
;