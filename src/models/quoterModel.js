// /models/quoterModels.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Definir el esquema para la cotización
const quoterSchema = new Schema({
    quoterID: { type: String, required: true, unique: true },
    quoterNumber: { type: Number, required: true },
    quoterServiceID: { type: String, required: true },
    quoterPriceListID: { type: String, required: true },
    queterUserID: { type: String, required: true },
    quoterOrigin: { type: String, required: true },
    quoterDestination: { type: String, required: true },
    quoterWaypoints: {type:Array},
    created_at: { type: Date, default: Date.now },    
}, { collection: 'quotes' });

const Quoter = mongoose.model('Quoter', quoterSchema);

export default Quoter;
