import Service from '../models/serviceModel.js';

const getServicesController = async (req, res)=>{
    try {
        const servicios = await Service.find();
        return servicios;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const createServiceController = async (req) =>{
    try {
        const { serviceID, serviceName, serviceStatus, serviceObservation, servicePassengerCapacity} = req.body;
        const newService = new Service({
            serviceID,
            serviceName,
            serviceStatus,
            serviceObservation,
            servicePassengerCapacity
        })
        await newService.save()
    } catch (error) {
        console.error(error)     
    }
}

const getServicesByIDController = async(req, res)=>{
    try {
        const servicesList = await Service.find({}, 'serviceID');
        let services = [];
        for(let i = 0; i < servicesList.length; i++){
            services.push(servicesList[i].serviceID);
        }
        return services;

    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getSerciceByKeyController = async(key)=>{
    try {
        const serviceData = await Service.findOne({ serviceID: key});
        return serviceData;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const updateServiceController = async (req, res) => {
    try {
        const { serviceid } = req.params;
        const { serviceName, serviceStatus, serviceObservation, servicePassengerCapacity } = req.body;
        
        // Busca el servicio por su serviceid
        const service = await Service.findOne({ serviceID: serviceid }); 

        if (service) {
            // Actualiza los campos del servicio
            service.serviceName = serviceName || service.serviceName;
            service.serviceStatus = (serviceStatus == 1 || serviceStatus == true)   ? true : false;
            service.serviceObservation = serviceObservation || service.serviceObservation;
            service.servicePassengerCapacity = servicePassengerCapacity || service.servicePassengerCapacity;

            await service.save();
        } else {
            console.log('error en el controller al actulizar el servicio',error)
            throw error;
        }
    } catch (error) {
        console.log('error en el controller al actulizar el servicio',error)
        throw error;
    }
};

export { getServicesController, createServiceController, getServicesByIDController, getSerciceByKeyController, updateServiceController}


