let baseURL = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?";
let date = "starttime=2022-07-18 00:00:00&endtime=2023-11-04 23:59:59";
let magnitude = "&minmagnitude=4";
let order = "&orderby=time";

let quakeURL = baseURL + date + magnitude + order;

d3.json(quakeURL).then(function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  let earthquakes = L.geoJson(earthquakeData, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.place + "<br> Magnitude: " + feature.properties.mag + "<br> Epifocal Point: " + feature.geometry.coordinates[2]
      + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
          {
            radius: getRadius(feature.properties.mag),
            fillColor: getColor(feature.geometry.coordinates[2]),
            fillOpacity: .50,
            stroke: true,
            color: "#555555",
            weight: .50
          })
    }
  });
createMap(earthquakes)
}

function createMap(earthquakes) {
  let darkmap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 14
  });
    let lightmap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 14
  });
  let streetmap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    maxZoom: 14
      });
  let satellitemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 14
  });

  let baseMaps = {
    "Shaded Map": darkmap,
    "Grey Map": lightmap,
    "Street": streetmap,
    "Satellite": satellitemap,
  };

  let tectonicline = new L.LayerGroup();

  let overlayMaps = {
    Earthquakes: earthquakes,
    "Tectonic Plates": tectonicline
  };
  let myMap = L.map("map", {
    center: [10, 5],
    zoom: 2.5,
    layers: [darkmap, earthquakes, tectonicline]
  });

let plateURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

d3.json(plateURL).then(function(plateData) {
  L.geoJson(plateData, {
    color: "#993300",
    weight: 2
  })
      .addTo(tectonicline);
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

let legend = L.control({
  position: 'topleft'
});

legend.onAdd = function (myMap) {
  let div = L.DomUtil.create('div', 'info legend'),
      categories = [-10, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      labels = [];

  for (let i = 0; i < categories.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(categories[i] + 1) + '"></i> ' +
          categories[i] + (categories[i + 1] ? '&ndash;' + categories[i + 1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(myMap);
}

function getColor(d) {
  return d > 100 ? '#0b0108' :
  d > 90 ? '#51073b' :
  d > 80 ? '#bd0026' :
  d > 70 ? '#fb4f14' :
  d > 60 ? '#fc3c3b' :
  d > 50 ? '#fcb72a' :
  d > 40 ? '#fdba75' :
  d > 30 ? '#fdd175' :
  d > 20 ? '#ffffe5' :
  d > 10 ? '#d9f0a3' :
  d > -10 ? '#78c679':
            '#00441b';
}

function getRadius(value){
  return value*30000
}