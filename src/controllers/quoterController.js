import  Quoter  from '../models/quoterModel.js';
import router from '../routes/users.js';


const getQuoterController = async () =>{
    try {
        const quoter = await Quoter.find();
        return quoter;
    } catch (error) {
        console.log(error)        
        throw error;
    }
}

const createQuoterController = async (req, res) =>{
    try {
        const { quoterID, quoterOrigin, quoterDestination,quoterDetencion, quoterService, quoterPriceList  } = req.body;
        const  quoteNumber = await countQuoterController() + 1;
        const queterUserID = req.session.userID;
        console.log(quoterDetencion);
        const newQuoter = new Quoter({
            quoterID,
            quoterNumber:quoteNumber ,
            quoterOrigin,
            quoterDestination,
            quoterWaypoints: quoterDetencion,
            quoterServiceID: quoterService, 
            quoterPriceListID: quoterPriceList, 
            queterUserID
        })
        await newQuoter.save()
    } catch (error) {
        console.log(error)        
        throw error;        
    }
}

const countQuoterController = async (req, res )=>{
    try {
        const countQuoter = await Quoter.countDocuments({});
        return Number(countQuoter);
    } catch (error) {
        console.log(error)        
        throw error;         
    }
}

const getQuoterByIdController = async(key)=>{
    try {
        const quoterById = await Quoter.findOne({quoterID: key });
        return quoterById;        
    } catch (error) {
        console.log(error)
        throw error;        
    }
}

export { getQuoterController, createQuoterController , countQuoterController, getQuoterByIdController}