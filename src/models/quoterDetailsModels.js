import mongoose from 'mongoose';
const { Schema } = mongoose;

// Definir el esquema para los detalles de la cotización
const quoteDetailSchema = new Schema({
    itemID: { type: String, required: true },    
    quoterID: { type: String, ref: 'Quoter', required: true },
    detailsQuoter:{
        itemUnitPrice: { type: Number, required: true },
        itemAmount: { type: Number, required: true },
        itemTotal: { 
            type: Number,
            required: true,
            default: function() {
                return this.itemUnitPrice * this.itemAmount;
            }
        }        
    },
    created_at: { type: Date, default: Date.now } 
}, { collection: 'quoteDetail' }); 

const QuoterDetail = mongoose.model('QuoterDetail', quoteDetailSchema); 

export default QuoterDetail
