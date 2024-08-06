import { getServices, createService } from '../models/serviceModel.js';

const getServicesController = async (req, res)=>{
    try {
        const servicios = await getServices();
        return servicios;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const createServiceController = async (req) =>{
    try {
        const { serviceID, serviceName, serviceStatus, serviceObservation, servicePassengerCapacity} = req.body
        await createService({
            serviceID,
            serviceName,
            serviceStatus,
            serviceObservation,
            servicePassengerCapacity
        })
    } catch (error) {
        console.error(error)     
    }
}

export { getServicesController, createServiceController}


