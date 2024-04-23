class PickupPoint {
    static ShowPickupPoints() {
        $.get(`${this.pickupUrl}/allPickupPoints`, ((data) => {
            const pickupElements = data.map(pickup => `
                <div class="col-md-2 mt-3 card-wrapper">
                    <div class="card">
                        <div class="card-body">
                        <h5 class="card-title">${pickup.название}</h5>
                        <p class="card-text">${pickup.адрес}</p>
                        </div>
                    </div>
                </div>
            `);
            $('#div-show-pickup').append(pickupElements.join(""));
        }));
    }
}
PickupPoint.pickupUrl = '/api/pickup';
export default PickupPoint;
//# sourceMappingURL=PickupPointComponent.js.map