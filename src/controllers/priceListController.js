import PriceList from '../models/priceListModel.js';


const getPriceListController =  async (req, res)=>{
    try {
        const priceList =  await PriceList.find()
        return priceList
    } catch (error) {
        
    }
}

const getPriceListController_ID = async (req, res, id_) => {
    try {
      const priceListOnlyID = await PriceList.find({}, 'priceListID');
      return priceListOnlyID;
    } catch (error) {
      console.error('Error fetching price list IDs:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const getPriceListByIDController = async (priceListID) => {
    try {
        const priceList = await PriceList.findOne({ priceListID: priceListID });
        return priceList;
    } catch (error) {
        console.error('Error fetching price list by ID:', error);
        throw error;
    }
}

const createPriceListController = async(req, res) => {
    try {
        const {priceListID, priceListName, priceListStatus, priceListObservation, priceListBandera, priceListBanderaStatus, priceListKilometros, priceListKilometrosStatus,priceListMinutos, priceListMinutosStatus, priceListTAG, priceListTAGStatus, priceListPeajes, priceListPeajesStatus, priceListService } = req.body; 

        const newPriceList = new PriceList({
            
            priceListID,
            priceListName,
            priceListObservation,
            priceListStatus: priceListStatus == 'on' ? true : false,
            priceListDetail: {
                bajada: {
                    itemsID: 'bajadaBandera',
                    itemName: 'Bajada de Bandera',
                    itemPrice: priceListBandera,
                    itemStatus: priceListBanderaStatus == 'on' ? true : false,
                },
                Kilometros: {
                    itemsID: 'kilometros',
                    itemName: 'Kilometros',
                    itemPrice: priceListKilometros,
                    itemStatus: priceListKilometrosStatus == 'on' ? true : false,
                },
                minutos: {
                    itemsID: 'minutos',
                    itemName: 'Minutos',
                    itemPrice: priceListMinutos,
                    itemStatus: priceListMinutosStatus == 'on' ? true : false,
                },
                peajes:{
                    itemsID: 'peajes',
                    itemName: 'peajes',
                    itemPrice: priceListPeajes,
                    itemStatus: priceListPeajesStatus == 'on' ? true : false,
                },
                tag: {
                    itemsID: 'TAG',
                    itemName: 'TAG',
                    itemPrice: priceListTAG,
                    itemStatus: priceListTAGStatus == 'on' ? true : false,
                },
            },
            priceListService
        });
        
        await newPriceList.save()
        
    } catch (error) {     
        throw error;         
    }
}

export { createPriceListController, getPriceListController, getPriceListByIDController, getPriceListController_ID }
