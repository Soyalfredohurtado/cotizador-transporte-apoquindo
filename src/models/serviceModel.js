import mongoose from "mongoose";

const { Schema }= mongoose;

const serviceSchema = new Schema({
    serviceID: { type: String, required: true, uniqued:true },
    serviceName: { type: String, required: true, uniqued:true }, 
    serviceStatus: { type: Number, required: true},
    serviceObservation: { type: String, required:true },
    servicePassengerCapacity: { type: Number, required:true },
    created_at: { type: Date, default: Date.now }
})

const Service = mongoose.model('Service', serviceSchema)
  
export default Service;


