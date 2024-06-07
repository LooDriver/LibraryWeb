export default class Order {

    private static orderUrl = '/api/order'

    public static AddNewOrder(pickupPoint: number) {
        var orderBooks = [];
        document.querySelectorAll('td.td-book-name').forEach(data => {
            orderBooks.push(data.textContent);
        });
        $.post(`${this.orderUrl}/addOrder`, { 'bookName': orderBooks, 'userID': sessionStorage.getItem('userid'), 'selectedPoint': pickupPoint });
    }

    public static ShowOrders() {
        $.get(`${this.orderUrl}/getOrder`, { 'userID': sessionStorage.getItem('userid') }, ((data) => {
            this.tableOrderFill(data);
        }));
    }

    private static tableOrderFill(orders) {
        var countOrders = 1;
        const orderTable = orders.map(data => `
            <tr>
                <th scope="row">${countOrders++}</th>
                <td><a id="a-redirect-profile-book" class="btn" href="/book/name?${data.кодКнигиNavigation.название}"</a>${data.кодКнигиNavigation.название}</td>
                <td>${data.датаЗаказа}</td>
                <td>${data.статус}</td>
                <td>${data.кодПунктаВыдачиNavigation.название}</td>
            </tr>
        `);
        $('#tbody-profile-table').append(orderTable.join(""));
    }
}