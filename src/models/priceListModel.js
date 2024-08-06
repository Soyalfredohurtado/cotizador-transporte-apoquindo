import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define un esquema para los detalles de precios
const priceDetailSchema = new Schema({
    itemsID: { type: String, required: true },
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemStatus: { type: Boolean, required: true },
    created_at: { type: Date, default: Date.now } 
});

// Define el esquema principal
const priceListSchema = new Schema({
    priceListID: { type: String, required: true, unique: true },
    priceListName: { type: String, required: true, unique: true },
    priceListDetail: {
        bajada: { type: priceDetailSchema, required: true },
        Kilometros: { type: priceDetailSchema, required: true },
        minutos: { type: priceDetailSchema, required: true},
        peajes: { type: priceDetailSchema, required: true},
        tag: { type: priceDetailSchema, required: true }
    },
    priceListStatus: { type: Boolean, default: true },
    priceListObservation: { type: String },
    priceListService: [{ type: String }], 
    created_at: { type: Date, default: Date.now } 

},{ collection: 'priceList' }
);

const PriceList = mongoose.model('PriceList', priceListSchema);

export default PriceList;