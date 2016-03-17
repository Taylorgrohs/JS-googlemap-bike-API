$(document).ready(function(){
  initMap();
  $('#search').submit(function(event){
    event.preventDefault();
    var zip = $('#zipCode').val();
    $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + zip + '&proximity_square=5').then(function(bike) {
      console.log(bike);
      for(var i = 0; i < bike.bikes.length; i++)
      {
        $('#bikelist').append('<li>'+ bike.bikes[i].title + '</li>');
        $('#bikelist').append('<ul><li>'+ bike.bikes[i].stolen_location + '</li></ul>');
        $('#address').val("'" + bike.bikes[i].stolen_location + "'");
        codeAddress();
      }

    });
  });
});

var map;
var geocoder;
function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 45.5207260, lng: -122.6796520}
  });
}
function codeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
