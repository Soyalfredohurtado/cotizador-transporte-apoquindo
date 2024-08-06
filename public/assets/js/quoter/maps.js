
let map, marker, marker2, autocomplete, autocomplete2, service, directionsService,directionsRenderer; 
let inputOrigen = document.querySelector('#quoterOrigin');
let inputDestination = document.querySelector('#quoterDestination');
let inputKilometros = document.querySelector('#itemAmountKilometros');
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    let coorChile = { lat: -33.45694, lng: -70.64827 };
    map = new Map(document.getElementById("map"), {
        center: coorChile,
        zoom: 11,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    marker = new google.maps.Marker({ map });
    marker2 = new google.maps.Marker({ map });
    initAutocomplete();
}
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(inputOrigen);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        map.setCenter(place.geometry.location);
        map.setZoom(15);
        marker.setPosition(place.geometry.location);
        if (autocomplete2.getPlace()) {
            calcularRuta(autocomplete, autocomplete2);
        }
    });
    autocomplete2 = new google.maps.places.Autocomplete(inputDestination);
    autocomplete2.addListener("place_changed", () => {
        const place2 = autocomplete2.getPlace();
        //marker2.setPosition(place2.geometry.location);
        if (autocomplete.getPlace()) {
            calcularRuta(autocomplete, autocomplete2);
        }
    });
}
function calcularRuta(origin, destination) {
    const origenLugar = origin.getPlace().geometry.location;
    const destinoLugar = destination.getPlace().geometry.location;
    const request = {
        origin: origenLugar,
        destination: destinoLugar,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
            // Obtener distancia y duración
            const distanciaMetros = response.routes[0].legs[0].distance.value;
            const distanciaKilometros = distanciaMetros / 1000;
            const duracion = response.routes[0].legs[0].duration.text;
            console.log('Distancia: ' + distanciaKilometros.toFixed(2) + ' km,Duración: ' + duracion);
            inputKilometros.value = distanciaKilometros.toFixed(2);
            marker.setMap(null)
            marker2.setMap(null)
        } else {
            console.error('Error en la solicitud de ruta:', status);
        }
    });
}

window.initMap = initMap;