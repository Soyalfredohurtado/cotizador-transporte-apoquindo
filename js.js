function calcularDistancia(origen, destino) {
    // Crea una instancia del servicio DistanceMatrixService
    var service = new google.maps.DistanceMatrixService();

    // Configura los parámetros de la solicitud
    var parametros = {
        origins: [origen],
        destinations: [destino],
        travelMode: google.maps.TravelMode.DRIVING, // Modo de viaje (conducción)
        unitSystem: google.maps.UnitSystem.METRIC, // Sistema de unidades (métrico)
        avoidHighways: false,
        avoidTolls: false
    };

    // Realiza la solicitud
    service.getDistanceMatrix(parametros, function(response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        } else {
            var origenes = response.originAddresses;
            var destinos = response.destinationAddresses;

            for (var i = 0; i < origenes.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distancia = element.distance.text;
                    var duracion = element.duration.text;
                    var desde = origenes[i];
                    var hasta = destinos[j];

                    console.log('Distancia de ' + desde + ' a ' + hasta + ' es ' + distancia + ' y toma ' + duracion);
                    document.getElementById('output').innerHTML = 'Distancia de ' + desde + ' a ' + hasta + ' es ' + distancia + ' y toma ' + duracion;
                }
            }
        }
    });
}

// Llama a la función con las direcciones deseadas
calcularDistancia('Caracas, Venezuela', 'Valencia, Venezuela');
