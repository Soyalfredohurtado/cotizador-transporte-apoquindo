import mongoose from "mongoose";

const { Schema }= mongoose;

const serviceSchema = new Schema({
    serviceID: { type: Number, required: true, uniqued:true },
    serviceName: { type: String, required: true, uniqued:true }, 
    serviceStatus: { type: Number, required: true},
    serviceObservation: { type: String, required:true },
    servicePassengerCapacity: { type: Number, required:true },
    created_at: { type: Date, default: Date.now }
})

const Service = mongoose.model('Service', serviceSchema)
  
const getServices = async () =>{
    try {
        const services = await Service.find()
        return services
    } catch (error) {
        console.error('---serviceModels.js--- Error al obtener los usuarios', error);
        throw error; // Lanzar el error para manejarlo en el controlador        
    }
}

const createService = async(serviceData)=>{
    try {
        const newService = Service(serviceData);
        await newService.save();
        
    } catch (error) {
        console.error('---serviceModels.js--- Error creación de un nuevo usuario', error);
        throw error;
    }
}
export { getServices, createService }
export default Service;


