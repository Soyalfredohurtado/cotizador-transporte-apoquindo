function iniciarMap(){
    var coordenadas = {lat: -33.430128, lng:-70.557322};
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom:12,
        center: coordenadas,
    });
    var marker = new google.maps.Marker({
        position:coordenadas,
        map:map
    });
}

let puesto = 'locutor'

let user ={
    alfredo:'alfredo',
    apellido:'hurtado'
}
direccion =  undefined
let usuarioOtro = user

module.exports = {
    user, direccion
}
