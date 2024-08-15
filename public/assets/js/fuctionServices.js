const serviceName = document.querySelector('#serviceName');

function uppercaseName(){
    let mayuscula = serviceName.value.toUpperCase();
    serviceName.value = mayuscula;
}
serviceName.addEventListener('input',  uppercaseName);


const idExists = document.querySelector('#idExists');
const serviceID = document.querySelector('#serviceID');
const btnSend = document.querySelector('#btnSend');

function serviceIdExists(){
    if(serviciosID.includes(serviceID.value)){
        idExists.innerText = ' Código ya existe';
        btnSend.className = 'btn btn-success disabled';
    }else{
        idExists.innerText = '';
        btnSend.className = 'btn btn-success';
    }
}

serviceID.addEventListener('input', serviceIdExists )
