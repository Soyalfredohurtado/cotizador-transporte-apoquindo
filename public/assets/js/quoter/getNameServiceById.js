const inputQuoteServiceID = document.querySelector('#quoteServiceID');
const inputQuotePriceListID = document.querySelector('#quotePriceListID');
const itemTotalTaximetro = document.querySelector('#itemTotalTaximetro'); 
const itemTotalServicio = document.querySelector('#itemTotalServicio');

for(let i = 0;  i < serviceList.length; i++){   
    if(serviceList[i].serviceID === QuoterById.quoterServiceID){        
        inputQuoteServiceID.value  = serviceList[i].serviceName;
        break;
    }
}

for(let i = 0;  i < serviceList.length; i++){   
    if( listPriceList[i].priceListID === QuoterById.quoterPriceListID){        
        inputQuotePriceListID.value  =  listPriceList[i].priceListName;
        break;
    }    
}

let subTotal = 0; 
let totalTotal = 0;
function totales(){
    for(let i = 0; i < quoterDetailById.length ; i++){
        if((quoterDetailById[i].itemID === 'BajadaBandera') || (quoterDetailById[i].itemID === 'Kilómetros') || (quoterDetailById[i].itemID === 'Minutos') ){
            subTotal += Number(quoterDetailById[i].detailsQuoter.itemTotal)
        }
        totalTotal +=  Number(quoterDetailById[i].detailsQuoter.itemTotal)
    }
    itemTotalTaximetro.innerHTML = subTotal
    itemTotalServicio.innerHTML = totalTotal
}
totales()



