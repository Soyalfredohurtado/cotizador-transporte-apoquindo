import  Quoter  from '../models/quoterModel.js';


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
        const { quoterID, quoterOrigin, quoterDestination } = req.body;
        const newQuoter = new Quoter({
            quoterID,
            quoteNumber : 0, // se debe agregar un logica para conbtar cuantyas cotizaciones hay 
            quoterOrigin,
            quoterDestination,
        })
        await newQuoter.save()
    } catch (error) {
        console.log(error)        
        throw error;        
    }
}

export { getQuoterController, createQuoterController }