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
    static cartElementsCreate(cartData) {
        var countCartBooks = 1;
        const cartTableElem = cartData.map(cart => `
            <tr>
                <th scope="row">${countCartBooks++}</th>
                    <td class="td-book-name">${cart.кодКнигиNavigation.название}</td>
                    <td id="td-cart-book-cost">${cart.кодКнигиNavigation.цена} руб.</td>
                    <td id="td-cart-book-count">${cart.количество}</td>
                    <td><button type="button" class="btn btn-sm btn-danger" id="btn-delete-cart-item">Удалить</button></td>
            </tr>
        `);
        $('#tbody-cart-items').append(cartTableElem.join(""));
        var sumCostBook = Number.parseInt($('#td-cart-book-cost').text()) * Number.parseInt($('#td-cart-book-count').text());
        $('#h4-final-sum').text(`Общая сумма - ${isNaN(sumCostBook) ? 0 : sumCostBook} руб.`);
    }
    static selectFillPickupPoint() {
        var data = JSON.parse(sessionStorage.getItem('pickup_point_data'));
        const selectHtmlElem = data.map(select => `<option>${select.адрес} | ${select.название}</option>`);
        $('#select-pickup-point').append(selectHtmlElem.join(''));
    }
}
Cart.cartUrl = '/api/cart';
export default Cart;
