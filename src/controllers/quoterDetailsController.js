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
                quoterID: quoterID, // Asegúrate de incluir el quoterID en la solicitud
                itemUnitPrice: itemPriceBajadaBandera,
                itemAmount: itemAmountBajadaBandera,
                itemTotal: itemPriceBajadaBandera * itemAmountBajadaBandera,
            },
            {
                itemID: 'Kilómetros',
                quoterID: quoterID,
                itemUnitPrice: itemPriceKilometros,
                itemAmount: itemAmountKilometros,
                itemTotal: itemPriceKilometros * itemAmountKilometros,
            },
            {
                itemID: 'Minutos',
                quoterID: quoterID,
                itemUnitPrice: itemPriceMinutos,
                itemAmount: itemAmountMinutos,
                itemTotal: itemPriceMinutos * itemAmountMinutos,
            },
            {
                itemID: 'TAG',
                quoterID: quoterID,
                itemUnitPrice: itemPriceTAG,
                itemAmount: itemAmountTAG,
                itemTotal: itemPriceTAG * itemAmountTAG,
            },
            {
                itemID: 'Peaje',
                quoterID: quoterID,
                itemUnitPrice: itemPricePeaje,
                itemAmount: itemAmountPeaje,
                itemTotal: itemPricePeaje * itemAmountPeaje,
            },
            {
                itemID: 'Estacionamiento',
                quoterID: quoterID,
                itemUnitPrice: itemAmountEstacionamiento, 
                itemAmount: 1, 
                itemTotal: itemAmountEstacionamiento,
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

export { createQuoterDetailController };
