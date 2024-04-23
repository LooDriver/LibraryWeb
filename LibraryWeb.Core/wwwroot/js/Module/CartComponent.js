import { checkIfFavoriteOrCartExists } from '../Utils/ValidationFavoriteAndCartUtils';
class Cart {
    static AddNewCartItem(orderName, quantity = 0) {
        const maxQuantity = Number.parseInt($('#p-quantity-about-book').text().toString());
        checkIfFavoriteOrCartExists(orderName, `${this.cartUrl}/existCartItem`).then((result) => {
            if (result) {
                $('#btn-cart-book').text('Удалить из корзины');
            }
            else {
                if (quantity > maxQuantity || quantity <= 0) {
                    $('#span-information-quantity').text(`Количество не может быть больше максимального значения ${$('#input-quantity-about-book').attr('max')} или меньше нуля`).css('color', 'red');
                    $('#input-quantity-about-book').val('1');
                }
                else {
                    $.post(`${this.cartUrl}/addCartItem`, { 'bookName': orderName, 'userID': sessionStorage.getItem('userid'), 'quantity': quantity }, () => {
                        window.location.reload();
                    });
                }
            }
        });
    }
    static ShowCartList() {
        $.get(`${this.cartUrl}/allCartItems`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            this.cartElementsCreate(data);
        }));
    }
    static DeleteCartItem(orderDelete) {
        $.post(`${this.cartUrl}/deleteCartItem`, { 'cartItemDelete': orderDelete }, () => {
            window.location.reload();
        });
    }
    static ClearCart() {
        $.post(`${this.cartUrl}/clearCart`, { 'userID': sessionStorage.getItem('userid') }, () => {
            window.location.reload();
        });
    }
    static cartElementsCreate(cart) {
        var arr = [];
        var sumCostBook = 0;
        var countCartBooks = 1;
        cart.forEach(cart => {
            sumCostBook += cart.кодКнигиNavigation.цена * cart.количество;
            arr.push('<tr>');
            arr.push(`<th scope="row">${countCartBooks++}</th>`);
            arr.push(`<td class="td-book-name"><a class="btn" id="a-redirect-cart-about-book" href="/book/name?${cart.кодКнигиNavigation.название}"</a>${cart.кодКнигиNavigation.название}</td>`);
            arr.push(`<td>${cart.кодКнигиNavigation.цена} руб.</td>`);
            arr.push(`<td>${cart.количество}</td>`);
            arr.push(`<td><button type="button" class="btn btn-sm btn-danger" id="btn-delete-cart-item">Удалить</button></td>`);
            arr.push('</tr>');
        });
        $('#h4-final-sum').text(`Общая сумма - ${sumCostBook} руб.`);
        $('#tbody-cart-items').append(arr.join(""));
    }
    static selectFillPickupPoint() {
        var arr = [];
        var data = JSON.parse(sessionStorage.getItem('pickup_point_data'));
        data.forEach(data => {
            arr.push(`<option>${data.адрес} | ${data.название}</option>`);
        });
        $('#select-pickup-point').append(arr.join(""));
    }
}
Cart.cartUrl = '/api/cart';
export default Cart;
//# sourceMappingURL=CartComponent.js.map