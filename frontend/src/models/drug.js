export class Drug {
    constructor(drugId, name, price, description, sideEffectId, pharmacy){
        this.drugId = drugId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.sideEffectId = sideEffectId;
        this.pharmacy = pharmacy;
    }
}
export default Drug;