import Book from './BooksComponent';
class Order {
    static AddNewOrder(elementHref, pickupPoint) {
        var orderBooks = [];
        document.querySelectorAll(`${elementHref}`).forEach(links => {
            orderBooks.push(Book.clearUrlBook(decodeURI(links.getAttribute('href'))));
        });
        $.post(`${this.orderUrl}/addOrder`, { 'bookName': orderBooks, 'userID': sessionStorage.getItem('userid'), 'selectedPoint': pickupPoint });
    }
    static ShowOrders() {
        $.get(`${this.orderUrl}/getOrder`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            this.tableOrderFill(data);
        }));
    }
    static tableOrderFill(orders) {
        var ordersUser = [];
        var countOrders = 1;
        orders.forEach(orders => {
            var bookName = orders.кодКнигиNavigation.название;
            ordersUser.push('<tr>');
            ordersUser.push(`<th scope="row">${countOrders++}</th>`);
            ordersUser.push(`<td><a id="a-redirect-profile-book" class="btn" href="/book/name?${bookName}"</a>${bookName}</td>`);
            ordersUser.push(`<td>${orders.датаЗаказа}</td>`);
            ordersUser.push(`<td>${orders.статус}</td>`);
            ordersUser.push(`<td>${orders.кодПунктаВыдачиNavigation.название}</td>`);
            ordersUser.push('</tr>');
        });
        $('#tbody-profile-table').append(ordersUser.join(""));
    }
}
Order.orderUrl = '/api/order';
export default Order;
