import QuoterDetail from '../models/quoterDetailsModels.js';

const createQuoterDetailController = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const {
            quoterID,

            itemPriceBajadaBandera,
            itemAmountBajadaBandera,
            
            itemPriceKilometros,
            itemAmountKilometros,
            
            itemPriceMinutos,
            itemAmountMinutos,
            
            itemPriceTAG,
            itemAmountTAG,
            
            itemPricePeaje,
            itemAmountPeaje,
            
          
            itemAmountEstacionamiento
           
        } = req.body;
        
        // Crear y guardar cada detalle de la cotización
        const details = [
            {
                itemID: 'BajadaBandera',
                quoterID: quoterID,
                detailsQuoter:{
                    itemUnitPrice: itemPriceBajadaBandera || 0,
                    itemAmount: itemAmountBajadaBandera || 0,
                    itemTotal: itemPriceBajadaBandera * itemAmountBajadaBandera
                }
            },
            {
                itemID: 'Kilómetros',
                quoterID: quoterID,
                detailsQuoter:{
                    itemUnitPrice: itemPriceKilometros || 0,
                    itemAmount: itemAmountKilometros || 0,
                    itemTotal: itemPriceKilometros * itemAmountKilometros,

                }
                
            },
            {
                itemID: 'Minutos',
                quoterID: quoterID,
                detailsQuoter:{
                    itemUnitPrice: itemPriceMinutos || 0 ,
                    itemAmount: itemAmountMinutos || 0,
                    itemTotal: itemPriceMinutos * itemAmountMinutos
                }
                
            },
            {
                itemID: 'TAG',
                quoterID: quoterID ,
                detailsQuoter:{
                    itemUnitPrice: itemPriceTAG || 0,
                    itemAmount: itemAmountTAG || 0,
                    itemTotal: itemPriceTAG * itemAmountTAG,
                }
            },
            {
                itemID: 'Peaje',
                quoterID: quoterID,
                detailsQuoter:{
                    itemUnitPrice: itemPricePeaje || 0,
                    itemAmount: itemAmountPeaje || 0,
                    itemTotal: itemPricePeaje * itemAmountPeaje,
                }
            },
            {
                itemID: 'Estacionamiento',
                quoterID: quoterID,
                detailsQuoter:{
                    itemUnitPrice: itemAmountEstacionamiento || 0, 
                    itemAmount: 1, 
                    itemTotal: itemAmountEstacionamiento || 0
                }
            }
        ];
        
        // Guardar todos los detalles en la base de datos
        for (const detail of details) {
            const newQuoterDetail = new QuoterDetail(detail);

            await newQuoterDetail.save();
        }
    } catch (error) {
        console.error('Error al crear los detalles de la cotización:', error);
        res.status(500).send('Error al crear los detalles de la cotización');
    }
};

const getQuoterDetailById = async(key) =>{
    try {
        const QuoterDetailById  = await QuoterDetail.find({quoterID:key})
        return QuoterDetailById;        
    } catch (error) {
        console.log(error);
        throw error;        
    }
}

export { createQuoterDetailController,  getQuoterDetailById};
