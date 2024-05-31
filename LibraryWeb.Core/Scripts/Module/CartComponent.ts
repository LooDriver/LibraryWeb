import { checkIfFavoriteOrCartExists } from '../Utils/ValidationFavoriteAndCartUtils';

export default class Cart {

    private static cartUrl = '/api/cart';

    public static AddNewCartItem(orderName: string, quantity = 0) {
        checkIfFavoriteOrCartExists(orderName, `${this.cartUrl}/existCartItem`).then((result) => {
            if (result) {
                $('#btn-cart-book').text('Удалить из корзины');
            }
            else {
                $.post(`${this.cartUrl}/addCartItem`, { 'bookName': orderName, 'userID': sessionStorage.getItem('userid'), 'quantity': quantity }, () => {
                    window.location.reload();
                });
            }
        });
    }

    public static ShowCartList() {
        $.get(`${this.cartUrl}/allCartItems`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            this.cartElementsCreate(data);
        }));
    }

    public static DeleteCartItem(orderDelete: string) {
        $.post(`${this.cartUrl}/deleteCartItem`, { 'cartItemDelete': orderDelete }, () => {
            window.location.reload();
        });
    }
    public static ClearCart() {
    
        $.post(`${this.cartUrl}/clearCart`, { 'userID': sessionStorage.getItem('userid') }, () => {
            window.location.reload();
        });
    }

    private static cartElementsCreate(cartData) {

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
        this.calculateFinalSum(cartData);
    }

    private static calculateFinalSum(cartData) {
        var totalSum = 0;
        cartData.forEach(cart => {
            totalSum += cart.кодКнигиNavigation.цена * cart.количество;
        });
        $('#h4-final-sum').text(`Общая сумма - ${isNaN(totalSum) ? 0 : totalSum} руб.`);
    }

    public static selectFillPickupPoint() {
        var data = JSON.parse(sessionStorage.getItem('pickup_point_data'));
        const selectHtmlElem = data.map(select => `<option>${select.адрес} | ${select.название}</option>`)
        $('#select-pickup-point').append(selectHtmlElem.join(''));
    }
}
