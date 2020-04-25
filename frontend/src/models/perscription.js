export class Perscription {
    constructor(id, uid, drugId, cost, pharmacyPickup){
        this.id = id;
        this.uid = uid;
        this.drugId = drugId;
        this.cost = cost;
        this.pharmacyPickup = pharmacyPickup;
    }
}
export default Perscription;