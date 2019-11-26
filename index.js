
var map;



$(document).ready(function() {
    initMap()
    placeMarkers();
});


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.881832, lng: -87.623177},
        zoom: 4
    });
}

function placeMarkers(){
    $.get("https://data.nasa.gov/resource/gh4g-9sfh.json", function(data, status){
    
    for(x in data) {
        if(typeof(data[x].geolocation) !== "undefined"){
            
            var markerLocation = new google.maps.LatLng(data[x].geolocation.latitude, data[x].geolocation.longitude)
                       
            var marker = new google.maps.Marker({
                position: markerLocation,
                map: map,
                title: data[x].name,
                animation:google.maps.Animation.DROP
            });
                
            var infowindow = new google.maps.InfoWindow({
                content: 'Name: ' + data[x].name + 
                         ' Mass: ' + data[x].mass + 
                         ' Year: ' + data[x].year
            });
              
            marker.infowindow = infowindow;

            //finally call the explicit infowindow object
            marker.addListener('click', function() {
                return this.infowindow.open(map, this);
            })
            
          
            }
        }
    });
}
