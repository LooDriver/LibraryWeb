export default class PickupPoint {

    private static pickupUrl = '/api/pickup';

    public static SetPickupPointData() {
        if (!sessionStorage.getItem('pickup_point_data')) {
            $.get(`/api/pickup/allPickupPoints`, data => {
                sessionStorage.setItem('pickup_point_data', JSON.stringify(data));
            });
        }
    }

    public static ShowPickupPoints() {
        $.get(`${this.pickupUrl}/allPickupPoints`, ((data) => {

            const pickupElements = data.map(pickup => `
                <div class="col-md-2 mt-3 card-wrapper">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">${pickup.название}</h5>
                        <p class="card-text">${pickup.адрес}</p>
                        </div>
                    </div>
                </div>`
            );

            $('#div-show-pickup').append(pickupElements.join(""));

        }));
    }
}
